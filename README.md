# Hive Astro Loader

From [Astro Content Layer loader for the Hive blockchain](https://github.com/instytutfi/hive-astro-loader).

1. See if I can get it to work from this repo.
2. Change `hiveBlogLoader` to return permlink and renderedContent
3. See if other changes needed for Shrewdies.com

## 250807 remove-husky

Still struggling with straightforward deploy of main repo. So now removed scripts apart from build.

## 250807 codespace-build

I'm changing `package.json` to get it useable for me. Just hacking - I know this isn't the right approach. But it's all I've got for now. Changed:

- `name` to clarify it's not the proper library
- `build` to remove `bunx` because I don't understand it.

As a learning exercise, I see that merging to the main branch needs a workflow to publish the library. But I can't publish this. So, I'm just going to try it without `.github/workflows/main.yml`.
