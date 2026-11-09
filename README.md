# Archoleat Slugger

![NPM Version](https://img.shields.io/npm/v/%40archoleat%2Fslugger)
![NPM Downloads](https://img.shields.io/npm/dm/%40archoleat%2Fslugger)
![Specs](https://img.shields.io/github/actions/workflow/status/archoleat/slugger/spec.yaml?label=Specs)
![Commitlint](https://img.shields.io/github/actions/workflow/status/archoleat/slugger/commitlint.yaml?label=Commitlint)
![Editorconfig](https://img.shields.io/github/actions/workflow/status/archoleat/slugger/editorconfig.yaml?label=Editorconfig)
![Prettier](https://img.shields.io/github/actions/workflow/status/archoleat/slugger/prettier.yaml?label=Prettier)
![ESLint](https://img.shields.io/github/actions/workflow/status/archoleat/slugger/eslint.yaml?label=ESLint)
![Remark](https://img.shields.io/github/actions/workflow/status/archoleat/slugger/remark.yaml?label=Remark)
![Zero Deps](https://img.shields.io/badge/zero_dependencies-blue)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

```shell
bun i @archoleat/slugger
```

Use `bun i -D @archoleat/slugger` when it is used only by build tooling.

## Usage

With Yandex Config:
```js
import { slugger } from '@archoleat/slugger';

const url = slugger('Кто такой фронтенд-разработчик. И как им стать?');

// kto-takoj-frontend-razrabotchik-i-kak-im-stat'
console.log(url)
```

With your config:
```js
import { slugger } from '@archoleat/slugger';

const url = slugger(
  'Кто такой фронтенд-разработчик. И как им стать?',
  {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'i',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'c',
    ш: 'sh',
    щ: 'shch',
    ъ: 'j',
    ы: 'y',
    э: 'eh',
    ю: 'yu',
    я: 'ya',
  },
);

// kto-takoi-frontend-razrabotcik-i-kak-im-stat
console.log(url)
```

Without config:
```js
import { slugger } from '@archoleat/slugger';

const url = slugger(
  'Кто такой фронтенд-разработчик. И как им стать?',
  {},
);

// кто-такой-фронтенд-разработчик-и-как-им-стать
console.log(url)
```

Different inputs can produce the same slug: `slugger('Кот')` and
`slugger('кот!')` both return `kot`. Slugs are not unique identifiers;
check for collisions in persistent storage and append a stable ID or suffix
when using them as resource URLs. The default mapping also preserves a soft
sign as an apostrophe; encode the result when inserting it into a URL.

## Contributing

Please read [**CONTRIBUTING**](https://github.com/archoleat/.github/blob/main/CONTRIBUTING.md)
to start contributing.

## License

This project is licensed under the [**MIT license**](LICENSE).
