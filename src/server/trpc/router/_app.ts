import { inferRouterOutputs } from '@trpc/server';
import { router } from '../trpc';
import { animeRouter } from './anime';
import { charactersRouter, characterVotesRouter } from './animeCharacter';
import {animeVotesRouter} from "./anime"

export const appRouter = router({
  getCharacter: charactersRouter,
  getAnime: animeRouter,
  getCharacterVotes: characterVotesRouter,
  getAnimeVotes: animeVotesRouter,
});

export type AppRouter = typeof appRouter;

export type RouterOutput = inferRouterOutputs<AppRouter>;