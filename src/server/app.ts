import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { pingRoute } from './routes/ping'
import { invocationsRoute } from './routes/invocations'
import type { Agent } from '@strands-agents/sdk'

export const createApp = (agent: Agent) => {
  const app = new Hono()

  // CORS設定
  const corsOrigin = process.env.NEXT_APPLICATION_PUBLIC_URL
  
  app.use('/invocations', cors({
    origin: corsOrigin,
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
    credentials: true,
  }))

  // Register routes
  pingRoute(app)
  invocationsRoute(app, agent)

  return app
}

export const startServer = (app: Hono) => {
  const port = 9000
  console.log(`AgentCore Runtime server listening on port ${port}`)
  serve({
    fetch: app.fetch,
    port,
  })
}