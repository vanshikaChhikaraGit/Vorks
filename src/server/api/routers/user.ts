import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { cookies } from "next/headers";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
    getUser : publicProcedure.query(async({ctx})=>{
        const cookie = await cookies();
    const userId = cookie.get("userId")?.value;

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User ID not found in cookies",
      });
    }
        return ctx.db.user.findUnique({
            where:{
                id:userId
            }
        })
    })
})