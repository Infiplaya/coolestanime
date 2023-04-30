import type { Character } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Loader } from "../components/Loader";
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
        <title>Coolest Anime Character</title>
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
                <CharacterListing
                  character={characterPair.firstCharacter}
                  vote={() =>
                    voteForCharacter(characterPair.firstCharacter!.id)
                  }
                  disabled={isLoading}
                />
              )}
              <div className="my-5 lg:text-2xl">{"VS"}</div>
              {characterPair.secondCharacter && (
                <CharacterListing
                  character={characterPair.secondCharacter}
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

const CharacterListing: React.FC<{
  character: Character;
  vote: () => void;
  disabled: boolean;
}> = ({ character, vote, disabled }) => {
  return (
    <div
      key={character?.id}
      className="flex flex-col items-center gap-5 rounded-md border border-emerald-900"
    >
      <Image
        src={character.imageUrl}
        width={225}
        height={318}
        alt="character"
        className="h-[318px] w-[225px]"
      />
      <div className="flex flex-col items-center gap-2 px-3 py-2">
        <h3 className="line-clamp-1 max-w-[200px] px-3 text-lg">
          {character?.name}
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

export default CharacterVotePage;
