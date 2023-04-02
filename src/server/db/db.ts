import { Kysely, type Generated } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

interface VoteAnime {
  id: Generated<string>;
  votedForId: number;
  votedAgainstId: number;
  createdAt: Generated<Date>;
}

interface Anime {
  id: Generated<number>;
  name: string;
  imageUrl: string;
}

interface VoteCharacter {
  id: Generated<string>;
  votedForId: number;
  votedAgainstId: number;
  createdAt: Generated<Date>;
}

interface Character {
  id: Generated<number>;
  name: string;
  imageUrl: string;
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
