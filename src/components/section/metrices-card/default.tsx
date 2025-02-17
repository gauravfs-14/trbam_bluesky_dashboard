import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ThumbsUp, MessageCircle, Repeat } from "lucide-react";

interface MetricsCardProps {
  totalPosts: number;
  totalLikes: number;
  totalReplies: number;
  totalReposts: number;
}

export default function MetricsCard({
  totalPosts,
  totalLikes,
  totalReplies,
  totalReposts,
}: MetricsCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
        <CardHeader className="flex flex-col space-y-2 pb-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white dark:from-blue-700 dark:to-indigo-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-5 w-5 opacity-80" />
          </div>
          <div className="text-3xl font-bold">
            {totalPosts.toLocaleString()}
          </div>
        </CardHeader>
        <CardContent className="bg-white pt-4 dark:bg-gray-900">
          <div className="text-sm text-blue-600 font-medium dark:text-blue-400">
            All published content
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
        <CardHeader className="flex flex-col space-y-2 pb-4 bg-gradient-to-br from-rose-500 to-pink-600 text-white dark:from-rose-700 dark:to-pink-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <ThumbsUp className="h-5 w-5 opacity-80" />
          </div>
          <div className="text-3xl font-bold">
            {totalLikes.toLocaleString()}
          </div>
        </CardHeader>
        <CardContent className="bg-white pt-4 dark:bg-gray-900">
          <div className="text-sm text-rose-600 font-medium dark:text-rose-400">
            Engagement metric
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
        <CardHeader className="flex flex-col space-y-2 pb-4 bg-gradient-to-br from-emerald-500 to-teal-600 text-white dark:from-emerald-700 dark:to-teal-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Total Replies</CardTitle>
            <MessageCircle className="h-5 w-5 opacity-80" />
          </div>
          <div className="text-3xl font-bold">
            {totalReplies.toLocaleString()}
          </div>
        </CardHeader>
        <CardContent className="bg-white pt-4 dark:bg-gray-900">
          <div className="text-sm text-emerald-600 font-medium dark:text-emerald-400">
            Conversation threads
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
        <CardHeader className="flex flex-col space-y-2 pb-4 bg-gradient-to-br from-violet-500 to-purple-600 text-white dark:from-violet-700 dark:to-purple-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Total Reposts</CardTitle>
            <Repeat className="h-5 w-5 opacity-80" />
          </div>
          <div className="text-3xl font-bold">
            {totalReposts.toLocaleString()}
          </div>
        </CardHeader>
        <CardContent className="bg-white pt-4 dark:bg-gray-900">
          <div className="text-sm text-violet-600 font-medium dark:text-violet-400">
            Content shares
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
