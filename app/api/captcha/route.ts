import { NextResponse } from "next/server";
import { makeCaptcha } from "@/lib/captcha";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(makeCaptcha());
}
