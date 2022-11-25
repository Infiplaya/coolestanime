import { router, publicProcedure} from "../trpc";
import { z } from 'zod';

const CharacterResult = z.object({
    data: z.object({
        name: z.string(),
    images: z.object({
        jpg: z.object({
            image_url: z.string()
        }),
    })
    })
})

export const charactersRouter = router({
    getCharacters: publicProcedure
    .input(z.object({id: z.number()}))
      .query(async ({input}) => {
        const character = await fetch(`https://api.jikan.moe/v4/characters/${String(input.id)}`).then(res =>
        res.json());
        return {name: character.data.name, images: character.data.images}
      }),
  });

  export const votesRouter = router({
    castVote: publicProcedure
      .input(
        z.object({
            votedFor: z.number(),
            votedAgainst: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        try {
          await ctx.prisma.vote.create({
            data: {
                ...input,
            },
          });
        } catch (error) {
          console.log(error);
          }
      })
    });