"use client";

import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";
import axios from "axios";

function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [result, setResult] = useState({ posts: [] });

  useEffect(() => {
    if (isSignedIn) {
      getUserInfo(user.id);
      getPosts();
    }
  }, [isSignedIn]);

  const getUserInfo = async (userId: string) => {
    console.log(userId);
    const payload = {
      user_id: userId,
    };
    axios.post("/api/mongo/fetch-user", payload).then((res: any) => {
      const userInfo = res.data.result;
      if (!userInfo?.onboarded) {
        router.push("/onboarding");
      }
    });
  };

  const getPosts = async () => {
    const payload = {
      page: searchParams.page ? +searchParams.page : 1,
    };
    axios.post("/api/mongo/fetch-posts", payload).then((res: any) => {
      const postsData = res.data.result;
      setResult(postsData);
    });
  };

  if (isSignedIn) {
    return (
      <>
        <h1 className="head-text text-left">Home</h1>

        <section className="mt-9 flex flex-col gap-10">
          {result.posts.length === 0 ? (
            <p className="no-result">No threads found</p>
          ) : (
            <>
              {result.posts.map((post) => (
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  threadId={post._id}
                  currentUserId={user.id}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                  liked={post.liked}
                />
              ))}
            </>
          )}
        </section>

        <Pagination
          path="/"
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </>
    );
  }
}

export default Home;
