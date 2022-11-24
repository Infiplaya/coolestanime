import { inferRouterOutputs } from '@trpc/server';
import { router } from '../trpc';
import { charactersRouter, votesRouter } from './animeCharacter';

export const appRouter = router({
  getCharacter: charactersRouter,
  getVotes: votesRouter,
});

export type AppRouter = typeof appRouter;

export type RouterOutput = inferRouterOutputs<AppRouter>;