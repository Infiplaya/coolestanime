// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { GetServerSideProps } from "next";
import Image from "next/image";
import Head from "next/head";
import { db } from "../server/db/db";

const { count } = db.fn;

interface AnimeResult {
  id: number;
  name: string;
  imageUrl: string;
  VoteFor: number;
  VoteAgainst: number;
}
[];

const getAnimeInOrder = async () => {
  const query1 = await db
    .selectFrom("Anime")
    .leftJoin("VoteAnime", "Anime.id", "votedForId")
    .select([
      "Anime.id",
      "Anime.name",
      "Anime.imageUrl",
      count("VoteAnime.votedForId").as("VoteFor"),
    ])
    .groupBy("Anime.id")
    .execute();

  const query2 = await db
    .selectFrom("Anime")
    .leftJoin("VoteAnime", "Anime.id", "votedAgainstId")
    .select(["Anime.id", count("VoteAnime.votedAgainstId").as("VoteAgainst")])
    .groupBy("Anime.id")
    .execute();

  const result: AnimeResult[] = [];

  for (let i = 0; i < 100; i++) {
    query1[i].VoteAgainst = query2[i].VoteAgainst;
    result.push(query1[i]);
  }

  return result;
};

type AnimeQueryResult = AnimeResult[];

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
            {anime.VoteFor}
          </span>
        </p>
        <p>
          Votes against:{" "}
          <span className="text-lg font-semibold text-emerald-300">
            {anime.VoteAgainst}
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
            return b.VoteFor - a.VoteFor;
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
