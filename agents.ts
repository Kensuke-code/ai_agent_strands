import { Agent, BedrockModel } from '@strands-agents/sdk'
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

  // Create agent (uses default Amazon Bedrock provider)
  const agent = new Agent({
    model,
    tools: defaultTools,
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