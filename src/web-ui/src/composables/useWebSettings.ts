import { useStorage } from "@vueuse/core";
import type { Ref } from "vue";

interface Settings {
    optimizedMedia?: boolean
}

const defaultSettings: Settings = {
    optimizedMedia: false
}

export const SETTINGS_STORAGE_KEY = 'jarklin-settings';

export function useWebSettings(_?: never): Ref<Settings>;
export function useWebSettings<K extends keyof Settings>(setting: K): Ref<Settings[K]>;

export function useWebSettings(setting?: keyof Settings) {
    const settings = useStorage(SETTINGS_STORAGE_KEY, defaultSettings, undefined, { mergeDefaults: true });

    return setting !== undefined ? settings.value[setting] : settings;
}
