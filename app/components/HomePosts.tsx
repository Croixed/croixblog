"use client";
import { Separator } from "@/components/ui/separator";
import HomeCard from "./HomeCard";
import { useState } from "react";
import { client } from "../lib/sanity";
import { Button } from "@/components/ui/button";

export default function HomePosts({ data, lastId, total }: any) {
  const [posts, setPosts] = useState(data); // should probably rename data to initialPosts

  const loadMorePosts = async () => {
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
      {total !== posts.length ? (
        <Button
          onClick={loadMorePosts}
          className="text-md m-auto w-min font-bold"
        >
          Load more
        </Button>
      ) : (
        <p className="m-auto">No more posts!</p>
      )}
    </div>
  );
}
