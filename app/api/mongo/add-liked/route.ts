import { NextResponse } from "next/server";
import { addLiked } from "@/lib/actions/thread.actions";

export const POST = async (request: Request) => {
  const body = await request.json();
  try {
    await addLiked(body.thread_id, body.user_id);
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ message: "Add success" }, { status: 200 });
};
