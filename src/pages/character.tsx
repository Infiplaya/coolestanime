import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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
    if (!characterPair) return; // Early escape to make Typescript happy

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
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-gray-100">
        <Link
          href="/"
          className="absolute top-10 left-40 font-bold uppercase hover:text-gray-300"
        >
          Home
        </Link>
        <h1 className="text-center text-3xl">
          Who is coolest anime character?{" "}
        </h1>
        {characterPair ? (
          <div className="flex flex-col items-center justify-center gap-3 md:mt-20 md:flex-row md:gap-5">
            <CharacterListing
              character={characterPair.firstCharacter}
              vote={() => voteForRoundest(characterPair.firstCharacter!.id)}
              disabled={fetchingNext}
            />
            <div className="p-5 text-xl italic">{"or"}</div>
            <CharacterListing
              character={characterPair.secondCharacter}
              vote={() => voteForRoundest(characterPair.secondCharacter!.id)}
              disabled={fetchingNext}
            />
          </div>
        ) : (
          <LoadingImages />
        )}

        <Link
          href={`/character-results`}
          className="mt-10 text-base text-gray-100 hover:text-gray-300"
        >
          Character results
        </Link>
      </main>
    </>
  );
};

const CharacterListing: React.FC<{
  character: any;
  vote: () => void;
  disabled: boolean;
}> = (props) => {
  return (
    <div
      className={`flex flex-col items-center transition-opacity ${
        props.disabled && "opacity-0"
      }`}
      key={props.character.id}
    >
      <div className="text-center text-lg font-medium capitalize md:text-3xl">
        {props.character.name}
      </div>
      <Image
        src={props.character.imageUrl}
        width={256}
        height={256}
        className="animate-fade-in mt-5 w-36 rounded-lg md:w-64"
        alt="character"
      />
      <button
        className={`type="button"
        className="ml-3 focus:ring-offset-gray-800" mt-5 inline-flex items-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
        onClick={() => props.vote()}
        disabled={props.disabled}
      >
        Cooler
      </button>
    </div>
  );
};

export default CharacterVotePage;
