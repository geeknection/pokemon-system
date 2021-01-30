import pt_BR from './langs/pt-br';

const deviceLanguage = navigator.language.toString().toLowerCase().replace('_', '-');

/**
 * Traduz um texto a partir de um slug
 * @param {*} slug 
 * @returns string
 */
const getMessage = (slug: string): string => {
    try {
        let language = Object.assign({}, pt_BR);
        if (require(`./langs/${deviceLanguage}`)) {
            language = require(`./langs/${deviceLanguage}`)
        }

        language = language.default || language;

        const splited = slug.split('.');
        let translatedSlug: any = null;
        for (let i = 0; i < splited.length; i++) {
            if (i === 0) {
                if (language[splited[i]]) {
                    translatedSlug = language[splited[i]];
                }
                else {
                    throw new Error('Incorrect slug[' + slug + ']');
                }
            }
            else {
                if (translatedSlug[splited[i]]) {
                    translatedSlug = translatedSlug[splited[i]];
                }
                else {
                    throw new Error('Incorrect slug[' + slug + ']');
                }
            }
        }

        return translatedSlug;
    } catch (error) {
        return error.message;
    }
};

export default getMessage;