import { NextResponse } from "next/server";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

export const POST = async (request: Request) => {
  const body = await request.json();
  const resultData = await fetchCommunityPosts(body.account_id);
  return NextResponse.json(
    { message: "Success", result: resultData },
    { status: 200 }
  );
};
