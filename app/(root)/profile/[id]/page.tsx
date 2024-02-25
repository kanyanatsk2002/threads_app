"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import { profileTabs } from "@/constants";

import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
          {/* <Tabs defaultValue="threads" className="w-full">
            <TabsList className="tab">
              {profileTabs.map((tab) => (
                <TabsTrigger key={tab.label} value={tab.value} className="tab">
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <p className="max-sm:hidden">{tab.label}</p>

                  {tab.label === "Threads" && (
                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                      {userInfo.threads.length}
                    </p>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            {profileTabs.map((tab) => (
              <TabsContent
                key={`content-${tab.label}`}
                value={tab.value}
                className="w-full text-light-1"
              >
               
                <ThreadsTab
                  currentUserId={user.id}
                  accountId={userInfo.id}
                  accountType="User"
                />
              </TabsContent>
            ))}
          </Tabs> */}
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
