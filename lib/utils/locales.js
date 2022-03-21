module.exports = {
    loadLocales: function (path, locales) {
        const translations = {};

        locales.forEach(locale => {
            translations[locale.code] = require(`${path}/${locale.code}`);
        });

        return translations;
    },
    translationExistsForLocale(translations, lang, translationKey) {
        const parts = translationKey.split('.');
        let translation = translations[lang];

        for (let i = 0; i < parts.length; ++i) {
            translation = translation[parts[i]];

            if (translation === null || translation === undefined) {
                return false;
            }
        }

        return true;
    },
}
