"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import axios from "axios";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [userInfo, setUserInfo] = useState({ threads: [] });
  useEffect(() => {
    console.log("useEffect");
    if (isSignedIn) {
      getUserInfo(user.id);
    }
  }, [isSignedIn]);

  const getUserInfo = async (userId: string) => {
    const payload = {
      user_id: userId,
    };
    axios.post("/api/mongo/fetch-user", payload).then((res: any) => {
      const userInfo = res.data.result;
      setUserInfo(userInfo);
      if (!userInfo?.onboarded) router.push("/onboarding");
    });
  };

  if (isSignedIn) {
    return (
      <section>
        <ProfileHeader
          accountId={user.id}
          authUserId={user.id}
          name={userInfo.name}
          username={userInfo.username}
          imgUrl={userInfo.image}
          bio={userInfo.bio}
        />

        <div className="mt-9">
          <ThreadsTab
            currentUserId={user.id}
            accountId={user.id}
            accountType="User"
          />
        </div>
      </section>
    );
  }
};
export default Page;
