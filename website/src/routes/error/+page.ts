import { error } from '@sveltejs/kit';

export const load = async () => {
  error(500, 'Failed to load anime');
};
