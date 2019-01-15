import { useState, useEffect } from 'react';

const defaultClassName = 'dark-mode';
const defaultElement = global.document.body;

const defaultConfig = {
  className: defaultClassName,
  element: defaultElement,
};

const setDOMDarkMode = (element, method, className) => {
  element.classList[method](className);
};

const useDarkMode = (initialValue = false, config = {}) => {
  const [value, setDarkMode] = useState(initialValue);
  const toggle = () => setDarkMode(current => !current);
  const { element, className } = { ...defaultConfig, ...config };

  const defaultOnChange = (val) => {
    const method = val ? 'add' : 'remove';
    setDOMDarkMode(element, method, className);
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
    enable() {
      setDarkMode(true);
    },
    disable() {
      setDarkMode(false);
    },
    toggle,
  };
};

export default useDarkMode;
