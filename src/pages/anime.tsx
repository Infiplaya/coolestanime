import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { LoadingImages } from "../components/LoadingImages";
import { trpc } from "../utils/trpc";

const AnimeVotePage: NextPage = () => {
  const {
    data: animePair,
    refetch,
    isLoading,
  } = trpc.getAnime.getPair.useQuery();

  const voteMutation = trpc.getAnimeVotes.castVote.useMutation();

  const voteForRoundest = (selected: number) => {
    if (!animePair) return; // Early escape to make Typescript happy

    if (selected === animePair?.firstAnime?.id) {
      voteMutation.mutate({
        votedFor: animePair.firstAnime.id,
        votedAgainst: animePair.secondAnime!.id,
      });
    } else {
      // else fire voteFor with second ID
      voteMutation.mutate({
        votedFor: animePair.secondAnime!.id,
        votedAgainst: animePair.firstAnime!.id,
      });
    }
    refetch();
  };

  const fetchingNext = voteMutation.isLoading || isLoading;

  return (
    <>
      <Head>
        <title>Coolest Anime</title>
        <meta name="description" content="Coolest anime" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-gray-100">
        <Link
          href="/"
          className="absolute top-10 left-40 font-bold uppercase hover:text-gray-300"
        >
          Home
        </Link>
        <h1 className="text-center text-2xl md:text-3xl">
          What is the coolest anime?{" "}
        </h1>
        {animePair ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 md:mt-20 md:flex-row md:gap-5">
            <AnimeListing
              anime={animePair.firstAnime}
              vote={() => voteForRoundest(animePair.firstAnime!.id)}
              disabled={fetchingNext}
            />
            <div className="p-5 text-xl italic">{"or"}</div>
            <AnimeListing
              anime={animePair.secondAnime}
              vote={() => voteForRoundest(animePair.secondAnime!.id)}
              disabled={fetchingNext}
            />
          </div>
        ) : (
          <LoadingImages />
        )}
        <Link
          href={`/anime-results`}
          className="mt-10 text-base text-gray-100 hover:text-gray-300"
        >
          Anime results
        </Link>
      </main>
    </>
  );
};

const AnimeListing: React.FC<{
  anime: any;
  vote: () => void;
  disabled: boolean;
}> = ({ anime, vote, disabled }) => {
  return (
    <div
      className={`flex flex-col items-center transition-opacity ${
        disabled && "opacity-0"
      }`}
      key={anime.id}
    >
      <div className="text-center text-lg font-medium capitalize md:text-xl">
        {anime.name}
      </div>
      <Image
        src={anime.imageUrl}
        width={256}
        height={256}
        className="animate-fade-in mt-5 w-36 rounded-lg md:w-64"
        alt="anime"
      />
      <button
        className={`type="button"
        className="ml-3 focus:ring-offset-gray-800" mt-5 inline-flex items-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
        onClick={() => vote()}
        disabled={disabled}
      >
        Cooler
      </button>
    </div>
  );
};

export default AnimeVotePage;
