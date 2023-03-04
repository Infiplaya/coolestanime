import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center p-5">
      <div className="flex flex-col gap-10 md:mt-20 md:flex-row">
        <div className="w-full self-center text-center md:w-1/2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Vote for coolest</span>{" "}
            <span className="block text-emerald-600 xl:inline">Anime</span>{" "}
            <span>or</span>{" "}
            <span className="block text-orange-600 xl:inline">Character</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            This web app allows you to vote for coolest anime character or anime
            itself. There are also results page where you can see the current
            ranking!
          </p>
          <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/anime"
                className="flex w-full items-center justify-center rounded-full border border-transparent bg-emerald-600 px-8 py-3 text-base font-medium text-white hover:bg-emerald-700 md:py-3 md:px-10 md:text-lg"
              >
                Anime
              </Link>
            </div>
            <div className="mt-3 shadow sm:mt-0 sm:ml-3">
              <Link
                href="/character"
                className="flex w-full items-center justify-center rounded-full border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-orange-700 md:py-3 md:px-10 md:text-lg"
              >
                Character
              </Link>
            </div>
          </div>
        </div>
        <img
          src="https://cdn.midjourney.com/b1e25ed0-23ff-42c5-b7dc-a123bc972972/grid_0.png"
          className="w-full rounded-lg shadow-lg shadow-orange-600/50 md:w-1/2"
        ></img>
      </div>
    </main>
  );
};

export default Home;
