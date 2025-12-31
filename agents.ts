import { Agent } from '@strands-agents/sdk'


const main = async() => {

  // Create agent (uses default Amazon Bedrock provider)
  const agent = new Agent({
    systemPrompt: 'あなたはAIアシスタントです。回答は日本語で行なってください',
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