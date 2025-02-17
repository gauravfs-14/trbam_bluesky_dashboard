"use client";

import React, { useMemo } from "react";

interface Word {
  text: string;
  value: number;
}

interface PopularWordsBarChartProps {
  words: Word[];
  topN?: number;
}

export default function PopularWordsBarChart({
  words,
  topN = 10,
}: PopularWordsBarChartProps) {
  // Sort words by frequency descending and take topN words
  const topWords = useMemo(() => {
    return words
      .slice()
      .sort((a, b) => b.value - a.value)
      .slice(0, topN);
  }, [words, topN]);

  const maxValue = useMemo(() => {
    return topWords.length > 0 ? Math.max(...topWords.map((w) => w.value)) : 1;
  }, [topWords]);

  return (
    <div className="space-y-4">
      {topWords.map((word) => (
        <div key={word.text} className="flex items-center">
          <span className="w-28 text-sm font-medium capitalize">
            {word.text}
          </span>
          <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(word.value / maxValue) * 100}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm font-medium text-gray-700">
            {word.value}
          </span>
        </div>
      ))}
    </div>
  );
}
