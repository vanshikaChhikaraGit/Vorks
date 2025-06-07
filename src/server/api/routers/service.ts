import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { cookies } from "next/headers";
import { TRPCError } from "@trpc/server";
import { db } from "@/server/db";

export const serviceRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        serviceLocation:z.string().min(1),
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
          location:input.serviceLocation
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
  }),
  getServiceByCategory: publicProcedure.input(
    z.object({
      category:z.string()
    })
  ).query(async({ctx,input})=>{
    return await ctx.db.service.findMany({
      where:{
        category:input.category
      }
    })
  }),
    getServiceById: publicProcedure
    .input(z.object({ serviceId: z.string() }))
    .query(async ({ ctx,input }) => {
      const { serviceId } = input;

      const serviceWithReviews = await ctx.db.service.findUnique({
        where: { id: serviceId },
        include: {
          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  // Add other user fields you want to display
                },
              },
            },
            orderBy: {
              createdAt: 'desc', // Newest first
            },
          },
        },
      });

      if (!serviceWithReviews) {
        throw new Error('Service not found');
      }

      return {
        service: {
          id:serviceWithReviews.id,
          name     :serviceWithReviews.name,
  description      :serviceWithReviews.description,
  price            :serviceWithReviews.price,
  category         :serviceWithReviews.category,
  location         :serviceWithReviews.location,
  image            :serviceWithReviews.image,
  reviewStarRating :serviceWithReviews.reviewStarRating,   
  reviewCount      :serviceWithReviews.reviewCount,  
  duration         :serviceWithReviews.duration,   
  providerId       :serviceWithReviews.providerId,
        },
        comments: serviceWithReviews.comments.map(comment => ({
          id: comment.id,
          content: comment.content,
          rating: comment.rating,
          createdAt: comment.createdAt,
          user: comment.user,
        })),
      };
    }),

  addReviewByUser: publicProcedure.input(z.object({
    serviceId:z.string(),
    rating:z.number(),
    comment:z.string()
  })).mutation(async({ctx,input})=>{
     const cookie = await cookies();
    const userId = cookie.get("userId")?.value;

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User ID not found in cookies",
      });
    }
    //create the comment model
    await ctx.db.comment.create({
      data:{
        content:input.comment,
        rating:input.rating.toString(),
        userId:userId,
        serviceId:input.serviceId
      }
    })

    const service = await ctx.db.service.findUnique({
      where:{
        id:input.serviceId
      }
    })

    if(!service){
      throw new Error('service not found')
    }

    const currentRating = parseFloat(service.reviewStarRating || '0');
        const currentCount = parseInt(service.reviewCount || '0');
        
        const newCount = currentCount + 1;
        const newRating = ((currentRating * currentCount) + input.rating) / newCount;

        const updatedService = await ctx.db.service.update({
          where: { id: input.serviceId as string },
          data: {
            reviewStarRating: newRating.toFixed(1),
            reviewCount: newCount.toString(),
          },
        });

         return ({
        service:updatedService,

      })
      })
});
