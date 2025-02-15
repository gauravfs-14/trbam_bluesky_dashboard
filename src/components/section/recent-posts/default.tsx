import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/types/post-types";
import Link from "next/link";

export default function RecentPosts({
  mostRecentPosts,
}: {
  mostRecentPosts: Post[];
}) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-6">
            {mostRecentPosts.map((post) => {
              return (
                <li key={post.id} className="border-b pb-4 last:border-0">
                  <div className="flex items-start">
                    <Link
                      href={`https://bsky.app/profile/${post.raw_data.author.handle}`}
                      target="_blank"
                    >
                      <Avatar className="mr-3">
                        <AvatarImage src={post.raw_data.author.avatar} />
                        <AvatarFallback>
                          {post.raw_data.author.displayName[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="w-full">
                      <div className="flex items-center justify-between">
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
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-2">{post.text}</p>

                      {post.raw_data.embed &&
                        post.raw_data.embed.images &&
                        post.raw_data.embed.images.length > 0 && (
                          <div className="mt-3 grid grid-cols-2 gap-2 w-fit">
                            {post.raw_data.embed.images.map((img, idx) => (
                              <img
                                key={idx}
                                src={img.thumb}
                                alt={img.alt || ""}
                                className="rounded-md max-h-48 object-cover"
                              />
                            ))}
                          </div>
                        )}

                      <div className="mt-3 flex items-center space-x-4">
                        <span className="text-sm">{post.like_count} likes</span>
                        <span className="text-sm">
                          {post.reply_count} replies
                        </span>
                        <span className="text-sm">
                          {post.repost_count} reposts
                        </span>
                        <span className="text-sm">
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
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
