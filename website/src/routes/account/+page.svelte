<script lang="ts">
  import { goto, invalidate, invalidateAll, replaceState } from '$app/navigation';
  import { page } from '$app/state';
  import {
    getMyAnimeListLogoutUrl,
    getMyanimeListUrl,
    updateUser,
    uploadImage
  } from '$lib/api/auth';
  import { updateUserFormSchema } from '$lib/api/auth/types';
  import Miku from '$lib/assets/miku.png';
  import ChangePassword from '$lib/components/auth/change-password.svelte';
  import { Button } from '$lib/components/ui/button';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Switch } from '$lib/components/ui/switch';
  import { appState } from '$lib/context/state.svelte';
  import { format } from 'date-fns';
  import { Loader2, RefreshCw } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import { superForm } from 'sveltekit-superforms';
  import { arktypeClient } from 'sveltekit-superforms/adapters';
  import type { PageProps } from './$types';
  import { onMount } from 'svelte';
  import LibrarySync from '$lib/components/anime/library-sync.svelte';

  let { data }: PageProps = $props();

  let createdAt = $derived.by(() => {
    const timeMillis = data.user?.createdAt;
    if (!timeMillis) return '';
    return format(new Date(timeMillis), 'do MMMM yyyy');
  });

  let updatedAt = $derived.by(() => {
    const timeMillis = data.user?.updatedAt;
    if (!timeMillis) return '';
    return format(new Date(timeMillis), 'do MMMM yyyy');
  });

  const onSettingChange = (key: keyof (typeof appState)['settings']) => {
    return (checked: boolean) => {
      if (!data.settings) return;
      appState.settings[key] = checked;
    };
  };

  const submit = async (
    data: typeof updateUserFormSchema.infer,
    messages: {
      success: string;
      error: string;
    },
    onError?: (err: unknown) => void
  ) => {
    try {
      await updateUser(fetch, data);
      await invalidate(({ pathname }) => pathname.startsWith('/users') || pathname === '/auth/me');
      toast.success(messages.success);
    } catch (err) {
      toast.error(messages.error);
      console.error(err);
    }
  };

  const form = superForm(
    {
      email: data.user?.email ?? '',
      username: data.user?.username ?? '',
      profilePicture: data.user?.profilePicture ?? null
    },
    {
      SPA: true,
      validators: arktypeClient(updateUserFormSchema),
      resetForm: false,
      onUpdate: async ({ form, cancel }) => {
        if (!form.valid) return;

        await submit(
          form.data,
          { success: 'Profile updated', error: 'Failed to update profile' },
          cancel
        );
      }
    }
  );

  const { form: formdata, enhance, submitting } = form;

  $effect(() => {
    formdata.set({
      email: data.user?.email ?? '',
      username: data.user?.username ?? '',
      profilePicture: data.user?.profilePicture ?? null
    });
  });
</script>

