import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { cookies } from "next/headers";
import { TRPCError } from "@trpc/server";

export const serviceRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        serviceName: z.string().min(1),
        description: z.string().min(1),
        price: z.string().min(0),
        category: z.string().min(1),
        duration: z.string().min(1),
        image: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
       const cookie = await cookies();
    const userId = cookie.get("userId")?.value;

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User ID not found in cookies",
      });
    }
      const provider = await ctx.db.provider.findUnique({
        where: {
          userId: userId,
        },
      });
      if (!provider) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Provider not found in database",
        });
      }
      return ctx.db.service.create({
        data: {
          providerId: provider.id,
          name: input.serviceName,
          description: input.description,
          price: input.price,
          category: input.category,
          duration: input.duration,
          image: input.image,
        },
      });
    }),
  view: publicProcedure.query(async ({ ctx }) => {
    const cookie = await cookies();
    const userId = cookie.get("userId")?.value;

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User ID not found in cookies",
      });
    }
    const provider = await ctx.db.provider.findUnique({
      where: {
        userId,
      },
    });
    if (!provider) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Provider not found in database",
      });
    }

    return await ctx.db.service.findMany({
      where: {
        providerId: provider.id,
      },
    });
  }),
  delete: publicProcedure.input(
    z.object({
      serviceId:z.string()
    })
  ).mutation(async({ctx,input})=>{
    const cookie = await cookies();
    const userId = cookie.get("userId")?.value;

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User ID not found in cookies",
      });
    }
    const provider = await ctx.db.provider.findUnique({
      where: {
        userId,
      },
    });
    if (!provider) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Provider not found in database",
      });
    }

    return await ctx.db.service.delete({
      where: {
        id:input.serviceId,
        providerId: provider.id,
      },
    });
  })
});
