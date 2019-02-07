import { useEffect, useCallback } from 'react';
import createPersistedState from 'use-persisted-state';

const preferDarkQuery = '(prefers-color-scheme: dark)';
const usePersistedStateKey = 'darkMode';
const usePersistedDarkModeState = createPersistedState(usePersistedStateKey);

const defaultClassNameDark = 'dark-mode';
const defaultClassNameLight = 'light-mode';
const defaultConfig = {
  classNameDark: defaultClassNameDark,
  classNameLight: defaultClassNameLight,
  element: document.body,
};

const setDOMClass = (element, method, className) => {
  element.classList[method](className);
};

const queryDarkModeMedia = usersInitialState => () => {
  const mql = global.matchMedia(preferDarkQuery);
  const supportsColorSchemeQuery = mql.media === preferDarkQuery;
  return supportsColorSchemeQuery ? mql.matches : usersInitialState;
};

const useDarkMode = (initialValue = false, config = {}) => {
  const [value, setDarkMode] = usePersistedDarkModeState(
    queryDarkModeMedia(initialValue)
  );
  const { element, classNameDark, classNameLight } = {
    ...defaultConfig,
    ...config,
  };

  const defaultOnChange = (val) => {
    setDOMClass(element, val ? 'add' : 'remove', classNameDark);
    setDOMClass(element, !val ? 'add' : 'remove', classNameLight);
  };
  const onChange = config.onChange || defaultOnChange;

  useEffect(
    () => {
      onChange(value);
    },
    [value]
  );

  return {
    value,
    enable: useCallback(() => setDarkMode(true)),
    disable: useCallback(() => setDarkMode(false)),
    toggle: useCallback(() => setDarkMode(current => !current)),
  };
};

export default useDarkMode;
