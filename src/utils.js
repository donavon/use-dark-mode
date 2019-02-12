import createPersistedState from 'use-persisted-state';

const usePersistedDarkModeState = createPersistedState('darkMode');

const noop = () => {};

const mockElement = {
  classList: {
    add: noop,
    remove: noop,
  },
};

// Mock element if SSR else real body element.
const defaultElement = (global.document && global.document.body) || mockElement;

const preferDarkQuery = '(prefers-color-scheme: dark)';

const defaultClassNameDark = 'dark-mode';
const defaultClassNameLight = 'light-mode';

const defaultConfig = {
  classNameDark: defaultClassNameDark,
  classNameLight: defaultClassNameLight,
  element: defaultElement,
};

const mql = global.matchMedia
  ? global.matchMedia(preferDarkQuery)
  : {
    addListener: noop,
    removeListener: noop,
  };

const setDOMClass = (element, method, className) => {
  element.classList[method](className);
};

const isColorSchemeQuerySupported = mql.media === preferDarkQuery;

const getInitialValue = usersInitialState => (
  isColorSchemeQuerySupported ? mql.matches : usersInitialState
);

const getOnChange = (config) => {
  const { element, classNameDark, classNameLight } = {
    ...defaultConfig,
    ...config,
  };

  const defaultOnChange = (val) => {
    setDOMClass(element, val ? 'add' : 'remove', classNameDark);
    setDOMClass(element, !val ? 'add' : 'remove', classNameLight);
  };

  return config.onChange || defaultOnChange;
};

export {
  usePersistedDarkModeState,
  getInitialValue,
  getOnChange,
  mql,
};
