import { blogCard } from "./lib/interface";
import { client } from "./lib/sanity";
import { Separator } from "@/components/ui/separator";
import Featured from "./components/Featured";
import HomeCard from "./components/HomeCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import HomePosts from "./components/HomePosts";

export const revalidate = 40;

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) [0...3] {
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage,
    _id
  }`;

  const data = await client.fetch(query);
  return data;
}

// async function loadMoreHandler() {
//   const query = `
//   *[_type == 'blog' && _id > $lastId] | order(_createdAt desc) [0...3] {
//     title,
//     smallDescription,
//     "currentSlug": slug.current,
//     titleImage,
//   }`;
// }

export default async function Home() {
  const data: blogCard[] = await getData();
  // const [currentData, setCurrentData] = useState(data);
  console.log(data);
  console.log("testttt");
  let lastId = data[data.length - 1]._id;
  return (
    <>
      <p className="pl-4 pt-4 font-bold uppercase md:pl-0">Featured</p>
      <Featured data={data} />
      <p className="pl-4 pt-4 font-bold uppercase md:pl-0">Latest</p>
      <HomePosts data={data} lastId={lastId} />
      {/* <Button
        className="m-auto mb-5 font-bold"
        onClick={() => loadMoreHandler()}
      >
        Load More
      </Button> */}
    </>
  );
}
