const fs = require('fs');

module.exports = {
     loadLocales: function (path, locales) {
        const translations = {};

         locales.forEach(locale => {
            translations[locale] = require(`${path}/${locale}`);
        });

        return translations;
    },
    translationExistsForLocale(translations, lang, translationKey) {
        const parts = translationKey.split('.');
        let translation = translations[lang];

        for (let i = 0; i < parts.length; ++i) {
            if (!translation[parts[i]]) {
                return false;
            }

            translation = translation[parts[i]];
        }

        return true;
    },
}
