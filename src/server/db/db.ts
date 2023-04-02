import type {
  Anime,
  Character,
  VoteAnime,
  VoteCharacter,
} from "@prisma/client/edge";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

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
