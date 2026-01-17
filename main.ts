import { createAgent } from './agents';
import { BedrockModel } from '@strands-agents/sdk'
import { tavilySearchTool, calendarTool } from './tools';

const main = async() => {
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

  // Invoke
  for await (const event of agent.stream('日本の総理大臣は？')) {
    if (event.type === 'modelContentBlockDeltaEvent' && event.delta.type === 'textDelta') {
      // 改行なしで文字列を表示する
      process.stdout.write(event.delta.text)
    }
  }
  // 最後の行の出力を確定させるため
  console.log('\n')
};

main();
