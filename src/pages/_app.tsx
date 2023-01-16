import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

import { Open_Sans } from "@next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={openSans.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default trpc.withTRPC(MyApp);
