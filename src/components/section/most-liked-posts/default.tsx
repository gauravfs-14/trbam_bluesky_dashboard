import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/types/post-types";
import { ThumbsUp } from "lucide-react";
import Link from "next/link";

interface MostLikedPostsProps {
  mostLikedPosts: Post[];
}

export default function MostLikedPosts({
  mostLikedPosts,
}: MostLikedPostsProps) {
  return (
    <>
      {/* Most Liked Posts */}
      <Card className="rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-900">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white dark:from-blue-700 dark:to-indigo-800">
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-5 w-5 opacity-80" />
            <CardTitle>Most Liked Posts</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 bg-white dark:bg-gray-900">
          <ul className="space-y-4">
            {mostLikedPosts.map((post) => (
              <li
                key={post.id}
                className="border-b pb-2 last:border-0 border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start">
                  <Link
                    href={`https://bsky.app/profile/${post.raw_data.author.handle}`}
                    target="_blank"
                  >
                    <Avatar className="mr-2 ring-2 ring-indigo-200 dark:ring-gray-600">
                      <AvatarImage src={post.raw_data.author.avatar} />
                      <AvatarFallback className="bg-blue-100 text-indigo-700 dark:bg-gray-700 dark:text-gray-300">
                        {post.raw_data.author.displayName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {post.raw_data.author.displayName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <Link
                        href={`https://bsky.app/profile/${post.raw_data.author.handle}`}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 transition-colors"
                      >
                        @{post.raw_data.author.handle}
                      </Link>
                    </p>
                    <p className="mt-1 text-gray-900 dark:text-gray-100">
                      {post.text}
                    </p>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {post.like_count} likes
                      </span>
                      <span className="text-sm font-medium">
                        <Link
                          href={`https://bsky.app/profile/${
                            post.raw_data.author.handle
                          }/post/${post.id.split("/").pop()}`}
                          target="_blank"
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 transition-colors"
                        >
                          View in Bsky
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
