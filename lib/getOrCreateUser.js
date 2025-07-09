import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";


export async function getOrCreateUser(){
    const clerkUser = await currentUser()
    if(!clerkUser) throw new Error("No user found");
    
    const user = await prisma.user.upsert({
        where:{id:clerkUser.id},
        update:{},
        create:{
            id:clerkUser.id,
            email:clerkUser.emailAddresses[0]?.emailAddress
        },
    });

    return user;
}