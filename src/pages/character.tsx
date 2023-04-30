import { type NextPage } from "next";
import Head from "next/head";
import { Loader } from "../components/Loader";
import VoteCard from "../components/VoteCard";
import { trpc } from "../utils/trpc";

const CharacterVotePage: NextPage = () => {
  const {
    data: characterPair,
    refetch,
    isLoading,
  } = trpc.getCharacter.getPair.useQuery(undefined, {
    keepPreviousData: true,
  });

  const voteMutation = trpc.getCharacterVotes.castVote.useMutation();

  const voteForCharacter = (selected: number) => {
    if (!characterPair?.firstCharacter || !characterPair.secondCharacter)
      return null;

    if (selected === characterPair.firstCharacter.id) {
      voteMutation.mutate({
        votedFor: characterPair.firstCharacter.id,
        votedAgainst: characterPair.secondCharacter.id,
      });
    } else {
      voteMutation.mutate({
        votedFor: characterPair.secondCharacter.id,
        votedAgainst: characterPair.firstCharacter.id,
      });
    }
    refetch();
  };

  return (
    <>
      <Head>
        <title>Coolest Anime</title>
        <meta name="description" content="Coolest anime character" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex max-w-3xl flex-col-reverse items-center py-10 md:flex-col md:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center md:flex-row md:gap-10">
          {characterPair ? (
            <>
              {characterPair.firstCharacter && (
                <VoteCard
                  voteItem={characterPair.firstCharacter}
                  vote={() =>
                    voteForCharacter(characterPair.firstCharacter!.id)
                  }
                  disabled={isLoading}
                />
              )}
              <div className="my-5 lg:text-2xl">{"VS"}</div>
              {characterPair.secondCharacter && (
                <VoteCard
                  voteItem={characterPair.secondCharacter}
                  vote={() =>
                    voteForCharacter(characterPair.secondCharacter!.id)
                  }
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
  );
};

export default CharacterVotePage;
