"use client";
import React, { useMemo } from "react";
import { BarChart2 } from "lucide-react";

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
    <div className="space-y-5 p-4">
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 className="h-5 w-5 text-violet-500 dark:text-violet-400" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Popular Words
        </h3>
      </div>

      {topWords.map((word, index) => {
        const percentage = (word.value / maxValue) * 100;
        // Generate a unique color for each bar based on its position
        const hue = 270 + ((index * 15) % 60); // Range from 270 (violet) to 330 (pink)

        return (
          <div key={word.text} className="flex items-center group">
            <span className="w-28 text-sm font-medium truncate capitalize group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors">
              {word.text}
            </span>
            <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 relative group-hover:scale-x-[1.01] origin-left shadow-inner"
                style={{
                  width: `${percentage}%`,
                  background: `linear-gradient(90deg, hsl(${hue}, 80%, 70%), hsl(${hue}, 80%, 60%))`,
                }}
              >
                <span className="absolute inset-0 bg-white/10 bg-opacity-0 group-hover:bg-opacity-20 transition-opacity"></span>
              </div>
            </div>
            <span className="ml-3 text-sm font-semibold w-16 text-right text-gray-700 dark:text-gray-300 group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors">
              {word.value.toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}
