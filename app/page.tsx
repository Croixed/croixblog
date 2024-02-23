import { Card, CardContent } from "@/components/ui/card";
import { blogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const revalidate = 40;

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
    <>
      <p className="pl-4 pt-4 uppercase md:pl-0">Recent Posts</p>
      <div className="my-5 grid grid-cols-1 gap-1 md:gap-5">
        {/* should probably use a better key than an iterator? */}
        {data.map((post, idx) => (
          <>
            <Card
              className="flex flex-col border-none bg-background shadow-none md:flex-row"
              key={idx}
            >
              <div className="relative h-60 w-screen flex-shrink-0 md:h-60 md:w-60">
                <Image
                  src={urlFor(post.titleImage).url()}
                  alt="image"
                  // width={600}
                  // height={600}
                  fill={true}
                  className="object-cover md:h-[200px]"
                />
              </div>
              <CardContent className="m-3 flex-grow p-0">
                <div className="flex h-full flex-col justify-between">
                  <h3 className="line-clamp-2 text-3xl font-bold">
                    {post.title}
                  </h3>
                  <p className="text-md my-4 line-clamp-3 font-serif text-gray-600 dark:text-gray-400 md:my-0">
                    {post.smallDescription}
                  </p>
                  <Button
                    variant="link"
                    asChild
                    className="m-0 h-6 w-min p-0 text-lg font-bold uppercase"
                  >
                    <Link href={`/blog/${post.currentSlug}`} className="">
                      Read More
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            {/* <div className="">

            </div> */}
            {idx !== data.length - 1 ? (
              <Separator className="hidden md:block" />
            ) : null}
          </>
        ))}
      </div>
    </>
  );
}
