import { BedrockModel } from '@strands-agents/sdk'

export const createModel = () => {
  return new BedrockModel({
    region: 'ap-northeast-1',
    modelId: 'jp.anthropic.claude-haiku-4-5-20251001-v1:0',
    maxTokens: 2048, // 出力トークン数の上限
    temperature: 0.7
  })
}