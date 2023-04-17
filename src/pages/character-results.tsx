// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { GetServerSideProps } from "next";
import Image from "next/image";
import Head from "next/head";
import type { AsyncReturnType } from "../utils/ts-bs";
import { db } from "../server/db/db";

const { count } = db.fn;

interface CharacterResult {
  id: number;
  name: string;
  imageUrl: string;
  VoteFor: number;
  VoteAgainst: number;
}
[];

const getCharacterInOrder = async () => {
  const query1 = await db
    .selectFrom("Character")
    .leftJoin("VoteCharacter", "Character.id", "votedForId")
    .select([
      "Character.id",
      "Character.name",
      "Character.imageUrl",
      count("VoteCharacter.votedForId").as("VoteFor"),
    ])
    .groupBy("Character.id")
    .execute();

  const query2 = await db
    .selectFrom("Character")
    .leftJoin("VoteCharacter", "Character.id", "votedAgainstId")
    .select([
      "Character.id",
      count("VoteCharacter.votedAgainstId").as("VoteAgainst"),
    ])
    .groupBy("Character.id")
    .execute();

  const result: CharacterResult[] = [];

  for (let i = 0; i < 100; i++) {
    query1[i].VoteAgainst = query2[i].VoteAgainst;
    result.push(query1[i]);
  }

  return result;
};

type CharacterQueryResult = AsyncReturnType<typeof getCharacterInOrder>;

const CharacterListing: React.FC<{
  character: CharacterQueryResult[number];
  rank: number;
}> = ({ character, rank }) => {
  return (
    <div className="relative flex items-center justify-between p-2">
      <div className="flex items-center">
        <div className="flex items-center pl-4">
          <Image
            src={character.imageUrl}
            width={100}
            height={100}
            alt="character"
            className="w-24"
          />
          <div className="text-large w-1/2 pl-2 font-medium capitalize">
            {character.name}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 pr-4 text-gray-300">
        <p>
          Votes for:{" "}
          <span className="text-lg font-semibold text-orange-300">
            {character.VoteFor}
          </span>
        </p>
        <p>
          Votes against:{" "}
          <span className="text-lg font-semibold text-orange-300">
            {character.VoteAgainst}
          </span>
        </p>
      </div>
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center rounded-br-md border border-orange-500 bg-orange-600 p-2 font-semibold text-white shadow-lg">
        {rank}
      </div>
    </div>
  );
};

const ResultsPage: React.FC<{
  character: CharacterQueryResult;
}> = ({ character }) => {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Coolest anime character</title>
      </Head>
      <ul role="list" className="mt-5 divide-y divide-gray-700 md:w-1/3">
        {character
          .sort((a, b) => {
            return b.VoteFor - a.VoteFor;
          })
          .map((currentCharacter, index) => {
            return (
              <CharacterListing
                character={currentCharacter}
                key={index}
                rank={index + 1}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default ResultsPage;

export const getStaticProps: GetServerSideProps = async () => {
  const characterOrdered = await getCharacterInOrder();
  return { props: { character: characterOrdered }, revalidate: 60 };
};
