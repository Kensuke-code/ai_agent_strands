import { tool } from '@strands-agents/sdk'
import { z } from 'zod'
import { tavily } from '@tavily/core'

export const tavilySearchTool = tool({
  name: 'tavily_search',
  description: 'Search the web using Tavily API for up-to-date information.',
  inputSchema: z.object({
    query: z.string().describe('The search query'),
  }),
  callback: async (input) => {
    try {
      const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY })
      const response: any = await tvly.search(input.query)
      return JSON.stringify(response.results ?? response)
    } catch (error) {
      console.error('Error during Tavily search:', error)
      return 'An error occurred while searching the web.'
    }
  },
})

export const calendarTool = tool({
  name: 'calendar_tool',
  description: 'Get the current date and time.',
  callback: async () => {
    const now = new Date()
    return `情報の日時：${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日現在`
  },
})