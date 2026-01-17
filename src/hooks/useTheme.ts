import {useLocalStorage, useMediaQuery} from '@uidotdev/usehooks';

const THEME_KEY = 'theme';

export function useTheme() {
    const darkMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';
    return useLocalStorage<string>(THEME_KEY, darkMode);
}
