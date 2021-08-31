# eslint-plugin-i18n

Find the missing translations in a project

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-translation`:

```
$ npm install @sancherie/eslint-plugin-i18n --save-dev
```


## Usage

Add `@sancherie/eslint-plugin-i18n` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "@sancherie/i18n"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@sancherie/i18n/missing-translation": ["warn", {
            "locales": "fr",
            "localesDir": "/locales"
        }]
    }
}
```

## Supported Rules

* Fill in provided rules here





