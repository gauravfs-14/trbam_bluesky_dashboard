// app/api/posts/route.ts
import { drizzleDb } from "@/db";
import { posts } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Extract pagination from query parameters.
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const offset = (page - 1) * limit;

    // Retrieve all posts from database.
    const allPosts = drizzleDb.select().from(posts).all();

    // Paginate posts.
    const paginatedPosts = allPosts.slice(offset, offset + limit);
    // Parse raw_data JSON string for each post.
    const postsWithParsedData = paginatedPosts.map((post) => ({
      ...post,
      raw_data: post.raw_data ? JSON.parse(post.raw_data) : null,
    }));

    return NextResponse.json({
      posts: postsWithParsedData,
      totalPosts: allPosts.length,
      currentPage: page,
      totalPages: Math.ceil(allPosts.length / limit),
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
