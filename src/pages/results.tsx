import type { GetServerSideProps } from "next";
import { prisma } from "../server/db/client";

import Image from "next/image";
import Head from "next/head";

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

const generateCountPercent = (character: any) => {
  const { VoteFor, VoteAgainst } = character._count;
  if (VoteFor + VoteAgainst === 0) {
    return 0;
  }
  return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};

const CharacterListing: React.FC<{ character: any; rank: number }> = ({
  character,
  rank,
}) => {
  return (
    <div className="relative flex items-center justify-between border-b p-2">
      <div className="flex items-center">
        <div className="flex items-center pl-4">
          <Image
            src={character.imageUrl}
            width={64}
            height={64}
            layout="fixed"
            alt="character"
          />
          <div className="pl-2 capitalize">{character.name}</div>
        </div>
      </div>
      <div className="pr-4">
        {generateCountPercent(character).toFixed(2) + "%"}
      </div>
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center rounded-br-md border border-gray-500 bg-gray-600 px-2 font-semibold text-white shadow-lg">
        {rank}
      </div>
    </div>
  );
};

const ResultsPage: React.FC<{
  character: any;
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Roundest Pokemon Results</title>
      </Head>
      <h2 className="p-4 text-2xl">Results</h2>
      <div className="flex w-full max-w-2xl flex-col border">
        {props.character
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
      </div>
    </div>
  );
};

export default ResultsPage;

export const getStaticProps: GetServerSideProps = async () => {
  const characterOrdered = await getCharacterInOrder();
  const DAY_IN_SECONDS = 60 * 60 * 24;
  return { props: { character: characterOrdered }, revalidate: DAY_IN_SECONDS };
};
