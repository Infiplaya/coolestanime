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
      key={voteItem?.id}
      className="flex flex-col items-center gap-5 rounded-md border border-emerald-900"
    >
      <Image
        src={voteItem?.imageUrl}
        width={225}
        height={318}
        alt={voteItem?.name}
        loading="lazy"
        className="h-[318px] w-[225px]"
      />
      <div className="flex flex-col items-center gap-2 px-3 py-2">
        <h3 className="line-clamp-1 max-w-[200px] px-3 text-lg">
          {voteItem?.name}
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
}
