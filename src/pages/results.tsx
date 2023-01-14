import type { GetServerSideProps } from "next";
import { prisma } from "../server/db/client";

import Image from "next/image";
import Head from "next/head";
import { AsyncReturnType } from "../utils/ts-bs";

const getCharacterInOrder = async () => {
  return await prisma.character.findMany({
    orderBy: {
      VoteFor: { _count: "desc" },
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      _count: {
        select: {
          VoteFor: true,
          VoteAgainst: true,
        },
      },
    },
  });
};

type CharacterQueryResult = AsyncReturnType<typeof getCharacterInOrder>;

const generateCountPercent = (character: CharacterQueryResult[number]) => {
  const { VoteFor, VoteAgainst } = character._count;
  console.log(character._count);
  if (VoteFor + VoteAgainst === 0) {
    return 0;
  }
  return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};

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
          />
          <div className="text-large pl-2 font-medium capitalize">
            {character.name}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 pr-4 text-gray-300">
        <p>
          <b>Votes for:</b> {character._count.VoteFor}
        </p>
        <p>
          <b>Votes against:</b> {character._count.VoteAgainst}
        </p>
        <p>{generateCountPercent(character).toFixed(2) + "%"}</p>
      </div>
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center rounded-br-md border border-emerald-500 bg-emerald-600 p-2 font-semibold text-white shadow-lg">
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
      <h2 className="p-4 text-2xl">Results</h2>
      <ul role="list" className="divide-y divide-gray-700 md:w-1/3">
        {character
          .sort((a, b) => {
            const difference =
              generateCountPercent(b) - generateCountPercent(a);

            if (difference === 0) {
              return b._count.VoteFor - a._count.VoteFor;
            }

            return difference;
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
