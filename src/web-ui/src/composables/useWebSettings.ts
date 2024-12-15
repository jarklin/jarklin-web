import { useLocalStorage } from "@vueuse/core";
import { computed, type Ref } from "vue";

interface Settings {
    optimizedMedia: boolean
    animatedPreview: boolean
    extendedMediaDetails: boolean
    mangaAutoFullscreen: "on" | "off" | "mobile"
}

const defaultSettings: Settings = {
    optimizedMedia: false,
    animatedPreview: true,
    extendedMediaDetails: false,
    mangaAutoFullscreen: "mobile",
};

export const SETTINGS_STORAGE_KEY = 'jarklin-settings';

export function useWebSettings(_?: never): Ref<Settings>;
export function useWebSettings<K extends keyof Settings>(setting: K): Ref<Settings[K]>;

export function useWebSettings<Option extends keyof Settings>(setting?: Option) {
    const settings = useLocalStorage(SETTINGS_STORAGE_KEY, defaultSettings, { mergeDefaults: true });

    return setting !== undefined ? computed({
        get: () => settings.value[setting],
        set: (value: Settings[Option]) => settings.value[setting] = value,
    }) : settings;
}
