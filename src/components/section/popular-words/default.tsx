import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VisxWordCloud from "./visx-wordcloud";
import PopularWordsBarChart from "./popular-words-bar-chart";

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
    <Card>
      <CardHeader>
        <CardTitle>Most Used Words</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[400px] space-y-6">
        {/* Word Cloud */}
        <VisxWordCloud words={wordCloudData || []} width="100%" height={400} />
        {/* Bar Chart */}
        <PopularWordsBarChart words={wordCloudData || []} topN={20} />
      </CardContent>
    </Card>
  );
}
