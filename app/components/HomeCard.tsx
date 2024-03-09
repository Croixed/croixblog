import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { blogCard } from "../lib/interface";

export default function HomeCard({ post }: { post: blogCard }) {
  const date = post._createdAt.split("T")[0].split("-").map(Number);

  return (
    <Card className="flex flex-col border-none bg-background shadow-none md:flex-row">
      <div className="relative h-60 w-screen flex-shrink-0 md:h-60 md:w-60">
        <Image
          src={urlFor(post.titleImage).url()}
          alt="image"
          fill={true}
          className="object-cover md:h-[200px]"
          quality={50}
        />
      </div>
      <CardContent className="m-3 flex-grow p-0">
        <Link href={`/blog/${post.currentSlug}`} className="">
          <div className="flex h-full flex-col justify-between">
            <h3 className="line-clamp-2 text-3xl font-bold">{post.title}</h3>
            <p className="text-md my-4 line-clamp-3 font-serif text-gray-600 dark:text-gray-400 md:my-0">
              {post.smallDescription}
            </p>
            <span className="flex items-center gap-4">
              <Button
                variant="link"
                className="m-0 h-6 w-min p-0 text-lg font-bold uppercase"
              >
                Read More
              </Button>
              <p className="h-min text-sm text-gray-600 dark:text-gray-400">
                {new Date(date[0], date[1] - 1, date[2]).toLocaleString("en", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </span>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
