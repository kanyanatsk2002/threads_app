"use client";

import { useEffect, useState } from "react";

import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";

import axios from "axios";

export const revalidate = 0;

function page({ params }: { params: { id: string } }) {
  const [thread, setThread] = useState({
    liked: [],
    author: {},
    children: [],
  });

  useEffect(() => {
    getThreadById();
  }, []);

  const getThreadById = () => {
    const payload = {
      thread_id: params.id,
    };
    axios.post("/api/mongo/fetch-thread-id", payload).then((res: any) => {
      const threadData = res.data.result;
      console.log(threadData);
      setThread(threadData);
    });
  };

  return (
    <section className="relative">
      {thread._id && (
        <div>
          <ThreadCard
            id={thread._id}
            threadId={thread._id}
            currentUserId={user.id}
            parentId={thread.parentId}
            content={thread.text}
            author={thread.author}
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
            liked={thread.liked}
          />
        </div>
      )}
      {params.id && (
        <div className="mt-7">
          <Comment
            threadId={params.id}
            currentUserImg={user.imageUrl}
            currentUserId={userInfo._id}
          />
        </div>
      )}

      <div className="mt-10">
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            threadId={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
            liked={childItem.liked}
          />
        ))}
      </div>
    </section>
  );
}

export default page;
