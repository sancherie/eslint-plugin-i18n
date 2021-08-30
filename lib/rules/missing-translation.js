/**
 * @fileoverview Find the unresolved translations
 * @author sancherie
 */
"use strict";

const {loadLocales, translationExistsForLocale} = require("../utils/locales");
const {isTranslationCall, getTranslationKey} = require("../utils/nodes");
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
                    locales: {
                        type: 'array',
                        default: ['fr'],
                        uniqueItems: true,
                        additionalItems: false,
                        items: {
                            type: 'string',
                        },
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
        const localesDir = context.options.localesDir || 'locales';
        const locales = context.options.locales || ['fr'];
        const translations = loadLocales(`${process.cwd()}/${localesDir}`);

        const checkTranslationForLocale = function (node, locale, translationKey) {
            if (!translationExistsForLocale(translations, locale, translationKey)) {
                context.report({
                    node: node,
                    message: "[{{locale }}] Unresolved translation key: {{ translationKey }}",
                    data: {
                        locale: locale.toUpperCase(),
                        translationKey: translationKey
                    }
                });
            }
        }

        const checkTranslation = function (node, translationKey) {
            locales.forEach(locale => {
                checkTranslationForLocale(node, locale, translationKey);
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
