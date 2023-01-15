import { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-gray-100">
      <h1 className="text-center text-2xl">
        Hello! This app is about voting for animes or anime characters
      </h1>
      <h2 className="mt-10 text-center text-xl">Choose mode:</h2>
      <Link href="/anime">
        <button className="ml-3 mt-5 inline-flex w-36 items-center justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-lg font-semibold text-black shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800">
          Anime
        </button>
      </Link>
      <Link href="/character">
        <button className="ml-3 mt-5 inline-flex w-36 items-center justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-lg font-semibold text-black shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800">
          Character
        </button>
      </Link>

      <Link
        href={`/character-results`}
        className="mt-10 text-lg hover:underline"
      >
        Character Results
      </Link>
      <Link
        href={`/character-results`}
        className="mt-10 text-lg hover:underline"
      >
        Anime Results
      </Link>
    </main>
  );
};

export default Home;
