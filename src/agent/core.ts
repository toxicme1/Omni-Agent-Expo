import axios from "axios";
export async function runAgent(messages:any[], setStatus:(s:any)=>void){
  setStatus("thinking");
  // placeholder - uses any OpenAI-compatible endpoint
  const base = "https://api.openai.com/v1"; // user can change
  const res = await axios.post(base + "/chat/completions", { model:"gpt-4o-mini", messages });
  return res.data?.choices?.[0]?.message?.content || "No response";
}
