import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { getOptionsForVote } from "../../../utils/getRandom";
import { TRPCError } from "@trpc/server";

export const charactersRouter = router({
  getPair: publicProcedure.query(async ({ ctx }) => {
    const [first, second] = getOptionsForVote();
    if (!first || !second) {
      throw new TRPCError({
        message: "Missing options for vote",
        code: "BAD_REQUEST",
      });
    }
    try {
      const bothCharacters = await ctx.prisma.character.findMany({
        where: { id: { in: [first, second] } },
      });
      return {
        firstCharacter: bothCharacters[0],
        secondCharacter: bothCharacters[1],
      };
    } catch (error) {
      console.log("error", error);
    }
  }),
});

export const characterVotesRouter = router({
  castVote: publicProcedure
    .input(
      z.object({
        votedFor: z.number(),
        votedAgainst: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.voteCharacter.create({
          data: {
            votedAgainstId: input.votedAgainst,
            votedForId: input.votedFor,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
