import { createAgent } from './agents';
import { BedrockModel } from '@strands-agents/sdk'
import { tavilySearchTool, calendarTool } from './tools';
import { Hono } from 'hono';
import { streamText } from 'hono/streaming';
import { serve } from '@hono/node-server';

const main = async () => {
  // Create model
  const model = new BedrockModel({
    region: 'ap-northeast-1',
    modelId: 'jp.anthropic.claude-haiku-4-5-20251001-v1:0',
    maxTokens: 2048,
    temperature: 0.7
  })

  // Setup tools
  const defaultTools = [tavilySearchTool, calendarTool]

  // Create agent
  const agent = createAgent(model, defaultTools)

  const app = new Hono();

  app.get('/ping', (c) => 
    c.json({  
      status: 'Healthy' ,
      time_of_last_update: Math.floor(Date.now() / 1000),
    })
  );

  app.post('/invocations', async (c) => {
    try {
      const params = await c.req.json();
      const { prompt } = params;
      
      if (!prompt) {
        return c.json({ error: 'Prompt is required' }, 400);
      }

      return streamText(c, async (stream) => {
        for await (const event of agent.stream(prompt)) {
          if (event.type === 'modelContentBlockDeltaEvent' && event.delta.type === 'textDelta') {
            await stream.write(event.delta.text);
          }
        }
      });
    } catch (error) {
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  });

  console.log(`AgentCore Runtime server listening on port ${9000}`)
  serve({
    fetch: app.fetch,
    port: 9000,
  });
};

main();

