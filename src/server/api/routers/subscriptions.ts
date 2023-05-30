import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const subscriptionsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.subscription.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        content: z.string().email().min(1).max(320),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.subscription.create({
          data: {
            email: input.content,
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          // P2002: Unique constraint failed on the {constraint}
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Email already exists",
              cause: e,
            });
          }
        }
      }
    }),
});