<div class="m-3 mt-20 flex flex-col-reverse gap-2 md:m-8 md:mt-20 md:flex-row">
  <div class="h-full md:sticky md:top-20">
    <form use:enhance class="bg-card max-w-md rounded-lg border p-4" enctype="multipart/form-data">
      <h1 class="font-sora mb-5 text-2xl font-bold">Profile</h1>
      <Form.Field {form} name="email">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Email</Form.Label>
            <Input {...props} bind:value={$formdata.email} placeholder="Enter your email" />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="username">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Username</Form.Label>
            <Input {...props} bind:value={$formdata.username} placeholder="Enter your username" />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <p class="text-muted-foreground text-sm">
        Member since {createdAt}
      </p>

      <p class="text-muted-foreground text-sm">
        Last updated on {updatedAt}
      </p>

      <Form.Button disabled={$submitting} class="mt-4 w-full">
        {#if $submitting}
          <Loader2 class="animate-spin" />
        {:else}
          Save
        {/if}
      </Form.Button>
    </form>

    <div class="bg-card mt-4 max-w-md rounded-lg p-4">
      <h2 class="font-sora text-xl font-bold">Profile Picture</h2>
      <p class="text-muted-foreground mb-8 text-sm">Click on the image to change it</p>
      <Form.Field {form} name="profilePicture">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>
              <div
                class="bg-background group relative mx-auto size-72 cursor-pointer overflow-hidden rounded-full border"
              >
                <img
                  src={$formdata.profilePicture ?? Miku}
                  class="z-0 h-full w-full object-cover object-center"
                  alt={`Profile picture of ${data.user?.username}`}
                />
                <div
                  class="bg-background/50 absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100"
                >
                  Change
                </div>
              </div>
            </Form.Label>
            <!-- The input which will store file url -->
            <Input bind:value={$formdata.profilePicture} class="hidden" />
            <!-- File input -->
            <Input
              {...props}
              type="file"
              class="hidden"
              accept="image/*"
              onchange={async (e) => {
                if (!data.user) return;
                let id = toast.loading('Uploading image');
                try {
                  const input = e.target as HTMLInputElement;
                  const formFile = input.files?.[0];
                  if (!formFile) return;
                  const result = await uploadImage(fetch, formFile);
                  if (!result || !result.url) {
                    toast.error('Failed to upload image');
                    return;
                  }
                  await submit(
                    { ...data.user, profilePicture: result.url },
                    { success: 'Image uploaded', error: 'Failed to upload image' }
                  );
                } finally {
                  toast.dismiss(id);
                }
              }}
            />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    </div>
  </div>
  <div class="mt-4 flex h-fit w-full flex-col gap-4 md:mt-0 md:px-4">
    <h2 class="font-sora text-2xl font-bold">Settings</h2>
    <div class="bg-card rounded-lg p-4">
      <h3 class="font-sora text-xl font-bold">General</h3>
      <p class="text-muted-foreground text-sm">Manage your account settings</p>

      <div class="mt-4 flex items-center gap-2">
        <Switch
          id="auto-resume"
          checked={data.settings?.autoResumeEpisode}
          onCheckedChange={onSettingChange('autoResumeEpisode')}
        />
        <Label for="auto-resume">Auto Resume</Label>
      </div>
      <p class="text-muted-foreground mb-1">
        Automatically resume from where you left off in the same device
      </p>

      <div class="mt-4 flex items-center gap-2">
        <Switch
          id="auto-play"
          checked={data.settings?.autoPlayEpisode}
          onCheckedChange={onSettingChange('autoPlayEpisode')}
        />
        <Label for="auto-play">Auto Play</Label>
      </div>
      <p class="text-muted-foreground my-1">Automatically play the next episode</p>

      <div class="mt-4 flex items-center gap-2">
        <Switch
          id="auto-next"
          checked={data.settings?.autoNextEpisode}
          onCheckedChange={onSettingChange('autoNextEpisode')}
        />
        <Label for="auto-next">Auto Next</Label>
      </div>
      <p class="text-muted-foreground my-1">Automatically play the next episode</p>
    </div>
    <div class="bg-card rounded-lg p-4">
      <h3 class="font-sora text-xl font-bold">Tracking</h3>
      <p class="text-muted-foreground text-sm">
        Add external tracking services to your account. If connected, will auto update tracker when
        library is updated. Update is push only and doesn't update when external service changes
        unless manually synced
      </p>
      <div class="mt-4 flex flex-col flex-wrap gap-2 md:flex-row">
        {#if !data.providers.includes('myanimelist')}
          <Button
            variant="outline"
            onclick={() => {
              window.location.href = getMyanimeListUrl(page.url.href);
            }}
          >
            <img src="/mal.svg" alt="MyAnimeList" class="size-6" />
            Connect MyAnimeList
          </Button>
        {:else}
          <Button
            variant="outline"
            onclick={async () => {
              await fetch(getMyAnimeListLogoutUrl(), { credentials: 'include' });
              await invalidateAll();
              toast.success('Disconnected from MyAnimeList');
            }}
          >
            <img src="/mal.svg" alt="MyAnimeList" class="size-6" />
            Disconnect from MyAnimeList
          </Button>
        {/if}
        {#if !data.providers.includes('anilist')}
          <Button variant="outline" onclick={() => toast.warning('Coming soon')}>
            <img src="/anilist.svg" alt="AniList" class="size-6" />
            Connect AniList
          </Button>
        {/if}
      </div>

      <LibrarySync providers={data.providers} class="mt-4" />
    </div>
    <div class="bg-card rounded-lg p-4">
      <h3 class="font-sora text-xl font-bold">Security</h3>
      <p class="text-muted-foreground text-sm">Change your password and other security settings</p>

      <div class="mt-4 flex items-center gap-2">
        <Switch
          id="incognito"
          checked={data.settings?.incognitoMode}
          onCheckedChange={onSettingChange('incognitoMode')}
        />
        <Label for="incognito">Incognito Mode</Label>
      </div>
      <p class="text-muted-foreground my-1">Will not save to library or history when enabled</p>

      <ChangePassword />
    </div>
    <div class="bg-card rounded-lg p-4">
      <h3 class="font-sora text-xl font-bold">Delete Account</h3>
      <p class="text-muted-foreground text-sm">Delete your account and all associated data</p>
      <Button variant="destructive" type="button" class="mt-4 w-full max-w-md"
        >Delete Account</Button
      >
    </div>
  </div>
</div>
