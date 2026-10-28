import { de } from "./translations/de";
import { en, type Strings } from "./translations/en";
import { es } from "./translations/es";
import { fr } from "./translations/fr";
import { it } from "./translations/it";
import { nl } from "./translations/nl";
import { pl } from "./translations/pl";
import { pt } from "./translations/pt";
import { ru } from "./translations/ru";
import { tr } from "./translations/tr";
import { zhHans } from "./translations/zh-Hans";

/** Keyed by Home Assistant language code; "pt" also covers "pt-BR". */
export const translations: Record<string, Strings> = {
  en,
  de,
  nl,
  fr,
  es,
  it,
  pl,
  pt,
  ru,
  tr,
  "zh-Hans": zhHans,
};

const lookup = (strings: Strings | undefined, key: string): string | undefined => {
  let value: any = strings;
  for (const part of key.split(".")) value = value?.[part];
  return typeof value === "string" ? value : undefined;
};

export type Localize = (key: string, values?: Record<string, string>) => string;

/** Returns a translate function for a language, falling back to English. */
export const localizer = (language: string): Localize => {
  const strings = translations[language] ?? translations[language.split("-")[0]];
  return (key, values) => {
    let text = lookup(strings, key) ?? lookup(en, key) ?? key;
    for (const [name, value] of Object.entries(values ?? {})) {
      text = text.replace(`{${name}}`, value);
    }
    return text;
  };
};
