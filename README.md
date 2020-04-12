# Codelabs

## Install claat

> More details about this tool can be find [here](https://github.com/googlecodelabs/tools)

## Create codelab

> This command should be run in **codelabs** folder

- build codelab

```bash
claat build js-basic-codelab.md
```

- export codelab:

```bash
claat export js-basic-codelab.md
```

## Collect all codelabs

```bash
  npm run collect:codelabs
```

## Run codelabs locally

> Generate all static presentations before start local build.

```bash
npm start
```

## Generate all static presentations

```bash
npm run generate:presentations
```

## Added *codelab-generator* support

> Codelab-generator offers support only for some functionalities from claat tool.

In order to use *codelab-generator* in the codelabs directory you must provide:

- a json file with metadata for creating the card layout
- a markdown file with all necessary steps for tutorial

Codelab static content could be generated using:

```bash
npm run generate:codelabs
```

## Tutorials about claat

- <https://medium.com/@zarinlo/publish-technical-tutorials-in-google-codelab-format-b07ef76972cd>

## Todo

- [X] Add reveal.js integration
- [ ] Investigate and integrate [surveyjs.io](https://surveyjs.io/Examples/Library#content-js)
- [ ] Build api to collect surveys
