"use client";

import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";

import axios from "axios";

export const revalidate = 0;

function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [thread, setThread] = useState({
    liked: [],
    author: {},
    children: [],
  });
  const [userInfo, setUserInfo] = useState({
    image: "",
    id: "",
  });

  useEffect(() => {
    if (isSignedIn) {
      const userID = params.id ? params.id : user.id;
      getThreadById(userID);
      getUserInfo(user.id);
    }
  }, [isSignedIn]);

  const getUserInfo = async (userId: string) => {
    const payload = {
      user_id: userId,
    };
    axios.post("/api/mongo/fetch-user", payload).then((res: any) => {
      const userInfoData = res.data.result;
      setUserInfo(userInfoData);
      if (!userInfoData?.onboarded) {
        router.push("/onboarding");
      }
    });
  };

  const getThreadById = (userId: string) => {
    const payload = {
      thread_id: userId,
    };
    axios.post("/api/mongo/fetch-thread-id", payload).then((res: any) => {
      const threadData = res.data.result;
      if (!threadData) {
        router.push("/");
      }
      setThread(threadData);
    });
  };

  if (isSignedIn && thread) {
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
        {userInfo.id && params.id && (
          <div className="mt-7">
            <Comment
              threadId={params.id}
              currentUserImg={userInfo.image}
              currentUserId={userInfo._id}
              updateThread={getThreadById}
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
              updateThread={getThreadById}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default Page;
