import { NextResponse } from "next/server";
import { fetchUser } from "@/lib/actions/user.actions";

export const POST = async (request: Request) => {
  const body = await request.json();
  const userInfo = await fetchUser(body.user_id);
  return NextResponse.json(
    { message: "Success", result: userInfo },
    { status: 200 }
  );
};
