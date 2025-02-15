"use client";

import dynamic from "next/dynamic";

interface FrequencyDataProps {
  date: string;
  count: number;
}

export interface FrequencyGraphProps {
  frequencyData: FrequencyDataProps[];
}

const FrequencyGraphDynamic = dynamic(() => import("./default"), {
  ssr: false,
});

export default function ClientFrequencyGraph(props: FrequencyGraphProps) {
  return <FrequencyGraphDynamic {...props} />;
}
