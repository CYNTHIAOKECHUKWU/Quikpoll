"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function PollsPage() {
  const [polls, setPolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  //  Fetch polls from backend
  const fetchPolls = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/polls/");
      const data = await res.json();

      //  Convert backend fields into `options` array
      const formatted = data.map((p: any) => ({
        ...p,
        options: [
          { text: p.option1, votes: p.votes1 },
          { text: p.option2, votes: p.votes2 },
        ],
        likes: p.likes ?? 0,
      }));

      setPolls(formatted);
    } catch (err) {
      console.error("Failed to load polls:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleVote = async (pollId: number, optionIndex: number) => {
    await fetch(`http://127.0.0.1:8000/polls/${pollId}/vote/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ option_index: optionIndex }),
    });
    fetchPolls(); // Refresh after vote
  };

  const handleLike = async (pollId: number) => {
    await fetch(`http://127.0.0.1:8000/polls/${pollId}/like/`, { method: "POST" });
    fetchPolls();
  };

  
  const handleDelete = async (pollId: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this poll?");
    if (!confirmDelete) return;

    await fetch(`http://127.0.0.1:8000/polls/${pollId}/`, {
      method: "DELETE",
    });
    fetchPolls(); // Refresh after delete
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading polls...</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Live Polls 📊</h1>

      <div className="max-w-2xl mx-auto space-y-6">
        {polls.map((poll) => {
          const totalVotes =
            poll.options?.reduce((sum: number, opt: any) => sum + opt.votes, 0) ?? 0;

          return (
            <Card key={poll.id} className="shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {poll.question}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {poll.options?.map((opt: any, i: number) => {
                  const percent = totalVotes ? (opt.votes / totalVotes) * 100 : 0;
                  return (
                    <div key={i}>
                      <Button
                        variant="outline"
                        className="w-full justify-between text-left"
                        onClick={() => handleVote(poll.id, i)}
                      >
                        {opt.text}
                        <span className="text-gray-500 text-sm ml-2">
                          {opt.votes} votes
                        </span>
                      </Button>
                      <Progress value={percent} className="h-2 mt-2" />
                    </div>
                  );
                })}
              </CardContent>

              <CardFooter className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  onClick={() => handleLike(poll.id)}
                  className="text-gray-600 hover:text-red-500"
                >
                  ❤️ {poll.likes}
                </Button>

                
                <Button
                  onClick={() => handleDelete(poll.id)}
                  className="bg-green-400 text-blue-900 hover:bg-green-300"
                >
                  Delete Poll
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
