import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from "react-native";
import LottieView from "lottie-react-native";
import { runAgent } from "./src/agent/core";
import { AnimatedAgent } from "./src/ui/AnimatedAgent";

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [status, setStatus] = useState<"idle"|"thinking"|"running"|"error">("idle");
  const send = async () => {
    if (!input.trim()) return;
    const m = { role: "user", content: input };
    setMessages((p) => [...p, m]);
    setInput("");
    setStatus("thinking");
    try {
      const res = await runAgent([...messages, m], (s: any) => setStatus(s));
      setMessages((p) => [...p, { role: "assistant", content: res }]);
      setStatus("idle");
    } catch (e: any) {
      setMessages((p) => [...p, { role: "assistant", content: "Error: " + e.message }]);
      setStatus("error");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Omni Agent</Text>
      <AnimatedAgent status={status} />
      <FlatList data={messages} keyExtractor={(_,i)=>String(i)} renderItem={({item})=>(<View style={[styles.msg,item.role==="user"?styles.user:styles.bot]}><Text>{item.content}</Text></View>)} />
      <View style={styles.row}>
        <TextInput style={styles.input} value={input} onChangeText={setInput} placeholder="Ask..." />
        <TouchableOpacity style={styles.btn} onPress={send}><Text style={{color:"#fff"}}>Send</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:{flex:1,padding:12},
  title:{fontSize:22,fontWeight:"700",textAlign:"center",marginVertical:8},
  msg:{padding:10,borderRadius:8,marginVertical:4},
  user:{alignSelf:"flex-end",backgroundColor:"#dbeafe"},
  bot:{alignSelf:"flex-start",backgroundColor:"#f3f4f6"},
  row:{flexDirection:"row",gap:8},
  input:{flex:1,borderWidth:1,borderColor:"#ddd",borderRadius:8,padding:10},
  btn:{backgroundColor:"#2563eb",paddingHorizontal:16,justifyContent:"center",borderRadius:8}
});
