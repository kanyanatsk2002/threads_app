import { NextResponse } from "next/server";
import { countLiked } from "@/lib/actions/thread.actions";

export const POST = async (request: Request) => {
  const body = await request.json();
  const count = await countLiked(body.thread_id);
  return NextResponse.json(
    { message: "Success", result: count },
    { status: 200 }
  );
};
