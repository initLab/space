import {type Dispatch, useEffect} from 'react';
import {useLocalStorage} from '@uidotdev/usehooks';
import {useCurrentUser} from './useEndpoints.ts';
import {useTranslation} from "react-i18next";

const LOCALE_KEY = 'locale';

export function useLocale(): [string | undefined, Dispatch<string>] {
    const {data: user} = useCurrentUser();
    const [locale, setStoredLocale] = useLocalStorage<string>(LOCALE_KEY);

    const {i18n} = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(locale ?? user?.locale ?? 'bg').then(() => {})
    }, [i18n, locale, user?.locale]);


    return [locale, setStoredLocale];
}
