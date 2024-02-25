import { NextResponse } from "next/server";
import { fetchUserPosts } from "@/lib/actions/user.actions";

export const POST = async (request: Request) => {
  const body = await request.json();
  const resultData = await fetchUserPosts(body.account_id);
  return NextResponse.json(
    { message: "Success", result: resultData },
    { status: 200 }
  );
};
