import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VisxWordCloud from "./visx-wordcloud";
import PopularWordsBarChart from "./popular-words-bar-chart";
import { MessageSquareText } from "lucide-react"; // Importing the icon

export default async function PopularWords() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const popularWords = await fetch(`${baseUrl}/api/posts/popularWords`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(`Failed to fetch popularWords: ${error}`);
    });
  const wordCloudData = popularWords.wordCloud;

  return (
    <Card className="rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl dark:bg-gray-900">
      <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white dark:from-violet-700 dark:to-purple-800">
        <div className="flex items-center gap-2">
          <MessageSquareText className="h-5 w-5 opacity-80" />
          <CardTitle className="dark:text-white">Most Used Words</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="min-h-[400px] space-y-6 p-6 dark:bg-gray-900 dark:text-gray-300">
        {/* Word Cloud */}
        <VisxWordCloud words={wordCloudData || []} width="100%" height={400} />
        {/* Bar Chart */}
        <PopularWordsBarChart words={wordCloudData || []} topN={20} />
      </CardContent>
    </Card>
  );
}
