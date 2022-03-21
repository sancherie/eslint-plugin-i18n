/**
 * @fileoverview Find the unresolved translations
 * @author sancherie
 */
"use strict";

const {loadLocales, translationExistsForLocale} = require("../utils/locales");
const {isTranslationCall, getTranslationKey, match} = require("../utils/nodes");
const {defineTemplateBodyVisitor} = require("../utils/parser");

module.exports = {
    meta: {
        docs: {
            description: "Find the unresolved translations",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,
        schema: [
            {
                type: 'object',
                properties: {
                    locale: {
                        default: 'fr',
                        anyOf: [
                            {
                                type: 'array',
                                uniqueItems: true,
                                additionalItems: false,
                                items: {
                                    type: 'object',
                                    properties: {
                                        code: {
                                            type: 'string',
                                        },
                                        excluded: {
                                            type: 'array',
                                            uniqueItems: true,
                                            items: {
                                                type: 'string',
                                            }
                                        }
                                    }
                                },
                            }, {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'string',
                                    },
                                    excluded: {
                                        type: 'array',
                                        uniqueItems: true,
                                        items: {
                                            type: 'string',
                                        }
                                    }
                                }
                            }
                        ],
                    },
                    localesDir: {
                        type: 'string',
                        default: 'locales'
                    }
                },
            }
        ],
    },

    create: function (context) {
        const localesDir = context.options[0].localesDir || 'locales';
        let locales = context.options[0].locale || ['fr'];

        if (!Array.isArray(locales)) {
            locales = [locales];
        }


        locales = locales.map(givenLocal => {
            let locale = givenLocal;
            if (typeof givenLocal === 'string') {
                locale = { code: givenLocal};
            }

            if (!locale.excluded) {
                locale.excluded = [];
            }

            return locale;
        })

        const translations = loadLocales(`${process.cwd()}/${localesDir}`, locales);

        const checkTranslationForLocale = function (node, locale, translationKey) {
            if (!translationExistsForLocale(translations, locale, translationKey)) {
                context.report({
                    node: node,
                    message: "[{{ locale }}] Unresolved translation key: {{ translationKey }}",
                    data: {
                        locale: locale.toUpperCase(),
                        translationKey: translationKey
                    }
                });
            }
        }

        const isTranslationExcluded = function (locale, translationKey) {
            for (const excluded in locale.excluded) {
                if (match(locale.excluded[excluded], translationKey)) {
                    return true;
                }
            }

            return false;
        }

        const checkTranslation = function (node, translationKey) {
            locales.forEach(locale => {
                if (!isTranslationExcluded(locale, translationKey)) {
                    checkTranslationForLocale(node, locale.code, translationKey);
                }
            })
        }


        const checkTranslationIfRelevant = function (node) {
            if (isTranslationCall(node)) {
                const translationKey = getTranslationKey(node);
                checkTranslation(node, translationKey);
            }
        }

        return {
            CallExpression(node) {
                checkTranslationIfRelevant(node);
            },
            ...defineTemplateBodyVisitor(context, {
                CallExpression(node) {
                    checkTranslationIfRelevant(node);
                },
            })
        };
    }
}
;
