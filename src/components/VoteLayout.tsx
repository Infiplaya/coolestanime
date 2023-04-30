import type { ReactNode } from "react";

export function VoteLayout({
  children,
  refetch,
}: {
  children: ReactNode;
  refetch: () => void;
}) {
  return (
    <main className="mx-auto flex max-w-3xl flex-col-reverse items-center py-10 md:flex-col md:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center md:flex-row md:gap-10">
        {children}
      </div>
      <button
        className="mb-5 rounded-md border border-emerald-500 px-4 py-2 md:mt-10"
        onClick={() => refetch()}
      >
        Skip this vote
      </button>
    </main>
  );
}
