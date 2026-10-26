export const DOMAIN = "smart_heating_schedule";

export type Profile = "home" | "away";
export type PresenceMode = "auto" | Profile;

/** A block starts at `start` ("HH:MM") and lasts until the next block (or 24:00). */
export interface Block {
  start: string;
  /** Target temperature, or null for heating off. */
  temperature: number | null;
}

export interface WeekSchedule {
  /** Blocks per day, keyed "mon" to "sun". */
  days: Record<string, Block[]>;
}

export interface RoomStatus {
  profile: Profile;
  temperature: number | null;
  start: string | null;
  end: string | null;
  next_temperature: number | null;
  pending: boolean;
  last_error: string | null;
}

export interface Room {
  entity_id: string;
  enabled: boolean;
  home: WeekSchedule;
  away: WeekSchedule;
  status: RoomStatus;
}

export interface PanelState {
  unit: string;
  presence: {
    mode: PresenceMode;
    profile: Profile;
    entity_id: string;
    detected_home: boolean | null;
  };
  rooms: Room[];
}

// The parts of Home Assistant's frontend objects that the panel uses.

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
}

export interface HassEntityRegistryDisplayEntry {
  entity_id: string;
  name?: string | null;
  device_id?: string;
  area_id?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities: Record<string, HassEntityRegistryDisplayEntry>;
  devices: Record<string, { name?: string | null; name_by_user?: string | null; area_id?: string | null }>;
  areas: Record<string, { name: string }>;
  user?: { is_admin: boolean };
  language: string;
  locale: {
    language: string;
    time_format?: "language" | "system" | "12" | "24";
    first_weekday?: string;
  };
  themes: { darkMode?: boolean };
  config: { unit_system: { temperature: string }; time_zone: string };
  dockedSidebar?: string;
  connection: {
    subscribeMessage<T>(callback: (message: T) => void, message: Record<string, unknown>): Promise<() => void>;
  };
  callWS<T>(message: Record<string, unknown>): Promise<T>;
}

export interface Route {
  prefix: string;
  path: string;
}
