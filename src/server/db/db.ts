import type { Anime, Character, VoteCharacter } from "@prisma/client/edge";
import { Generated, Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

interface VoteAnime {
  id: Generated<string>;
  createdAt: Date;
  votedForId: number;
  votedAgainstId: number;
  animeId: number | null;
}

interface Database {
  Anime: Anime;
  VoteAnime: VoteAnime;
  Character: Character;
  VoteCharacter: VoteCharacter;
}

export const db = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    host: "aws.connect.psdb.cloud",
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  }),
});
