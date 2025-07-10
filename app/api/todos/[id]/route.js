import { getOrCreateUser } from "@/lib/getOrCreateUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const user = await getOrCreateUser();
    const body = await req.json();
    const id = params.id;

    const todo = await prisma.todo.update({
      where: {
        id,
        userId: user.id,
      },
      data: {
        ...(body.status && { status: body.status }),
        ...(body.completed !== undefined && { completed: body.completed }),
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error("PUT /api/todos/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update todo", details: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(req,{params}){
   try {
    
     const {id} = params;
      const user = await getOrCreateUser();
        console.log("idd",id)
    const todo = await prisma.todo.deleteMany({
        where:{
           id: id,
            userId:user.id
        }
    })
  return NextResponse.json(todo);
   } catch (error) {
    console.error("DELETE /api/todos/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete todo", details: error.message },
      { status: 500 }
    );
   }
}