import { NextResponse } from "next/server";
import { fetchPosts } from "@/lib/actions/thread.actions";

export const POST = async (request: Request) => {
  const body = await request.json();
  const resultData = await fetchPosts(body.page ? +body.page : 1, 30);
  return NextResponse.json(
    { message: "Success", result: resultData },
    { status: 200 }
  );
};
