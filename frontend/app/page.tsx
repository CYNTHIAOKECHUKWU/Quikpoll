import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4">
        Welcome to <span className="text-blue-600">QuickPoll</span> 🎯
      </h1>

      <p className="text-gray-600 max-w-lg mb-8">
        Create polls, vote instantly, and see what people think in real time.
      </p>

      <div className="flex gap-4">
        <Link href="/create">
          <Button size="lg" className="text-white bg-blue-600 hover:bg-blue-700">
            🚀 Create a Poll
          </Button>
        </Link>

        <Link href="/polls">
          <Button
            size="lg"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            📊 View Polls
          </Button>
        </Link>
      </div>
    </main>
  );
}
