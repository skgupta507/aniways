'use client';

import { signIn } from '@animelist/auth-next/client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@aniways/ui/components/ui/dialog';
import { Button } from '@ui/components/ui/button';

export const LoginModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login using your MyAnimeList account</DialogTitle>
          <DialogDescription>
            This will allow you to import your anime list from MyAnimeList as
            well as sync your progress.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'secondary'}>Cancel</Button>
          </DialogClose>
          <Button onClick={signIn}>Log in with MyAnimeList</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
