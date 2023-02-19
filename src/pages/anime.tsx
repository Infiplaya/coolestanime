import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { LoadingImages } from "../components/LoadingImages";
import { trpc } from "../utils/trpc";

function truncateName(name: string, n: number) {
  const splitName = name.split(" ");
  const truncated = splitName.slice(0, n).join(" ");

  return truncated;
}

const AnimeVotePage: NextPage = () => {
  const {
    data: animePair,
    refetch,
    isLoading,
  } = trpc.getAnime.getPair.useQuery();

  const voteMutation = trpc.getAnimeVotes.castVote.useMutation();

  const voteForRoundest = (selected: number) => {
    if (!animePair) return;

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
      <main className="flex flex-col items-center justify-center bg-gray-900 text-gray-100">
        {animePair ? (
          <div className="mt-10 lg:mt-28 flex flex-col items-center justify-center gap-3 md:gap-5">
            <AnimeListing
              anime={animePair.firstAnime}
              vote={() => voteForRoundest(animePair.firstAnime!.id)}
              disabled={fetchingNext}
            />
            <div className="p-5 my-10 text-xl italic">{"or"}</div>
            <AnimeListing
              anime={animePair.secondAnime}
              vote={() => voteForRoundest(animePair.secondAnime!.id)}
              disabled={fetchingNext}
            />
          </div>
        ) : (
          <LoadingImages />
        )}
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
      className={`relative flex h-64  w-48 flex-col items-center transition-opacity ${
        disabled && "opacity-0"
      }`}
      key={anime.id}
    >
      <div className="text-center p-3 bg-slate-900 border border-emerald-500 rounded-lg z-10 absolute -top-6 w-full text-lg font-medium capitalize md:text-xl">
        {truncateName(anime.name, 2)}
      </div>
      <Image
        src={anime.imageUrl}
        width={256}
        height={256}
        className="animate-fade-in absolute inset-0 mt-5 h-full w-full rounded-lg object-cover"
        alt="anime"
      />
      <button
        className={`type="button"
        className="ml-3 focus:ring-offset-gray-800" absolute -bottom-12 mt-5 inline-flex items-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
        onClick={() => vote()}
        disabled={disabled}
      >
        Cooler
      </button>
    </div>
  );
};

export default AnimeVotePage;
