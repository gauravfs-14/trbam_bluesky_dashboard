import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, Users } from "lucide-react";
import Link from "next/link";

interface TopContributorsProps {
  displayName: string;
  handle: string;
  avatar: string;
  postCount: number;
  totalLikes: number;
  totalReposts: number;
}

interface TopAuthorsProps {
  topContributors: TopContributorsProps[];
}

export default function TopAuthors({ topContributors }: TopAuthorsProps) {
  return (
    <>
      <Card className="rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl dark:bg-gray-900">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white dark:bg-gradient-to-r dark:from-emerald-700 dark:to-teal-800">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 opacity-80" />
            <CardTitle>Top Contributors</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Posts</TableHead>
                <TableHead>Total Likes</TableHead>
                <TableHead>Total Reposts</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topContributors.map((author) => (
                <TableRow key={author.handle}>
                  <TableCell>
                    <div className="flex items-center">
                      <Link
                        href={`https://bsky.app/profile/${author.handle}`}
                        target="_blank"
                      >
                        <Avatar className="mr-2 h-8 w-8 ring-2 ring-emerald-200 dark:ring-emerald-400">
                          <AvatarImage src={author.avatar} />
                          <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-100">
                            {author.displayName[0]}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div>
                        <p className="font-medium dark:text-white">
                          {author.displayName}
                        </p>
                        <Link
                          href={`https://bsky.app/profile/${author.handle}`}
                          target="_blank"
                        >
                          <p className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors dark:text-emerald-400 dark:hover:text-emerald-500">
                            @{author.handle}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="dark:text-white">
                    {author.postCount.toLocaleString()}
                  </TableCell>
                  <TableCell className="dark:text-white">
                    {author.totalLikes.toLocaleString()}
                  </TableCell>
                  <TableCell className="dark:text-white">
                    {author.totalReposts.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`https://bsky.app/profile/${author.handle}`}
                      target="_blank"
                    >
                      <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 text-white shadow-md hover:shadow-lg flex items-center gap-2 rounded-full px-4 group dark:bg-gradient-to-r dark:from-emerald-700 dark:to-teal-800 dark:hover:from-emerald-800 dark:hover:to-teal-900">
                        <span>View Profile</span>
                        <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
