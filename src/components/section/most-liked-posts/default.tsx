import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/types/post-types";

interface MostLikedPostsProps {
  mostLikedPosts: Post[];
}

export default function MostLikedPosts({
  mostLikedPosts,
}: MostLikedPostsProps) {
  return (
    <>
      {/* Most Liked Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Most Liked Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {mostLikedPosts.map((post) => (
              <li key={post.id} className="border-b pb-2 last:border-0">
                <div className="flex items-start">
                  <Avatar className="mr-2">
                    <AvatarImage src={post.raw_data.author.avatar} />
                    <AvatarFallback>
                      {post.raw_data.author.displayName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">
                      {post.raw_data.author.displayName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      @{post.raw_data.author.handle}
                    </p>
                    <p className="mt-1">{post.text}</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-sm font-medium">
                        {post.like_count} likes
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
