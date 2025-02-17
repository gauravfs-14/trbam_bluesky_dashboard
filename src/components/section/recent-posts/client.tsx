"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import Loading from "@/app/loading";

interface Post {
  id: string;
  created_at: string;
  text: string;
  raw_data: any;
  like_count?: number;
  reply_count?: number;
  repost_count?: number;
}

interface PaginatedPosts {
  posts: Post[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
}

export default function RecentPostsClient() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<PaginatedPosts>({
    posts: [],
    totalPosts: 0,
    currentPage: 1,
    totalPages: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/posts?page=${page}&limit=10`, {
        cache: "no-store",
      });
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Posts</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Loading />
        ) : (
          <ul className="space-y-6">
            {data.posts.map((post) => (
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
                          {post.raw_data.embed.images.map(
                            (img: any, idx: number) => (
                              <img
                                key={idx}
                                src={img.thumb}
                                alt={img.alt || ""}
                                className="rounded-md max-h-48 object-cover"
                              />
                            )
                          )}
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
            ))}
          </ul>
        )}
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              {page > 1 && (
                <PaginationPrevious
                  onClick={() => setPage(page - 1)}
                  className="cursor-pointer"
                />
              )}
              <span className="px-4 text-sm">
                Page {data.currentPage} of {data.totalPages}
              </span>
              {page < data.totalPages && (
                <PaginationNext
                  onClick={() => setPage(page + 1)}
                  className="cursor-pointer"
                />
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
}
