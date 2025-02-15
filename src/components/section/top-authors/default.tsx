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
import { ExternalLink } from "lucide-react";
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
      <Card>
        <CardHeader>
          <CardTitle>Top Contributors</CardTitle>
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
                        <Avatar className="mr-2 h-8 w-8">
                          <AvatarImage src={author.avatar} />
                          <AvatarFallback>
                            {author.displayName[0]}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div>
                        <p className="font-medium">{author.displayName}</p>
                        <Link
                          href={`https://bsky.app/profile/${author.handle}`}
                          target="_blank"
                        >
                          <p className="text-sm text-blue-500 underline">
                            @{author.handle}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{author.postCount}</TableCell>
                  <TableCell>{author.totalLikes}</TableCell>
                  <TableCell>{author.totalReposts}</TableCell>
                  <TableCell>
                    <Link
                      href={`https://bsky.app/profile/${author.handle}`}
                      target="_blank"
                    >
                      <Button>
                        View Profile <ExternalLink />{" "}
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
