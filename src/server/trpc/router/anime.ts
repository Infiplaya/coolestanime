import { router, publicProcedure} from "../trpc";
import { z } from 'zod';
import { getOptionsForVote } from "../../../utils/getRandom";



export const animeRouter = router({
  getPair: publicProcedure
  .query(async ({ ctx }) => {
    const [first, second] = getOptionsForVote();
    try {
        const bothAnimes = await ctx.prisma.anime.findMany({
        where: {id: {in: [first!, second!]}},
      });
      return {firstAnime: bothAnimes[0], secondAnime: bothAnimes[1]}
    } catch (error) {
      console.log("error", error);
    } }),
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
          await ctx.prisma.voteAnime.create({
            data: {
                votedAgainstId: input.votedAgainst,
                votedForId: input.votedFor,
            },
          });
        } catch (error) {
          console.log(error);
          }
      })
    });