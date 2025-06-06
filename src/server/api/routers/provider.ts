import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { cookies } from "next/headers";
import { TRPCError } from "@trpc/server";

export const providerRouter = createTRPCRouter({
    getProviderById : publicProcedure.input(
        z.object({
            providerId:z.string()
        })
    ).query(({ctx,input})=>{
        return ctx.db.provider.findUnique({
            where:{
                id:input.providerId
            }
        })
    })
})