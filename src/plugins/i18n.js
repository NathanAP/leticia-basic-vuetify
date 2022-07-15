import defaultMessages from "../common/locale/default.json";

const availableLocales = ["pt-BR"];

const fallbackLocale = "pt-BR";
let locale = navigator.language;
if (!locale || !availableLocales.includes(locale)) locale = "pt-BR";

let messages = {};
messages[locale] = {
    ...defaultMessages[locale],
};

let dateTimeFormats = {};
dateTimeFormats[locale] = {
    ...defaultMessages[locale].dateTimeFormats,
};

let numberFormats = {};
numberFormats[locale] = {
    ...defaultMessages[locale].numberFormats,
};

export { locale, fallbackLocale, messages, dateTimeFormats, numberFormats };
