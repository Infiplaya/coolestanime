import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { getOptionsForVote } from "../../../utils/getRandom";

export const charactersRouter = router({
  getPair: publicProcedure.query(async ({ ctx }) => {
    const [first, second] = getOptionsForVote();
    try {
      const bothCharacters = await ctx.db
        .selectFrom("Character")
        .selectAll()
        .where("id", "in", [first as number, second as number])
        .execute();
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
        await ctx.prisma.voteCharacter.create({
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
