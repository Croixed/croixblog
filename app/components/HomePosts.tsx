"use client";
import { Separator } from "@/components/ui/separator";
import HomeCard from "./HomeCard";
import { useState } from "react";
import { client } from "../lib/sanity";
import { Button } from "@/components/ui/button";
import { blogCard } from "../lib/interface";

export default function HomePosts({ initialPosts, lastCreated, total }: any) {
  const [posts, setPosts] = useState(initialPosts);

  const loadMorePosts = async () => {
    console.log(lastCreated);
    const query = `
  *[_type == 'blog' && _createdAt < "${lastCreated}"] | order(_createdAt desc) [0...3] {
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage,
    _createdAt
  }`;
    const newPosts = await client.fetch(query);
    setPosts([...posts, ...newPosts]);
  };

  return (
    <div className="my-5 grid grid-cols-1 gap-1 md:gap-5">
      {posts.map((post: blogCard, idx: number) => (
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
        <p className="m-auto font-light">No more posts!</p>
      )}
    </div>
  );
}
