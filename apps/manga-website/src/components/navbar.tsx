import { Tv2 } from "lucide-react";

import { Button } from "@aniways/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@aniways/ui/dropdown-menu";
import { Skeleton } from "@aniways/ui/skeleton";

import { api } from "../trpc";

const UserDropdown = () => {
  const { data: session, isLoading } = api.auth.getSession.useQuery();

  if (isLoading || !session?.user) {
    return <Skeleton className="h-12 w-12 rounded-full" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          src={session.user.picture}
          width={48}
          height={48}
          className="size-12 rounded-full object-cover"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Navbar = () => {
  return (
    <nav className="border-b border-border bg-background">
      <div className="container mx-auto flex items-center justify-between gap-3 px-3 md:container">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              width={80}
              height={80}
              alt="AniWays Logo"
              className="-ml-3 h-20 w-20"
            />
            <h1 className="text-2xl font-bold">Aniways</h1>
          </a>
          <Button asChild variant={"ghost"}>
            <a
              href={
                // eslint-disable-next-line turbo/no-undeclared-env-vars
                import.meta.env.DEV ?
                  "http://localhost:3000"
                : "https://aniways.xyz"
              }
            >
              <Tv2 className="mr-2 size-4" />
              Watch Anime
            </a>
          </Button>
        </div>

        <UserDropdown />
      </div>
    </nav>
  );
};
