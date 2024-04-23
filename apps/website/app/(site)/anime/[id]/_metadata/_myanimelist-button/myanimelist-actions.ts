'use server';

import { auth } from '@aniways/auth';
import { createMyAnimeListService } from '@aniways/data';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const addToListAction = async (malId: number, pathname: string) => {
  try {
    const user = await auth(cookies());

    if (!user) {
      throw new Error('Must be logged in to add to list');
    }

    const { addAnimeToMyList } = createMyAnimeListService(user.accessToken);

    const details = await addAnimeToMyList(malId);

    revalidatePath(pathname, 'layout');

    return {
      details,
    };
  } catch (e) {
    console.error(e);

    const error = e instanceof Error ? e : new Error('Failed to add to list');

    return {
      error: error.message,
    };
  }
};

export const deleteAnimeInListAction = async (
  malId: number,
  pathname: string
) => {
  try {
    const user = await auth(cookies());

    if (!user) {
      throw new Error('Must be logged in to delete from list');
    }

    const { deleteAnimeFromMyList } = createMyAnimeListService(
      user.accessToken
    );

    const details = await deleteAnimeFromMyList(malId);

    revalidatePath(pathname, 'layout');

    return {
      details,
    };
  } catch (e) {
    console.error(e);

    const error =
      e instanceof Error ? e : new Error('Failed to delete from list');

    return {
      error: error.message,
    };
  }
};

export const updateAnimeInListAction = async (
  malId: number,
  status: 'watching' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_watch',
  episodesWatched: number,
  score: number,
  pathname: string
) => {
  try {
    const user = await auth(cookies());

    if (!user) {
      throw new Error('Must be logged in to update list');
    }

    const { updateAnimeInMyList } = createMyAnimeListService(user.accessToken);

    const details = await updateAnimeInMyList(
      malId,
      status,
      episodesWatched,
      score
    );

    revalidatePath(pathname, 'layout');

    return {
      details,
    };
  } catch (e) {
    console.error(e);

    const error = e instanceof Error ? e : new Error('Failed to update list');

    return {
      error: error.message,
    };
  }
};
