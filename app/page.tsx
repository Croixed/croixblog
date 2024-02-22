import { Card, CardContent } from "@/components/ui/card";
import { blogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: blogCard[] = await getData();

  console.log(data);
  return (
    <div className="my-5 grid grid-cols-1 gap-5 md:grid-cols-2">
      {/* should probably use a better key than an iterator? */}
      {data.map((post, idx) => (
        <Card className="flex flex-col" key={idx}>
          <Image
            src={urlFor(post.titleImage).url()}
            alt="image"
            width={600}
            height={600}
            className="h-[200px] rounded-t-lg object-cover"
          />
          <CardContent className="mt-5 flex-grow">
            <div className="flex h-full flex-col justify-between">
              <h3 className="line-clamp-2 text-lg font-bold">{post.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                {post.smallDescription}
              </p>
              <div className="flex-grow"></div>
              <Button asChild className="mt-2 w-full">
                <Link href={`/blog/${post.currentSlug}`}>Read More...</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
