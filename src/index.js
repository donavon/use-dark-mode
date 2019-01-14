import { useState, useEffect } from 'react';

const defaultClassName = 'dark-mode';
const bodyElement = global.document.body;

const defaultConfig = {
  className: defaultClassName,
  element: bodyElement,
};

const setDOMDarkMode = (element, method, className) => {
  element.classList[method](className);
};

const useDarkMode = (initialState = false, config = defaultConfig) => {
  const [darkMode, setDarkMode] = useState(initialState);
  const toggleDarkMode = () => setDarkMode(current => !current);
  const { element, className } = { ...defaultConfig, ...config };
  const defaultCallback = (mode) => {
    const method = mode ? 'add' : 'remove';
    setDOMDarkMode(element, method, className);
  };
  const callback = config.callback || defaultCallback;

  useEffect(
    () => {
      callback(darkMode);
    },
    [darkMode]
  );

  return [
    darkMode,
    () => setDarkMode(true),
    () => setDarkMode(false),
    toggleDarkMode,
  ];
};

export default useDarkMode;
