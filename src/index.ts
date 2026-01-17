import { createModel } from '@/strands-agents/model'
import { tavilySearchTool, calendarTool } from '@/strands-agents/tools'
import { createAgent } from '@/strands-agents/agent'
import { createApp, startServer } from '@/server/server'

const main = async () => {
  // Create model
  const model = createModel()

  // Setup tools
  const defaultTools = [tavilySearchTool, calendarTool]

  // Create agent
  const agent = createAgent(model, defaultTools)

  // Create and start server
  const app = createApp(agent)
  startServer(app)
}

main()