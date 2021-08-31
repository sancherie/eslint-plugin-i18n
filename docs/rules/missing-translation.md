# Find the unresolved translations (missing-translation)

This rule aims to look for undefined i18n translation keys

Examples of **incorrect** code for this rule:

```js

{{ $t('this.key.doesnt.exist') }}

this.$t('this.key.neither');

```

Examples of **correct** code for this rule:

```js

{{ $t('this.key.exists') }}

this.$t('this.key.too');

```

### Options

#### localesDir
The **localesDir** option sets the directory where locales files are located in the project.

```json
{
    "rules": {
        "@sancherie/i18n/missing-translation": ["warn", {
            "localesDir": "/locales"
        }]
    }
}

```
The value is a string indicating the relative path of the locales directory

#### locales
The **locales** option sets the locales files where key presence must be checked.

```json
{
    "rules": {
        "@sancherie/i18n/missing-translation": ["warn", {
            "locales": ["fr"]
        }]
    }
}

```
The value is an array of filenames contained in your locale dir. The `.json` extension must be omitted

## When Not To Use It

You always have to use it 

## Further Reading

- 
If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
