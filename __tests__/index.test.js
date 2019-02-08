import { testHook, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import useDarkMode from '../src';

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

  // test('you can pass an `initialValue`', () => {
  //   let value;
  //   testHook(() => {
  //     ({ value } = useDarkMode(true, { element: createTestElement({}) }));
  //   });
  //   expect(value).toBe(true);
  // });

  // test('`initialValue` defaults to `false`', () => {
  //   let value;
  //   testHook(() => {
  //     ({ value } = useDarkMode(undefined, { element: createTestElement({}) }));
  //   });
  //   expect(value).toBe(false);
  // });

  // test('`config` is optional', () => {
  //   let value;
  //   testHook(() => {
  //     ({ value } = useDarkMode());
  //   });
  //   expect(value).toBe(false);
  // });

  // test('`config.className` is applied to the element `config.element`', (done) => {
  //   const test = {};
  //   testHook(() => useDarkMode(true, { className: 'foo', element: createTestElement(test) }));
  //   setTimeout(() => {
  //     expect(test).toEqual({ className: 'foo', method: 'add' });
  //     done();
  //   }, 1);
  // });

  // test('you can pass a `config.onChange` that is called with the current value of dark mode', (done) => {
  //   const onChange = (isDarkMode) => {
  //     expect(isDarkMode).toBe(true);
  //     done();
  //   };
  //   testHook(() => useDarkMode(true, { onChange }));
  // });

  // test('you can call `darkMode.enable` to set dark mode', () => {
  //   let value;
  //   let enable;
  //   testHook(() => {
  //     ({ value, enable } = useDarkMode(false, { element: createTestElement({}) }));
  //   });
  //   expect(value).toBe(false);
  //   enable();
  //   expect(value).toBe(true);
  // });

  // test('you can call `darkMode.disable` to clear dark mode', () => {
  //   let value;
  //   let disable;
  //   testHook(() => {
  //     ({ value, disable } = useDarkMode(true, { element: createTestElement({}) }));
  //   });
  //   expect(value).toBe(true);
  //   disable();
  //   expect(value).toBe(false);
  // });

  // test('you can call `darkMode.toggle` to toggle dark mode on/off/on', () => {
  //   let value;
  //   let toggle;
  //   testHook(() => {
  //     ({ value, toggle } = useDarkMode(true, { element: createTestElement({}) }));
  //   });
  //   expect(value).toBe(true);
  //   toggle();
  //   expect(value).toBe(false);
  //   toggle();
  //   expect(value).toBe(true);
  // });
});
