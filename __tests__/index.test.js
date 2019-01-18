import { proxyHook, cleanup } from 'react-proxy-hook';
import 'jest-dom/extend-expect';

import useDarkMode from '../src';

const useDarkModeProxy = proxyHook(useDarkMode);

afterEach(cleanup);

const createTestElement = obj => ({
  classList: {
    add: (className) => {
      obj.method = 'add';
      obj.className = className;
    },
    remove: (className) => {
      obj.method = 'remove';
      obj.className = className;
    },
  },
});

describe('useDarkMode', () => {
  test('import useDarkMode from "use-dark-mode"', () => {
    expect(typeof useDarkMode).toBe('function');
  });

  test('you can pass an `initialValue`', () => {
    const darkMode = useDarkModeProxy(true, { element: createTestElement({}) });
    expect(darkMode.value).toBe(true);
  });

  test('`initialValue` defaults to `false`', () => {
    const darkMode = useDarkModeProxy(undefined, { element: createTestElement({}) });
    expect(darkMode.value).toBe(false);
  });

  test('`config` is optional', () => {
    const darkMode = useDarkModeProxy();
    expect(darkMode.value).toBe(false);
  });

  test('`config.className` is applied to the element `config.element`', (done) => {
    const test = {};
    useDarkModeProxy(true, { className: 'foo', element: createTestElement(test) });
    setTimeout(() => {
      expect(test).toEqual({ className: 'foo', method: 'add' });
      done();
    }, 1);
  });

  test('you can pass a `config.onChange` that is called with the current value of dark mode', (done) => {
    const onChange = (isDarkMode) => {
      expect(isDarkMode).toBe(true);
      done();
    };
    useDarkModeProxy(true, { onChange });
  });

  test('you can call `darkMode.enable` to set dark mode', () => {
    const darkMode = useDarkModeProxy(false, { element: createTestElement({}) });
    expect(darkMode.value).toBe(false);
    darkMode.enable();
    expect(darkMode.value).toBe(true);
  });

  test('you can call `darkMode.disable` to clear dark mode', () => {
    const darkMode = useDarkModeProxy(true, { element: createTestElement({}) });
    expect(darkMode.value).toBe(true);
    darkMode.disable();
    expect(darkMode.value).toBe(false);
  });

  test('you can call `darkMode.toggle` to toggle dark mode on/off/on', () => {
    const darkMode = useDarkModeProxy(true, { element: createTestElement({}) });
    expect(darkMode.value).toBe(true);
    darkMode.toggle();
    expect(darkMode.value).toBe(false);
    darkMode.toggle();
    expect(darkMode.value).toBe(true);
  });
});
