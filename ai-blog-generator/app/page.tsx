"use client";

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<
    { role: string; content: string }[]
  >([]);

  const generateBlog = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    const userMessage = {
      role: "user",
      content: topic,
    };

    setMessages((prev) => [...prev, userMessage]);
    setTopic("");
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: userMessage.content,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content,
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen flex flex-col bg-black">
      {/* Header */}
      <div className="border-white/20 border-b p-4">
        <h1 className="text-xl font-semibold text-white">
          AI Automation
        </h1>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-white/25 text-white self-end text-sm"
                  : "bg-white/25 text-white self-start text-sm"
              }`}
            >
              <p className="whitespace-pre-wrap">
                {msg.content}
              </p>
            </div>
          ))}

          {loading && (
            <div className="bg-gray-100 rounded-2xl px-4 py-3 self-start">
              Thinking...
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-white/25 border-t p-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ask anything..."
            disabled={loading}
            className="flex-1 border rounded-xl px-4 py-3 outline-none text-white"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                generateBlog();
              }
            }}
          />

          <button
            onClick={generateBlog}
            disabled={loading}
            className="bg-white/25 text-white px-6 rounded-xl disabled:opacity-50"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </main>
  );
}