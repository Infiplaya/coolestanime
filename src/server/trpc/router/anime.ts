import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { getOptionsForVote } from "../../../utils/getRandom";
import { v4 as uuidv4 } from "uuid";

export const animeRouter = router({
  getPair: publicProcedure.query(async ({ ctx }) => {
    const [first, second] = getOptionsForVote();
    try {
      const bothAnimes = await ctx.db
        .selectFrom("Anime")
        .selectAll()
        .where("id", "in", [first as number, second as number])
        .execute();
      return { firstAnime: bothAnimes[0], secondAnime: bothAnimes[1] };
    } catch (error) {
      console.log("error", error);
    }
  }),
});

export const animeVotesRouter = router({
  castVote: publicProcedure
    .input(
      z.object({
        votedFor: z.number(),
        votedAgainst: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await ctx.db
          .insertInto("VoteAnime")
          .values({
            id: uuidv4(),
            votedAgainstId: input.votedAgainst,
            votedForId: input.votedFor,
          })
          .execute();
        return result;
      } catch (error) {
        console.log(error);
      }
    }),
});
