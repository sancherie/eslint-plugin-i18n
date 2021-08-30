# eslint-plugin-translation

Find the missing translations in a project

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-translation`:

```
$ npm install eslint-plugin-translation --save-dev
```


## Usage

Add `translation` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "translation"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "translation/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





