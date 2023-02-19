import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Loader } from "../components/Loader";
import { LoadingImages } from "../components/LoadingImages";
import { trpc } from "../utils/trpc";

const CharacterVotePage: NextPage = () => {
  const {
    data: characterPair,
    refetch,
    isLoading,
  } = trpc.getCharacter.getPair.useQuery();

  const voteMutation = trpc.getCharacterVotes.castVote.useMutation();

  const voteForRoundest = (selected: number) => {
    if (!characterPair) return;

    if (selected === characterPair?.firstCharacter?.id) {
      voteMutation.mutate({
        votedFor: characterPair.firstCharacter.id,
        votedAgainst: characterPair.secondCharacter!.id,
      });
    } else {
      // else fire voteFor with second ID
      voteMutation.mutate({
        votedFor: characterPair.secondCharacter!.id,
        votedAgainst: characterPair.firstCharacter!.id,
      });
    }
    refetch();
  };

  const fetchingNext = voteMutation.isLoading || isLoading;

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
      <main className="flex flex-col items-center justify-center bg-gray-900 text-gray-100">
        {characterPair ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 md:gap-5 lg:mt-28">
            <CharacterListing
              character={characterPair.firstCharacter}
              vote={() => voteForRoundest(characterPair.firstCharacter!.id)}
              disabled={fetchingNext}
            />
            <div className="my-10 p-5 text-xl italic">{"or"}</div>
            <CharacterListing
              character={characterPair.secondCharacter}
              vote={() => voteForRoundest(characterPair.secondCharacter!.id)}
              disabled={fetchingNext}
            />
          </div>
        ) : (
          <div className="container mx-auto flex justify-center py-64 lg:py-96">
            <Loader />
          </div>
        )}
      </main>
    </>
  );
};

const CharacterListing: React.FC<{
  character: any;
  vote: () => void;
  disabled: boolean;
}> = ({ character, vote, disabled }) => {
  return (
    <div
      className={`relative flex h-64  w-48 flex-col items-center transition-opacity ${
        disabled && "opacity-0"
      }`}
      key={character.id}
    >
      <div className="absolute -top-6 z-10 w-full rounded-lg border border-emerald-500 bg-slate-900 p-3 text-center text-lg font-medium capitalize md:text-xl">
        {character.name}
      </div>
      <Image
        src={character.imageUrl}
        width={256}
        height={256}
        className="animate-fade-in absolute inset-0 mt-5 h-full w-full rounded-lg object-cover"
        alt="character"
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

export default CharacterVotePage;
