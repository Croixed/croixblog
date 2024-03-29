import { blogFull } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 40;

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

  // I really ought to extract this
  const ArticleImage = ({ value }: any) => {
    // return <img src={urlFor(value).url()} />;
    return (
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={urlFor(value).url()}
          alt="article image"
          fill={true}
          className="md:rounded-md"
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  };

  const components = {
    types: {
      image: ArticleImage,
    },
  };

  return (
    <div className="mt-2">
      <h1>
        <span className="mt-4 block text-center text-base font-semibold uppercase tracking-wide text-primary">
          La Croix Blog
        </span>
        <div className="mt-2 text-center text-3xl font-bold leading-8 tracking-tight sm:text-4xl">
          {data.title}
        </div>
      </h1>

      <div className="relative h-[300px] md:h-[600px]">
        <Image
          src={urlFor(data.titleImage).url()}
          fill={true}
          alt="title Image"
          priority
          className="m-auto mt-8 border md:rounded-lg"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="prose prose-green m-auto px-4 py-12 dark:prose-invert md:prose-lg prose-p:leading-6 md:px-0">
        <PortableText value={data.content} components={components} />
      </div>
    </div>
  );
}
