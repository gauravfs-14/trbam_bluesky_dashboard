import dynamic from "next/dynamic";

import ClientFrequencyGraph from "@/components/section/frequency-graph/client-wrapper";

import Header from "@/components/section/header/default";
import MetricesCard from "@/components/section/metrices-card/default";
import MostCommentedPosts from "@/components/section/most-commented-posts/default";
import MostLikedPosts from "@/components/section/most-liked-posts/default";
import RecentPosts from "@/components/section/recent-posts/default";
import TopAuthors from "@/components/section/top-authors/default";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Dashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const allPostsSummary = await fetch(`${baseUrl}/api/posts/allPostsSummary`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(`Failed to fetch allPostsSummary: ${error}`);
    });
  const posts = await fetch(`${baseUrl}/api/posts`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(`Failed to fetch posts: ${error}`);
    });

  const totalPosts = allPostsSummary.totalPosts;
  const totalLikes = allPostsSummary.totalLikes;
  const totalReplies = allPostsSummary.totalReplies;
  const totalReposts = allPostsSummary.totalReposts;
  const frequencyData = allPostsSummary.frequencyData;
  const mostLikedPosts = allPostsSummary.mostLikedPosts;
  const mostCommentedPosts = allPostsSummary.mostCommentedPosts;
  const mostRecentPosts = posts.posts;
  const topContributors = allPostsSummary.topContributors;

  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <Header />
        <>
          {/* Metrices Cards */}

          <MetricesCard
            totalPosts={totalPosts}
            totalLikes={totalLikes}
            totalReplies={totalReplies}
            totalReposts={totalReposts}
          />

          {/* Frequency graph via client component wrapper */}
          <ClientFrequencyGraph frequencyData={frequencyData} />

          <Tabs defaultValue="overview" className="mb-6 space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="authors">
                Top Contributors Authors
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Most liked */}
                <MostLikedPosts mostLikedPosts={mostLikedPosts} />
                {/* Most commented */}
                <MostCommentedPosts mostCommentedPosts={mostCommentedPosts} />
              </div>
            </TabsContent>

            <TabsContent value="posts">
              {/* Recent Posts */}
              <RecentPosts mostRecentPosts={mostRecentPosts} />
            </TabsContent>
            <TabsContent value="authors">
              {/* Top authors */}
              <TopAuthors topContributors={topContributors} />
            </TabsContent>
          </Tabs>
        </>
      </div>
    </Suspense>
  );
}
