import { router, publicProcedure} from "../trpc";
import { z } from 'zod';


export const charactersRouter = router({
    getCharacters: publicProcedure
    .input(z.object({id: z.number().nullable()}))
      .query(async ({input}) => {
        const character = await fetch(`https://api.jikan.moe/v4/characters/${input.id}`).then(res =>
        res.json());
        console.log(character)
        return character;
      }),
  });