import type { Anime } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Loader } from "../components/Loader";
import { trpc } from "../utils/trpc";

const AnimeVotePage: NextPage = () => {
  const {
    data: animePair,
    refetch,
    isLoading,
  } = trpc.getAnime.getPair.useQuery(undefined, {
    keepPreviousData: true,
  });

  const voteMutation = trpc.getAnimeVotes.castVote.useMutation();

  const voteForAnime = (selected: number) => {
    if (!animePair?.firstAnime || !animePair.secondAnime) return null;

    if (selected === animePair?.firstAnime?.id) {
      voteMutation.mutate({
        votedFor: animePair.firstAnime.id,
        votedAgainst: animePair.secondAnime.id,
      });
    } else {
      // else fire voteFor with second ID
      voteMutation.mutate({
        votedFor: animePair.secondAnime.id,
        votedAgainst: animePair.firstAnime.id,
      });
    }
    refetch();
  };

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
      <>
        <main className="mx-auto flex max-w-3xl flex-col-reverse items-center py-10 md:flex-col md:py-32">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center md:flex-row md:gap-10">
            {animePair ? (
              <>
                {animePair.firstAnime && (
                  <AnimeListing
                    anime={animePair.firstAnime}
                    vote={() => voteForAnime(animePair.firstAnime!.id)}
                    disabled={isLoading}
                  />
                )}
                <div className="my-5 lg:text-2xl">{"VS"}</div>
                {animePair.secondAnime && (
                  <AnimeListing
                    anime={animePair.secondAnime}
                    vote={() => voteForAnime(animePair.secondAnime!.id)}
                    disabled={isLoading}
                  />
                )}
              </>
            ) : (
              <div className="container mx-auto flex justify-center py-64 lg:py-96">
                <Loader />
              </div>
            )}
          </div>

          <button
            className="mb-5 rounded-md border border-emerald-500 px-4 py-2 md:mt-10"
            onClick={() => refetch()}
          >
            Skip this vote
          </button>
        </main>
      </>
    </>
  );
};

const AnimeListing: React.FC<{
  anime: Anime;
  vote: () => void;
  disabled: boolean;
}> = ({ anime, vote, disabled }) => {
  console.log(vote);
  return (
    <div
      key={anime?.id}
      className="flex flex-col items-center gap-5 rounded-md border border-emerald-900"
    >
      <Image
        src={anime.imageUrl}
        width={225}
        height={318}
        alt="anime"
        loading="lazy"
        priority={true}
        className="h-[318px] w-[225px]"
      />
      <div className="flex flex-col items-center gap-2 px-3 py-2">
        <h3 className="line-clamp-1 max-w-[200px] px-3 text-lg">
          {anime?.name}
        </h3>
        <button
          onClick={vote}
          disabled={disabled}
          className="rounded-md bg-emerald-600 px-4 py-1 transition-colors hover:bg-emerald-500"
        >
          Cooler
        </button>
      </div>
    </div>
  );
};

export default AnimeVotePage;
