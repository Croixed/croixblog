import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blogCard } from "../lib/interface";
import Image from "next/image";
import { urlFor } from "../lib/sanity";
import Link from "next/link";

type FeaturedProps = {
  data: blogCard[];
};

export default function Featured({ data }: FeaturedProps) {
  const featured = data.slice(-3);
  return (
    <div className="grid grid-cols-2 gap-3 pt-4 md:grid-cols-3">
      {featured.map((item, index) => (
        <Card
          key={item.title}
          // there has to be a more readable way to write the following line
          className={`relative h-60 border-none ${index === featured.length - 1 && featured.length % 2 !== 0 ? "col-span-2 md:col-span-1" : ""}`}
        >
          <CardContent className="relative h-full">
            <Image
              src={urlFor(item.titleImage).url()}
              alt="image"
              fill={true}
              priority
              className="object-cover"
              quality={40}
            />
          </CardContent>
          <CardHeader className="absolute bottom-0 left-0 flex min-h-24 w-full flex-col-reverse bg-gradient-to-t from-black from-5% to-transparent p-2">
            <Link href={`/blog/${item.currentSlug}`} className="">
              <CardTitle className="text-white">{item.title}</CardTitle>
            </Link>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
