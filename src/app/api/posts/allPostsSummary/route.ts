import { NextResponse } from "next/server";
import { drizzleDb } from "@/db";
import { posts } from "@/db/schema";

export async function GET() {
  try {
    // Retrieve all posts from database.
    const allPosts = drizzleDb.select().from(posts).all();
    // Filter posts to only include those from 2024 and 2025.
    const filteredPosts = allPosts.filter((post) => {
      const year = new Date(post.created_at ?? 0).getFullYear();
      return year === 2024 || year === 2025;
    });

    // Parse raw_data JSON string for each post.
    const postsWithParsedData = filteredPosts.map((post) => ({
      ...post,
      raw_data: post.raw_data ? JSON.parse(post.raw_data) : null,
    }));
    // Group posts by full date based on created_at.
    const postsByDate: { [key: string]: number } = {};
    postsWithParsedData.forEach((post) => {
      const dateKey = new Date(post.created_at ?? 0)
        .toISOString()
        .split("T")[0];
      postsByDate[dateKey] = (postsByDate[dateKey] || 0) + 1;
    });

    // Create frequency data sorted by date.
    const frequencyData = Object.entries(postsByDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const totalPosts = postsWithParsedData.length;
    const totalLikes = postsWithParsedData.reduce(
      (sum, post) => sum + (post.like_count || 0),
      0
    );
    const totalReplies = postsWithParsedData.reduce(
      (sum, post) => sum + (post.reply_count || 0),
      0
    );
    const totalReposts = postsWithParsedData.reduce(
      (sum, post) => sum + (post.repost_count || 0),
      0
    );

    const mostLikedPosts = [...postsWithParsedData]
      .sort((a, b) => (b.like_count || 0) - (a.like_count || 0))
      .slice(0, 5);

    const mostCommentedPosts = [...postsWithParsedData]
      .sort((a, b) => (b.reply_count || 0) - (a.reply_count || 0))
      .slice(0, 5);

    const sortedByCreationAsc = [...postsWithParsedData].sort(
      (a, b) =>
        new Date(a.created_at ?? 0).getTime() -
        new Date(b.created_at ?? 0).getTime()
    );
    const oldestPost = sortedByCreationAsc[0] || null;
    const latestPost =
      [...postsWithParsedData].sort(
        (a, b) =>
          new Date(b.created_at ?? 0).getTime() -
          new Date(a.created_at ?? 0).getTime()
      )[0] || null;

    // Compute top contributors based on parsed raw_data.
    const contributors: {
      [key: string]: {
        displayName: string;
        handle: string;
        avatar: string;
        postCount: number;
        totalLikes: number;
        totalReposts: number;
      };
    } = {};
    postsWithParsedData.forEach((post) => {
      if (post.raw_data && post.raw_data.author) {
        const author = post.raw_data.author;
        const handle = author.handle;
        if (!contributors[handle]) {
          contributors[handle] = {
            displayName: author.displayName,
            handle: author.handle,
            avatar: author.avatar,
            postCount: 0,
            totalLikes: 0,
            totalReposts: 0,
          };
        }
        contributors[handle].postCount += 1;
        contributors[handle].totalLikes += post.like_count || 0;
        contributors[handle].totalReposts += post.repost_count || 0;
      }
    });
    const topContributors = Object.values(contributors)
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 10);

    return NextResponse.json({
      totalPosts,
      totalLikes,
      totalReplies,
      totalReposts,
      frequencyData,
      topContributors,
      oldestPost,
      latestPost,
      mostLikedPosts,
      mostCommentedPosts,
    });
  } catch (error) {
    console.error("Error fetching posts summary:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts summary" },
      { status: 500 }
    );
  }
}
