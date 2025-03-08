# Slugger

![NPM Version](https://img.shields.io/npm/v/%40archoleat%2Fslugger)
![NPM Downloads](https://img.shields.io/npm/dm/%40archoleat%2Fslugger)
![Specs](https://img.shields.io/github/actions/workflow/status/archoleat/slugger/spec.yaml?label=Specs)
![Commitlint](https://img.shields.io/github/actions/workflow/status/archoleat/slugger/commitlint.yaml?label=Commitlint)
![Editorconfig](https://img.shields.io/github/actions/workflow/status/archoleat/slugger/editorconfig.yaml?label=Editorconfig)
![Prettier](https://img.shields.io/github/actions/workflow/status/archoleat/slugger/prettier.yaml?label=Prettier)
![ESLint](https://img.shields.io/github/actions/workflow/status/archoleat/slugger/eslint.yaml?label=ESLint)
![Remark](https://img.shields.io/github/actions/workflow/status/archoleat/slugger/remark.yaml?label=Remark)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

```shell
bun i -D @archoleat/slugger
```

## Usage

```js
import { slugger } from '@archoleat/slugger';

const url = await slugger('Кто такой фронтенд-разработчик и как им стать');

console.log(url) // kto-takoj-frontend-razrabotchik-i-kak-im-stat'
```

## Contributing

Please read [**CONTRIBUTING**](https://github.com/archoleat/.github/blob/main/CONTRIBUTING.md)
to start contributing.

## License

This project is licensed under the [**MIT license**](LICENSE).
