import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  href: string;
}

export const NavLink = ({ children, href }: Props) => {
  const router = useRouter();
  const active = router.pathname === href;
  return (
    <Link
      href={href}
      className={clsx(
        "rounded-md px-3 py-2 text-sm font-medium text-gray-100 hover:bg-emerald-500/10 hover:text-white",
        active && "bg-emerald-500/50 text-white"
      )}
    >
      {children}
    </Link>
  );
};
