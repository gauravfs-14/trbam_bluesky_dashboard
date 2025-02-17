import { drizzleDb } from "@/db";
import { posts } from "@/db/schema";
import { NextResponse } from "next/server";
import { cache } from "react";

// Cache the word analysis for 1 hour
const CACHE_DURATION = 3600000; // 1 hour in milliseconds
interface CachedResult {
  wordCloud: { text: string; value: number }[];
  barChart: { word: string; frequency: number }[];
}

let cachedResult: CachedResult | null = null;
let lastCacheTime = 0;

// Process posts in chunks to avoid memory issues
const CHUNK_SIZE = 100;

// Rate limiting
const REQUESTS_PER_MINUTE = 30;
const requestCounts: { [key: string]: { count: number; timestamp: number } } =
  {};

// Common words to filter out
const stopWords = new Set([
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "that",
  "have",
  "i",
  "it",
  "for",
  "not",
  "on",
  "with",
  "he",
  "as",
  "you",
  "do",
  "at",
  "this",
  "but",
  "his",
  "by",
  "from",
  "they",
  "we",
  "say",
  "her",
  "she",
  "or",
  "an",
  "will",
  "my",
  "one",
  "all",
  "would",
  "there",
  "their",
  "what",
  "so",
  "up",
  "out",
  "if",
  "about",
  "who",
  "get",
  "which",
  "go",
  "me",
  "when",
  "make",
  "can",
  "like",
  "time",
  "no",
  "just",
  "him",
  "know",
  "take",
  "people",
  "into",
  "year",
  "your",
  "good",
  "some",
  "could",
  "them",
  "see",
  "other",
  "than",
  "then",
  "now",
  "look",
  "only",
  "come",
  "its",
  "over",
  "think",
  "also",
  "back",
  "after",
  "use",
  "two",
  "how",
  "our",
  "work",
  "first",
  "well",
  "way",
  "even",
  "new",
  "want",
  "because",
  "any",
  "these",
  "give",
  "day",
  "most",
  "us",
  "is",
  "are",
  "was",
  "were",
  "has",
  "had",
  "been",
  "did",
  "doing",
  "does",
  "done",
  "am",
]);

// Memoized word analysis function
const analyzeWords = cache(async () => {
  const now = Date.now();

  // Return cached result if valid
  if (cachedResult && now - lastCacheTime < CACHE_DURATION) {
    return cachedResult;
  }

  try {
    const allPosts = drizzleDb.select().from(posts).all();
    const wordFrequency: { [key: string]: number } = {};

    // Process posts in chunks
    for (let i = 0; i < allPosts.length; i += CHUNK_SIZE) {
      const chunk = allPosts.slice(i, i + CHUNK_SIZE);

      chunk.forEach((post) => {
        if (post.raw_data) {
          const postData = JSON.parse(post.raw_data);
          const text = postData.record?.text || "";

          const words = text
            .toLowerCase()
            .replace(/[^a-zA-Z\s]/g, "")
            .split(/\s+/)
            .filter(
              (word: string) =>
                word.length > 3 && !stopWords.has(word) && !/^\d+$/.test(word)
            );

          words.forEach((word: string) => {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
          });
        }
      });

      // Allow other requests to be processed
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    const wordCloudData = Object.entries(wordFrequency)
      .map(([text, value]) => ({ text, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 100);

    const barChartData = wordCloudData.slice(0, 20).map(({ text, value }) => ({
      word: text,
      frequency: value,
    }));

    // Cache the results
    cachedResult = { wordCloud: wordCloudData, barChart: barChartData };
    lastCacheTime = now;

    return cachedResult;
  } catch (error) {
    console.error("Error analyzing words:", error);
    throw error;
  }
});

export async function GET(request: Request) {
  try {
    // Simple rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();

    if (requestCounts[ip]) {
      const timeDiff = now - requestCounts[ip].timestamp;
      if (timeDiff < 60000) {
        // Within 1 minute
        if (requestCounts[ip].count >= REQUESTS_PER_MINUTE) {
          return NextResponse.json(
            { error: "Too many requests" },
            { status: 429 }
          );
        }
        requestCounts[ip].count++;
      } else {
        requestCounts[ip] = { count: 1, timestamp: now };
      }
    } else {
      requestCounts[ip] = { count: 1, timestamp: now };
    }

    const result = await analyzeWords();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in word analysis endpoint:", error);
    return NextResponse.json(
      { error: "Failed to analyze words" },
      { status: 500 }
    );
  }
}
