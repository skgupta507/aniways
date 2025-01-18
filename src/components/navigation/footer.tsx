import Link from "next/link";
import { Image } from "@/components/ui/image";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-border bg-background">
      <div className="mx-auto w-full max-w-screen-xl p-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="mb-4 flex items-center sm:mb-0 rtl:space-x-reverse"
          >
            <Image src="/logo.png" alt="Aniways Logo" width={64} height={64} />
            <span className="self-center whitespace-nowrap text-2xl font-semibold text-foreground">
              Aniways
            </span>
          </Link>
          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-muted-foreground sm:mb-0">
            <li>
              <Link
                href="https://github.com/Coeeter/aniways"
                className="me-4 hover:underline md:me-6"
              >
                Github
              </Link>
            </li>
          </ul>
        </div>
        <hr className="mb-6 mt-4 border-border sm:mx-auto" />
        <span className="block text-sm text-muted-foreground sm:text-center">
          © {currentYear}{" "}
          <Link href="/" className="hover:underline">
            Aniways
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
