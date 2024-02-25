"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import ThreadCard from "../cards/ThreadCard";
import axios from "axios";

interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    liked: any;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab = ({ currentUserId, accountId, accountType }: Props) => {
  const [result, setResult] = useState({ threads: [] });

  useEffect(() => {
    if (accountType === "Community") {
      console.log("Community =>");
      fetchCommunityPosts();
    } else {
      console.log("USer =>");
      fetchUserPosts();
    }
  }, [accountType]);

  const fetchCommunityPosts = async () => {
    const payload = {
      account_id: accountId,
    };
    await axios
      .post("/api/mongo/fetch-community-posts", payload)
      .then((res: any) => {
        const resultData = res.data.result;
        setResult(resultData);
      });
  };

  const fetchUserPosts = async () => {
    const payload = {
      account_id: accountId,
    };
    await axios
      .post("/api/mongo/fetch-user-posts", payload)
      .then((res: any) => {
        console.log("res ==>", res);
        const resultData = res.data.result;
        setResult(resultData);
      });
  };

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result &&
        result.threads.map((thread) => (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            threadId={thread._id}
            currentUserId={currentUserId}
            parentId={thread.parentId}
            content={thread.text}
            author={
              accountType === "User"
                ? { name: result.name, image: result.image, id: result.id }
                : {
                    name: thread.author.name,
                    image: thread.author.image,
                    id: thread.author.id,
                  }
            }
            community={
              accountType === "Community"
                ? { name: result.name, id: result.id, image: result.image }
                : thread.community
            }
            createdAt={thread.createdAt}
            comments={thread.children}
            liked={thread.liked}
          />
        ))}
    </section>
  );
};

export default ThreadsTab;
