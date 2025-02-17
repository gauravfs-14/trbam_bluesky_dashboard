import ClientFrequencyGraph from "@/components/section/frequency-graph/client-wrapper";
import Header from "@/components/section/header/default";
import MetricesCard from "@/components/section/metrices-card/default";
import MostCommentedPosts from "@/components/section/most-commented-posts/default";
import MostLikedPosts from "@/components/section/most-liked-posts/default";
import RecentPostsClient from "@/components/section/recent-posts/client";
import TopAuthors from "@/components/section/top-authors/default";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import Loading from "./loading";
import PopularWords from "@/components/section/popular-words/default";
import Footer from "@/components/footer/default";

export default async function Dashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const allPostsSummary = await fetch(`${baseUrl}/api/posts/allPostsSummary`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(`Failed to fetch allPostsSummary: ${error}`);
    });
  const totalPosts = allPostsSummary.totalPosts;
  const totalLikes = allPostsSummary.totalLikes;
  const totalReplies = allPostsSummary.totalReplies;
  const totalReposts = allPostsSummary.totalReposts;
  const frequencyData = allPostsSummary.frequencyData;
  const mostLikedPosts = allPostsSummary.mostLikedPosts;
  const mostCommentedPosts = allPostsSummary.mostCommentedPosts;
  const topContributors = allPostsSummary.topContributors;

  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto p-4 space-y-6 dark:text-white">
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

          {/* Custom styled tabs */}
          <div className="mb-6 space-y-8">
            <Tabs defaultValue="overview" className="w-full">
              <div className="relative">
                <TabsList className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-1 rounded-lg">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 dark:data-[state=active]:from-blue-700 dark:data-[state=active]:to-indigo-800"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="posts"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 dark:data-[state=active]:from-rose-700 dark:data-[state=active]:to-pink-800"
                  >
                    Posts
                  </TabsTrigger>
                  <TabsTrigger
                    value="authors"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 dark:data-[state=active]:from-emerald-700 dark:data-[state=active]:to-teal-800"
                  >
                    Top Authors
                  </TabsTrigger>
                  <TabsTrigger
                    value="words"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 dark:data-[state=active]:from-violet-700 dark:data-[state=active]:to-purple-800"
                  >
                    Top Words
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Most liked */}
                  <MostLikedPosts mostLikedPosts={mostLikedPosts} />
                  {/* Most commented */}
                  <MostCommentedPosts mostCommentedPosts={mostCommentedPosts} />
                </div>
              </TabsContent>
              <TabsContent value="posts" className="mt-6">
                {/* Use the client component for pagination */}
                <RecentPostsClient />
              </TabsContent>
              <TabsContent value="authors" className="mt-6">
                {/* Top authors */}
                <TopAuthors topContributors={topContributors} />
              </TabsContent>
              <TabsContent value="words" className="mt-6">
                {/* Top words */}
                <PopularWords />
              </TabsContent>
            </Tabs>
          </div>
        </>
      </div>
      <Footer />
    </Suspense>
  );
}
