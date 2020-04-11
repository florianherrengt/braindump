import { enGB, fr } from 'date-fns/locale';
import { english } from './english';
import { french } from './french';

interface I18n {
    text: typeof english | typeof french;
    date: typeof enGB | typeof fr;
}

const getUserLanguage = (): I18n => {
    if (navigator.language.includes('fr')) {
        return { text: french, date: fr };
    }
    return { text: english, date: enGB };
};

export const i18n: I18n = getUserLanguage();
