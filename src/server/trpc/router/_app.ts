import { inferRouterOutputs } from '@trpc/server';
import { router } from '../trpc';
import { charactersRouter } from './animeCharacter';

export const appRouter = router({
  getCharacter: charactersRouter
});

export type AppRouter = typeof appRouter;

export type RouterOutput = inferRouterOutputs<AppRouter>;