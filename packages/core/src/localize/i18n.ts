import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translate from './translate';
import { setLang, storeLang as store } from './store';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import { Platform } from '../constants';

const resources = {
  'fa-IR': {
    translation: translate.fa,
  },
  en: {
    translation: translate.en,
  },
};
const useLang = () => {
  const { lang } = store.useState();
  const dispatch = store.useDispatch();
  const isRtl = i18n.dir() === 'rtl';
  async function changeLang(value: any) {
    dispatch(setLang(value));
    await Promise.all([() => i18n.changeLanguage(value)]);
    if (value === 'fa-IR') {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    } else {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }

    if (typeof RNRestart !== 'undefined' && RNRestart.restart) {
      RNRestart.restart();
    }
    (Platform.isDesktop || Platform.isPwa) && window.location.reload();
  }

  if (!lang) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return { lang, changeLang, isRtl };
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: resources,
  interpolation: {
    escapeValue: false,
  },
});
export { useLang, i18n };
