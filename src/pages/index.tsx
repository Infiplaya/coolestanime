import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <main className="mx-auto flex h-screen max-w-7xl flex-col justify-center px-4 ">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Vote for coolest</span>{" "}
          <span className="block text-emerald-600 xl:inline">
            anime or character
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
          This web app is inspired by roundest by Theo, created with T3 stack.
          In this version you can vote for coolest anime character or anime.
          There are also results page where you can see the current ranking!
        </p>
        <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              href="/anime"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-8 py-3 text-base font-medium text-white hover:bg-emerald-700 md:py-4 md:px-10 md:text-lg"
            >
              Anime
            </Link>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <Link
              href="/character"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-emerald-600 hover:bg-gray-100 md:py-4 md:px-10 md:text-lg"
            >
              Character
            </Link>
          </div>
        </div>
        <footer className="absolute bottom-20 left-0 right-0 m-auto space-x-5">
          <Link
            href="/anime-results"
            className="text-base text-gray-100 hover:text-gray-300"
          >
            Anime Results
          </Link>
          <Link
            href="/character-results"
            className="text-base text-gray-100 hover:text-gray-300"
          >
            Character Results
          </Link>
        </footer>
      </div>
    </main>
  );
};

export default Home;
