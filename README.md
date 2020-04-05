# Codelabs

## Install claat

> More details about this tool can be find [here](https://github.com/googlecodelabs/tools)

## Create codelab

> This command should be run in **codelabs** folder

```bash
claat export js-basic-codelab.md
```

## Collect all codelabs

```bash
  npm run collect-codelabs
```

## Run codelabs locally

> Generate all static presentations before start local build.

```bash
npm start
```

## Generate all static presentations

```bash
npm run generate-presentations
```

## Todo

- [X] Add reveal.js integration
- [ ] Investigate and integrate [surveyjs.io](https://surveyjs.io/Examples/Library#content-js)
- [ ] Build api to collect surveys
