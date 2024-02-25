import { NextResponse } from "next/server";
import { fetchThreadById } from "@/lib/actions/thread.actions";

export const POST = async (request: Request) => {
  const body = await request.json();
  const resultData = await fetchThreadById(body.thread_id);
  return NextResponse.json(
    { message: "Success", result: resultData },
    { status: 200 }
  );
};
