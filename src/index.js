import { useEffect, useCallback, useMemo } from 'react';

import {
  usePersistedDarkModeState,
  getInitialValue,
  getOnChange,
  mql,
} from './utils';

const ONCE = [];

const useDarkMode = (initialValue = false, config = {}) => {
  const [state, setState] = usePersistedDarkModeState(
    getInitialValue(initialValue)
  );

  const {
    onChange, element, classNameDark, classNameLight,
  } = config;

  const stateChangeCallback = useMemo(() => getOnChange(config), [
    onChange,
    element,
    classNameDark,
    classNameLight,
  ]);

  useEffect(
    () => {
      stateChangeCallback(state);
    },
    [stateChangeCallback, state]
  );

  useEffect(() => {
    const mediaChangeHandler = ({ matches }) => setState(matches);

    mql.addListener(mediaChangeHandler);
    return () => {
      mql.removeListener(mediaChangeHandler);
    };
  }, ONCE);

  return {
    value: state,
    enable: useCallback(() => setState(true), ONCE),
    disable: useCallback(() => setState(false), ONCE),
    toggle: useCallback(() => setState(current => !current), ONCE),
  };
};

export default useDarkMode;
