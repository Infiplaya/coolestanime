import { type NextPage } from "next";
import Head from "next/head";
import { Loader } from "../components/Loader";
import VoteCard from "../components/VoteCard";
import { VoteLayout } from "../components/VoteLayout";
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
      <VoteLayout>
        {animePair ? (
          <>
            {animePair.firstAnime && (
              <VoteCard
                voteItem={animePair.firstAnime}
                vote={() => voteForAnime(animePair.firstAnime!.id)}
                disabled={isLoading}
              />
            )}
            <div className="my-5 lg:text-2xl">{"VS"}</div>
            {animePair.secondAnime && (
              <VoteCard
                voteItem={animePair.secondAnime}
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

        <button
          className="mb-5 rounded-md border border-emerald-500 px-4 py-2 md:mt-10"
          onClick={() => refetch()}
        >
          Skip this vote
        </button>
      </VoteLayout>
    </>
  );
};

export default AnimeVotePage;
