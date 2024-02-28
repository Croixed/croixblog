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
  *[_type == 'blog'] | order(_createdAt desc) [0...4] {
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage,
    _createdAt
  }`;

  const data = await client.fetch(query);
  return data;
}

async function getTotal() {
  const query = `count(*[_type == "blog"])`;
  const total = await client.fetch(query);
  return total;
}

export default async function Home() {
  const data: blogCard[] = await getData();
  const total: number = await client.fetch('count(*[_type == "blog"])');
  // console.log(data);
  let createdAt: string = data[data.length - 1]._createdAt;
  return (
    <>
      <p className="pl-4 pt-4 font-bold uppercase md:pl-0">Featured</p>
      <Featured data={data} />
      <p className="pl-4 pt-4 font-bold uppercase md:pl-0">Latest</p>
      <HomePosts data={data} lastCreated={createdAt} total={total} />
    </>
  );
}
