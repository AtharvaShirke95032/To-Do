import { getOrCreateUser } from "@/lib/getOrCreateUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getOrCreateUser(); // ✅ await here
    const todos = await prisma.todo.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },

    });

    return NextResponse.json(todos); // ✅ must always return valid JSON
  } catch (error) {
    console.error("GET /api/todos error:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos", details: error.message },
      { status: 500 }
    );
  }
}
export async function POST(req){
   try {
     const user = await getOrCreateUser();
    const body = await req.json()

    if(!body.title || body.title.trim() === ""){
        return NextResponse.json({error:"Title is required"}, {status:400})
    }

    const todo =await prisma.todo.create({
        data:{
            title:body.title,
            description:body.description || "",
            status:"pending",
            userId:user.id
        },
    
    })
    return NextResponse.json(todo)
   } catch (error) {
     console.error("POST /api/todos error:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
   }
}