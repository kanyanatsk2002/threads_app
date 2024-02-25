"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import axios from "axios";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [userInfo, setUserInfo] = useState({ threads: [] });
  useEffect(() => {
    if (isSignedIn) {
      getUserInfo();
    }
  }, [isSignedIn]);

  const getUserInfo = async () => {
    const payload = {
      user_id: params.id,
    };
    axios.post("/api/mongo/fetch-user", payload).then((res: any) => {
      const userInfo = res.data.result;
      console.log(userInfo);
      setUserInfo(userInfo);
      if (!userInfo?.onboarded) router.push("/onboarding");
    });
  };

  if (isSignedIn) {
    return (
      <section>
        {userInfo.id && (
          <>
            <ProfileHeader
              accountId={userInfo.id}
              authUserId={userInfo.id}
              name={userInfo.name}
              username={userInfo.username}
              imgUrl={userInfo.image}
              bio={userInfo.bio}
            />

            <div className="mt-9">
              <ThreadsTab
                currentUserId={userInfo.id}
                accountId={userInfo.id}
                accountType="User"
              />
            </div>
          </>
        )}
      </section>
    );
  }
};
export default Page;
