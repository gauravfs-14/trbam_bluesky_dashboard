import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/types/post-types";
import Link from "next/link";

interface MostCommentedPostsProps {
  mostCommentedPosts: Post[];
}

export default function MostCommentedPosts({
  mostCommentedPosts,
}: MostCommentedPostsProps) {
  return (
    <>
      {/* Most Liked Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Most Commented Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {mostCommentedPosts.map((post) => (
              <li key={post.id} className="border-b pb-2 last:border-0">
                <div className="flex items-start">
                  <Link
                    href={`https://bsky.app/profile/${post.raw_data.author.handle}`}
                    target="_blank"
                  >
                    <Avatar className="mr-2">
                      <AvatarImage src={post.raw_data.author.avatar} />
                      <AvatarFallback>
                        {post.raw_data.author.displayName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <p className="font-semibold">
                      {post.raw_data.author.displayName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <Link
                        href={`https://bsky.app/profile/${post.raw_data.author.handle}`}
                        target="_blank"
                      >
                        @{post.raw_data.author.handle}
                      </Link>
                    </p>
                    <p className="mt-1">{post.text}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-sm font-medium">
                        {post.reply_count} comments
                      </span>
                      <span className="text-sm font-medium">
                        <Link
                          href={`https://bsky.app/profile/${
                            post.raw_data.author.handle
                          }/post/${post.id.split("/").pop()}`}
                          target="_blank"
                          className="text-blue-500 underline"
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
