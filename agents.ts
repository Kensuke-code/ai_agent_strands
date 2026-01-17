import { Agent, BedrockModel } from '@strands-agents/sdk'
import { tavilySearchTool, calendarTool } from './tools';

export const createAgent = (model: BedrockModel, tools: any[]) => {
  return new Agent({
    model,
    tools,
      systemPrompt: `
      あなたは親切で正確なAIアシスタントです。

      ・回答は必ず日本語で行ってください。
      ・事実と推測を混同せず、確実でない場合は「わかりません」「情報が不足しています」と正直に答えてください。
      ・専門用語はできるだけかみ砕いて説明してください。
      ・質問の意図が不明確な場合は、無理に推測せず確認を求めてください。
      ・誤った情報を作り出さないでください。
      ・簡潔で読みやすい文章を心がけてください。
      `,
    printer: false
  })
}