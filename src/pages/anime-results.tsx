import type { GetServerSideProps } from "next";
import { prisma } from "../server/db/client";
import Image from "next/image";
import Head from "next/head";
import type { AsyncReturnType } from "../utils/ts-bs";

const getAnimeInOrder = async () => {
  return await prisma.anime.findMany({
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

type AnimeQueryResult = AsyncReturnType<typeof getAnimeInOrder>;

const generateCountPercent = (anime: AnimeQueryResult[number]) => {
  const { VoteFor, VoteAgainst } = anime._count;
  if (VoteFor + VoteAgainst === 0) {
    return 0;
  }
  return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};

const AnimeListing: React.FC<{
  anime: AnimeQueryResult[number];
  rank: number;
}> = ({ anime, rank }) => {
  return (
    <div className="relative flex items-center justify-between p-2">
      <div className="flex items-center">
        <div className="flex items-center pl-4">
          <Image
            src={anime.imageUrl}
            width={100}
            height={100}
            alt="anime"
            className="w-24"
          />
          <div className="text-large pl-2 font-medium capitalize">
            {anime.name}
          </div>
        </div>
      </div>
      <div className="text-gray-300">
        <p>
          Votes for:{" "}
          <span className="text-lg font-semibold text-emerald-300">
            {anime._count.VoteFor}
          </span>
        </p>
        <p>
          Votes against:{" "}
          <span className="text-lg font-semibold text-emerald-300">
            {anime._count.VoteAgainst}
          </span>
        </p>
      </div>
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center rounded-br-md border border-emerald-500 bg-emerald-600 p-2 font-semibold text-white shadow-lg">
        {rank}
      </div>
    </div>
  );
};

const ResultsPage: React.FC<{
  anime: AnimeQueryResult;
}> = ({ anime }) => {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Coolest anime</title>
      </Head>
      <ul role="list" className="mt-5 divide-y divide-gray-700 md:w-1/3">
        {anime
          .sort((a, b) => {
            const difference =
              generateCountPercent(b) - generateCountPercent(a);

            if (difference === 0) {
              return b._count.VoteFor - a._count.VoteFor;
            }

            return difference;
          })
          .map((currentAnime, index) => {
            return (
              <AnimeListing anime={currentAnime} key={index} rank={index + 1} />
            );
          })}
      </ul>
    </div>
  );
};

export default ResultsPage;

export const getStaticProps: GetServerSideProps = async () => {
  const animeOrdered = await getAnimeInOrder();
  return { props: { anime: animeOrdered }, revalidate: 60 };
};
