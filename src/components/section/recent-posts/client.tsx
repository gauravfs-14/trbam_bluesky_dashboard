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
import { Rss } from "lucide-react";

interface Post {
  id: string;
  created_at: string;
  text: string;
  raw_data: {
    author: {
      handle: string;
      avatar: string;
      displayName: string;
    };
    embed?: {
      images?: {
        thumb: string;
        alt?: string;
      }[];
    };
  };
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
      const res = await fetch(`${baseUrl}/api/posts?page=${page}&limit=10`);
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
    <Card className="rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl dark:bg-gray-900">
      <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-600 text-white dark:from-rose-700 dark:to-pink-800">
        <div className="flex items-center gap-2">
          <Rss className="h-5 w-5 opacity-80" />
          <CardTitle>Recent Posts</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 dark:text-gray-300">
        {loading ? (
          <Loading />
        ) : (
          <ul className="space-y-6">
            {data.posts.map((post) => (
              <li
                key={post.id}
                className="border-b pb-4 last:border-0 dark:border-gray-700"
              >
                <div className="flex items-start">
                  <Link
                    href={`https://bsky.app/profile/${post.raw_data.author.handle}`}
                    target="_blank"
                  >
                    <Avatar className="mr-2 ring-2 ring-pink-200 dark:ring-pink-500">
                      <AvatarImage src={post.raw_data.author.avatar} />
                      <AvatarFallback className="bg-rose-100 text-pink-700 dark:bg-rose-700 dark:text-pink-200">
                        {post.raw_data.author.displayName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold dark:text-gray-100">
                          {post.raw_data.author.displayName}
                        </p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          <Link
                            href={`https://bsky.app/profile/${post.raw_data.author.handle}`}
                            target="_blank"
                            className="text-rose-600 hover:text-rose-700 transition-colors dark:text-rose-400 dark:hover:text-rose-500"
                          >
                            @{post.raw_data.author.handle}
                          </Link>
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground dark:text-gray-400">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 dark:text-gray-200">{post.text}</p>
                    {post.raw_data.embed &&
                      post.raw_data.embed.images &&
                      post.raw_data.embed.images.length > 0 && (
                        <div className="mt-3 grid grid-cols-2 gap-2 w-fit">
                          {post.raw_data.embed.images.map(
                            (
                              img: { thumb: string; alt?: string },
                              idx: number
                            ) => (
                              <img
                                key={idx}
                                src={img.thumb}
                                alt={img.alt || ""}
                                className="rounded-md max-h-48 object-cover dark:border-gray-700"
                              />
                            )
                          )}
                        </div>
                      )}
                    <div className="mt-3 flex items-center space-x-4">
                      <span className="text-sm dark:text-gray-400">
                        {post.like_count} likes
                      </span>
                      <span className="text-sm dark:text-gray-400">
                        {post.reply_count} replies
                      </span>
                      <span className="text-sm dark:text-gray-400">
                        {post.repost_count} reposts
                      </span>
                      <span className="text-sm">
                        <Link
                          href={`https://bsky.app/profile/${
                            post.raw_data.author.handle
                          }/post/${post.id.split("/").pop()}`}
                          target="_blank"
                          className="text-rose-600 hover:text-rose-700 transition-colors font-semibold dark:text-rose-400 dark:hover:text-rose-500"
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
                  className="cursor-pointer dark:text-gray-400"
                />
              )}
              <span className="px-4 text-sm dark:text-gray-400">
                Page {data.currentPage} of {data.totalPages}
              </span>
              {page < data.totalPages && (
                <PaginationNext
                  onClick={() => setPage(page + 1)}
                  className="cursor-pointer dark:text-gray-400"
                />
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
}
