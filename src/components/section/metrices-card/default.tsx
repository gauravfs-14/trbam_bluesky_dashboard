import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

interface MetricesCardProps {
  totalPosts: number;
  totalLikes: number;
  totalReplies: number;
  totalReposts: number;
}

export default function MetricesCard({
  totalPosts,
  totalLikes,
  totalReplies,
  totalReposts,
}: MetricesCardProps) {
  return (
    <>
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLikes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Replies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReplies}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reposts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReposts}</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
