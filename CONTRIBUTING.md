# Contribute to Hunch Elements

## Development

Install dependencies

```
yarn
```

### Develop a single element

Develop an element with `parcel docs/<element>.md`. For example if you want to develop `<hunch-tabs>`, run

```
parcel docs/hunch-tabs.md
```

Edit `src/hunch-tabs.ts` to see your changes.

### Develop all elements

Watch for the docs folder, run `yarn docs:build` on any changes.

```
find docs | entr -s 'yarn docs:build'
```

Then in another terminal, run `yarn docs:serve`.
