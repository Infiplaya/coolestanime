import type { Anime, Character } from "@prisma/client";
import Image from "next/image";

export default function VoteCard({
  voteItem,
  vote,
  disabled,
}: {
  voteItem: Character | Anime;
  vote: () => void;
  disabled: boolean;
}) {
  return (
    <div
      className="group relative cursor-pointer transition-all hover:scale-105"
      onClick={vote}
    >
      <div className="aspect-h-1 aspect-w-1 xl:aspect-h-8  xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={voteItem.imageUrl}
          alt={voteItem.name}
          className="h-52 w-full object-cover object-center md:h-full "
        />
      </div>
      <h3 className="mt-4 line-clamp-1 max-w-[150px] overflow-hidden text-lg text-gray-50">
        {voteItem.name}
      </h3>
      <button className="absolute bottom-10 mt-1 h-10 w-full rounded-md bg-emerald-500 px-3 py-1 text-sm font-medium text-gray-200 transition-all group-hover:bg-emerald-600 md:static md:h-auto md:w-auto">
        Vote
      </button>
    </div>
  );
}
