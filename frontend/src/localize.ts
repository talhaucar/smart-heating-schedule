const en = {
  title: "Smart Heating Schedule",
  loading: "Loading…",
  not_loaded: "Smart Heating Schedule is not set up. Add the integration under Settings → Devices & services.",
  read_only: "Only administrators can change schedules.",
  presence: {
    label: "Presence",
    auto: "Auto",
    home: "Home",
    away: "Away",
    detected_home: "Auto: someone is home",
    detected_away: "Auto: nobody is home",
    detected_unknown: "Auto: presence unknown, using the home schedule",
    forced: "Set manually; automatic switching is paused",
  },
  overview: {
    add: "Add thermostat",
    empty_title: "No schedules yet",
    empty_text: "Add a thermostat to give it a weekly home and away schedule.",
    no_thermostats: "All thermostats already have a schedule.",
    choose: "Choose a thermostat",
    now: "Now",
  },
  status: {
    until: "{temperature} until {time}",
    off_until: "Off until {time}",
    constant: "{temperature} all week",
    constant_off: "Off all week",
    disabled: "Schedule is off",
    pending: "Waiting for the thermostat",
    error: "Could not update the thermostat: {error}",
  },
  room: {
    back: "Back",
    enabled: "Smart schedule",
    add_block: "Add time block",
    copy_day: "Copy schedule",
    paste_day: "Paste schedule",
    copied: "Schedule copied. Use paste on another day.",
    copy_rooms: "Copy schedule to other rooms",
    remove: "Remove schedule",
    remove_text: "Stop scheduling {name} and delete its home and away schedules?",
    off: "Off",
  },
  block: {
    edit: "Edit time block",
    add: "Add time block",
    start: "Start",
    end: "End",
    heating: "Heating",
    off: "Off",
    frost: "Frost protection",
    delete: "Delete time block",
    lower: "Lower temperature",
    raise: "Raise temperature",
    overlap: "Overlapping time blocks are shortened or replaced.",
    invalid: "The end must be at least 15 minutes after the start.",
  },
  copy: {
    title: "Copy schedule",
    text: "Replaces the home and away schedules of the selected rooms with those of {name}.",
    nothing: "There are no other thermostats.",
  },
  common: {
    cancel: "Cancel",
    save: "Save",
    add: "Add",
    copy: "Copy",
    remove: "Remove",
    close: "Close",
  },
  error: {
    save: "Could not save: {error}",
  },
};

type Strings = typeof en;
type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

const nl: DeepPartial<Strings> = {
  title: "Smart Heating Schedule",
  loading: "Laden…",
  not_loaded:
    "Smart Heating Schedule is niet ingesteld. Voeg de integratie toe via Instellingen → Apparaten & diensten.",
  read_only: "Alleen beheerders kunnen schema's wijzigen.",
  presence: {
    label: "Aanwezigheid",
    auto: "Automatisch",
    home: "Thuis",
    away: "Afwezig",
    detected_home: "Automatisch: er is iemand thuis",
    detected_away: "Automatisch: niemand thuis",
    detected_unknown: "Automatisch: aanwezigheid onbekend, thuis-schema actief",
    forced: "Handmatig ingesteld; automatisch wisselen staat uit",
  },
  overview: {
    add: "Thermostaat toevoegen",
    empty_title: "Nog geen schema's",
    empty_text: "Voeg een thermostaat toe om een wekelijks thuis- en afwezig-schema te maken.",
    no_thermostats: "Alle thermostaten hebben al een schema.",
    choose: "Kies een thermostaat",
    now: "Nu",
  },
  status: {
    until: "{temperature} tot {time}",
    off_until: "Uit tot {time}",
    constant: "{temperature} de hele week",
    constant_off: "De hele week uit",
    disabled: "Schema staat uit",
    pending: "Wachten op de thermostaat",
    error: "Thermostaat bijwerken mislukt: {error}",
  },
  room: {
    back: "Terug",
    enabled: "Slim schema",
    add_block: "Tijdsblok toevoegen",
    copy_day: "Kopieer schema",
    paste_day: "Plak schema",
    copied: "Schema gekopieerd. Plak het bij een andere dag.",
    copy_rooms: "Schema kopiëren naar andere kamers",
    remove: "Schema verwijderen",
    remove_text: "Stoppen met plannen voor {name} en het thuis- en afwezig-schema verwijderen?",
    off: "Uit",
  },
  block: {
    edit: "Tijdsblok bewerken",
    add: "Tijdsblok toevoegen",
    start: "Begin",
    end: "Einde",
    heating: "Verwarming",
    off: "Uit",
    frost: "Vorstbeveiliging",
    delete: "Tijdsblok verwijderen",
    lower: "Temperatuur lager",
    raise: "Temperatuur hoger",
    overlap: "Overlappende tijdsblokken worden ingekort of vervangen.",
    invalid: "Het einde moet minstens 15 minuten na het begin liggen.",
  },
  copy: {
    title: "Schema kopiëren",
    text: "Vervangt het thuis- en afwezig-schema van de gekozen kamers door dat van {name}.",
    nothing: "Er zijn geen andere thermostaten.",
  },
  common: {
    cancel: "Annuleren",
    save: "Opslaan",
    add: "Toevoegen",
    copy: "Kopiëren",
    remove: "Verwijderen",
    close: "Sluiten",
  },
  error: {
    save: "Opslaan mislukt: {error}",
  },
};

const translations: Record<string, DeepPartial<Strings>> = { en, nl };

const lookup = (strings: DeepPartial<Strings> | undefined, key: string): string | undefined => {
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
