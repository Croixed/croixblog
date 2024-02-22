import { blogFull } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

async function getData(slug: string) {
  const query = `
  *[_type == 'blog' && slug.current == '${slug}'] {
    title,
    titleImage,
    content,
    "currentSlug": slug.current
  }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: blogFull = await getData(params.slug);
  return (
    <div className="mt-2">
      <h1>
        <span className="block text-center text-base font-semibold uppercase tracking-wide text-primary">
          La Croix Blog
        </span>
        <div className="mt-2 text-center text-3xl font-bold leading-8 tracking-tight sm:text-4xl">
          {data.title}
        </div>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt="title Image"
        priority
        className="m-auto mt-8 rounded-lg border"
      />

      <div className="prose prose-lg prose-green dark:prose-invert m-auto my-12">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
