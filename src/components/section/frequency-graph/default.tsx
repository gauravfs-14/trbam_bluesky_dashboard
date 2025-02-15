"use client";

import React, { useEffect, useRef } from "react";
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
        return date.toLocaleDateString(undefined, {
          month: "short",
          year: "numeric",
        });
      };

      const valueFormatter = (idx: number) => {
        if (idx < 0 || idx >= uniqueDates.length) return "";
        const date = new Date(uniqueDates[idx]);
        return date.toLocaleDateString();
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
        rangeSelectorPlotFillColor: "rgba(66, 133, 244, 0.3)",
        rangeSelectorPlotStrokeColor: "#4285F4",
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
          },
        },
        series: {
          Count: {
            color: "#4285F4",
          },
        },
        // Increase height to accommodate range selector
        height: 280, // Main chart height
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
  }, [frequencyData]);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="col-span-1 lg:col-span-2">
          {/* Increase container height to accommodate range selector */}
          <div
            ref={graphContainer}
            style={{ width: "100%", height: "350px" }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
