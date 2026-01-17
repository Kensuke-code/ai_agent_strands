import { Hono } from 'hono'
import { streamText } from 'hono/streaming'
import type { Agent } from '@strands-agents/sdk'

export const invocationsRoute = (app: Hono, agent: Agent) => {
  app.post('/invocations', async (c) => {
    try {
      const params = await c.req.json()
      const { prompt } = params

      if (!prompt) {
        return c.json({ error: 'Prompt is required' }, 400)
      }

      // Stream response
      return streamText(c, async (stream) => {
        for await (const event of agent.stream(prompt)) {
          if (event.type === 'modelContentBlockDeltaEvent' && event.delta.type === 'textDelta') {
            await stream.write(event.delta.text)
          }
        }
      })
    } catch (error) {
      return c.json({ error: 'Internal Server Error' }, 500)
    }
  })
}