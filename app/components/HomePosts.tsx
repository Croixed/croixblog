"use client";
import { Separator } from "@/components/ui/separator";
import HomeCard from "./HomeCard";
import { useState } from "react";
import { client } from "../lib/sanity";

export default function HomePosts({ data, lastId }: any) {
  const [posts, setPosts] = useState(data); // should probably rename data to initialPosts

  const loadMorePosts = async () => {
    console.log("testtt");
    const query = `
  *[_type == 'blog' && _createdAt < '2024-02-22T01:50:02Z'] | order(_createdAt desc) [0...3] {
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage,
    _id
  }`;
    const newPosts = await client.fetch(query);
    setPosts([...posts, ...newPosts]);
    console.log(posts);
  };

  return (
    <div className="my-5 grid grid-cols-1 gap-1 md:gap-5">
      {posts.map((post: any, idx: any) => (
        <>
          <HomeCard post={post} key={post.currentSlug} />
          {idx !== posts.length - 1 ? (
            <Separator className="hidden md:block" />
          ) : null}
        </>
      ))}
      <button onClick={loadMorePosts}>Load more</button>
    </div>
  );
}
