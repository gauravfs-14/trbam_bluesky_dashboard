"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Dygraph from "dygraphs";
import "dygraphs/dist/dygraph.css";
import { Card, CardContent } from "@/components/ui/card";

interface FrequencyDataProps {
  date: string;
  count: number;
}

interface FrequencyGraphProps {
  frequencyData: FrequencyDataProps[];
}

export default function FrequencyGraph({ frequencyData }: FrequencyGraphProps) {
  const graphContainer = useRef<HTMLDivElement>(null);
  const graphInstance = useRef<Dygraph | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      graphContainer.current &&
      frequencyData.length > 0
    ) {
      // Sort data by date first
      const sortedData = [...frequencyData].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // Create array of unique dates
      const uniqueDates = Array.from(
        new Set(sortedData.map((item) => item.date))
      );

      // Create a mapping of actual dates to their index position
      const dateToIndex: { [key: string]: number } = {};
      uniqueDates.forEach((date, index) => {
        dateToIndex[date] = index;
      });

      // Create data array using indices instead of actual dates
      const data = sortedData.map((item) => [
        dateToIndex[item.date],
        item.count,
      ]);

      // Custom tick formatter that maps indices back to actual dates
      const xAxisFormatter = (v: number | Date) => {
        const idx = typeof v === "number" ? v : 0;
        if (idx < 0 || idx >= uniqueDates.length) return "";
        const date = new Date(uniqueDates[idx]);
        return `<span style="color: ${
          isDark ? "#E5E7EB" : "#374151"
        }">${date.toLocaleDateString(undefined, {
          month: "short",
          year: "numeric",
        })}</span>`;
      };

      const valueStyle = `
        color: ${isDark ? "#E5E7EB" : "#374151"};
        background-color: ${isDark ? "#111827" : "#FFFFFF"};
      `;

      const valueFormatter = (idx: number) => {
        if (idx < 0 || idx >= uniqueDates.length) return "";
        const date = new Date(uniqueDates[idx]);
        return `<span style="${valueStyle}">${date.toLocaleDateString()}</span>`;
      };

      const options = {
        labels: ["Date", "Count"],
        title: "Post Frequency",
        legend: "always" as const,
        xlabel: "Date",
        ylabel: "Count",
        axisLabelFontSize: 12,
        drawPoints: true,
        pointSize: 4,
        strokeWidth: 1.5,
        highlightCircleSize: 6,
        showRangeSelector: true,
        rangeSelectorHeight: 30,
        backgroundColor: isDark ? "#111827" : "white", // dark:bg-gray-900
        rangeSelectorPlotFillColor: isDark
          ? "rgba(147, 197, 253, 0.3)"
          : "rgba(66, 133, 244, 0.3)",
        rangeSelectorPlotStrokeColor: isDark ? "#60A5FA" : "#4285F4",
        rangeSelectorBackgroundColor: isDark ? "#111827" : "white",
        rangeSelectorForegroundColor: isDark ? "#E5E7EB" : "#374151",
        gridLineColor: isDark
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.1)",
        axisLineColor: isDark
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(0, 0, 0, 0.2)",
        textColor: isDark ? "#E5E7EB" : "#374151",
        titleColor: isDark ? "#E5E7EB" : "#374151",
        labelsDivStyles: {
          color: isDark ? "#E5E7EB" : "#374151",
          padding: "8px",
          borderRadius: "4px",
          border: `1px solid ${
            isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
          }`,
        },
        axes: {
          x: {
            valueFormatter: valueFormatter,
            axisLabelFormatter: xAxisFormatter,
            pixelsPerLabel: 75,
            axisLabelWidth: 80,
            valueRange: [0, uniqueDates.length - 1] as [number, number],
            ticker: (min: number, max: number, pixels: number) => {
              const step = Math.max(
                1,
                Math.floor((max - min) / (pixels / 100))
              );
              const ticks = [];
              for (let i = 0; i < uniqueDates.length; i += step) {
                ticks.push({ v: i, label: xAxisFormatter(i) });
              }
              return ticks;
            },
            axisLabelColor: isDark ? "#E5E7EB" : "#374151",
            axisLineColor: isDark
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.2)",
          },
          y: {
            valueFormatter: (y: number) => {
              return `<span style="${valueStyle}">${y}</span>`;
            },
            axisLabelFormatter: (
              v: number | Date,
              _granularity: number,
              _opts: (name: string) => unknown,
              _dygraph: Readonly<Dygraph>
            ) => {
              return `<span style="${valueStyle}">${v}</span>`;
            },
            axisLabelColor: isDark ? "#E5E7EB" : "#374151",
            axisLineColor: isDark
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.2)",
          },
        },
        series: {
          Count: {
            color: isDark ? "#60A5FA" : "#4285F4",
            strokeWidth: 2,
          },
        },
        height: 280,
      };

      if (graphInstance.current) {
        graphInstance.current.destroy();
      }

      graphInstance.current = new Dygraph(
        graphContainer.current,
        data,
        options
      );
    }

    // Cleanup function
    return () => {
      if (graphInstance.current) {
        graphInstance.current.destroy();
        graphInstance.current = null;
      }
    };
  }, [frequencyData, isDark]);

  return (
    <Card className="rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl dark:bg-gray-900">
      <CardContent className="p-4">
        <div className="col-span-1 lg:col-span-2">
          <div
            ref={graphContainer}
            style={{ width: "100%", height: "350px" }}
            className="dark:text-gray-200"
          />
        </div>
      </CardContent>
    </Card>
  );
}
