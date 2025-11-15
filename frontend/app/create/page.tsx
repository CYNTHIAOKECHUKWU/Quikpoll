"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreatePollPage() {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question || !option1 || !option2) {
      setMessage(" Please fill all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://127.0.0.1:8000/polls/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          option1,
          option2,
          votes1: 0,
          votes2: 0,
          
        }),
      });

      if (res.ok) {
        setMessage(" Poll created successfully!");
        setQuestion("");
        setOption1("");
        setOption2("");
      } else {
        setMessage(" Failed to create poll.");
      }
    } catch (error) {
      console.error("Error creating poll:", error);
      setMessage(" Server not reachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-blue-50 p-6 flex flex-col items-center">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-8 text-blue-700 drop-shadow-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Create a New Poll 🗳️
      </motion.h1>

      <Card className="max-w-lg w-full shadow-lg border border-gray-200 bg-white rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Question</label>
            <Input
              type="text"
              placeholder="e.g. What's your favorite programming language?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Option 1</label>
            <Input
              type="text"
              placeholder="e.g. JavaScript"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Option 2</label>
            <Input
              type="text"
              placeholder="e.g. Python"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Poll"}
          </Button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
        )}
      </Card>
    </main>
  );
}
