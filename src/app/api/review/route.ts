import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    // check if user is authenticated using getserverSession
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response(null, { status: 401 });
    }
    

    

}