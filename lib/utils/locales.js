const fs = require('fs');

module.exports = {
     loadLocales: function (path) {
        const translations = {};

        fs.readdirSync(path).forEach(file => {
            const filenameWithoutExtension = file.substring(0, file.lastIndexOf('.'))
            translations[filenameWithoutExtension] = require(`${path}/${file}`);
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
