import { blogCard } from "./lib/interface";
import { client } from "./lib/sanity";
import { Separator } from "@/components/ui/separator";
import Featured from "./components/Featured";
import HomeCard from "./components/HomeCard";

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
  // console.log(data);
  return (
    <>
      <p className="pl-4 pt-4 font-bold uppercase md:pl-0">Featured</p>
      <Featured data={data} />
      <p className="pl-4 pt-4 font-bold uppercase md:pl-0">Latest</p>
      <div className="my-5 grid grid-cols-1 gap-1 md:gap-5">
        {data.map((post, idx) => (
          <>
            <HomeCard post={post} key={post.currentSlug} />
            {idx !== data.length - 1 ? (
              <Separator className="hidden md:block" />
            ) : null}
          </>
        ))}
      </div>
    </>
  );
}
