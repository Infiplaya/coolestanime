import type { ReactNode } from "react";

export function VoteLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex max-w-3xl flex-col-reverse items-center py-10 md:flex-col md:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center md:flex-row md:gap-10">
        {children}
      </div>
    </main>
  );
}
