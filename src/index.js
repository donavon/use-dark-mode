import { useEffect, useCallback, useMemo } from 'react';
import useEventListener from '@use-it/event-listener';

import initialize from './initialize';

const ONCE = [];

const useDarkMode = (
  initialValue = false,
  {
    element,
    classNameDark,
    classNameLight,
    onChange,
    storageKey = 'darkMode',
    storageProvider,
    global,
  } = {}
) => {
  const {
    usePersistedDarkModeState,
    getDefaultOnChange,
    getInitialValue,
    mediaQueryEventTarget,
  } = useMemo(
    () => initialize(storageKey, storageProvider, global),
    [storageKey, storageProvider, global]
  );

  const [state, setState] = usePersistedDarkModeState(getInitialValue(initialValue));

  const stateChangeCallback = useMemo(
    () => onChange || getDefaultOnChange(element, classNameDark, classNameLight),
    [onChange, element, classNameDark, classNameLight]
  );

  // Call the onChange handler
  useEffect(() => {
    stateChangeCallback(state);
  }, [stateChangeCallback, state]);

  // Listen for media changes and set state.
  useEventListener(
    'change',
    ({ matches }) => setState(matches),
    mediaQueryEventTarget
  );

  return {
    value: state,
    enable: useCallback(() => setState(true), ONCE),
    disable: useCallback(() => setState(false), ONCE),
    toggle: useCallback(() => setState(current => !current), ONCE),
  };
};

export default useDarkMode;
