import { useState } from 'react';
import 'jest-dom/extend-expect';

import initialize from '../src/initialize';

const noop = () => {};

const createTestElement = arr => ({
  classList: {
    add: (className) => {
      arr.push({ method: 'add', className });
    },
    remove: (className) => {
      arr.push({ method: 'remove', className });
    },
  },
});

const mockedWindowSupported = {
  matchMedia: query => ({
    addListener: noop,
    removeListener: noop,
    media: query,
    matches: true,
  }),
};

const mockedWindowNotSupported = {
  matchMedia: () => ({
    addListener: noop,
    removeListener: noop,
    media: 'not all',
    matches: false,
  }),
};

const testSuite = (g = global, { getInitialValue, getDefaultOnChange, mediaQueryEventTarget }) => {
  const global = g;

  describe('getInitialValue', () => {
    test('import { getInitialValue } from "./utils"', () => {
      expect(typeof getInitialValue).toBe('function');
    });
    test('is passed an initial value and returns that same value if isColorSchemeQuerySupported', () => {
      const mql = global.matchMedia
        ? global.matchMedia('(prefers-color-scheme: dark)')
        : {};
      const isColorSchemeQuerySupported = mql.media === '(prefers-color-scheme: dark)';

      // const isColorSchemeQuerySupported = !!global.matchMedia;

      if (isColorSchemeQuerySupported) {
        expect(getInitialValue('foo')).toBe(true);
      } else {
        expect(getInitialValue('foo')).toBe('foo');
      }
    });
  });

  describe('mediaQueryEventTarget', () => {
    test('is an object that supports an addEventListener method', () => {
      expect(typeof mediaQueryEventTarget.addEventListener).toBe('function');
      expect(mediaQueryEventTarget.addEventListener()).toBeUndefined();
    });
    test('is an object that supports an removeEventListener method', () => {
      expect(typeof mediaQueryEventTarget.removeEventListener).toBe('function');
      expect(mediaQueryEventTarget.removeEventListener()).toBeUndefined();
    });
  });

  describe('getDefaultOnChange', () => {
    test('is a function', () => {
      expect(typeof getDefaultOnChange).toBe('function');
    });
    test('you pass it `element`, `classNameDark`, and `classNameLight`', () => {
      const test = [];
      const mockElement = createTestElement(test);
      const defaultOnChange = getDefaultOnChange(mockElement, 'foo', 'bar');
      expect(typeof defaultOnChange).toBe('function');
    });
    test('these are all optional', () => {
      const defaultOnChange = getDefaultOnChange();
      expect(typeof defaultOnChange).toBe('function');
    });
    test('it returns a function', () => {
      expect(typeof getDefaultOnChange()).toBe('function');
    });
    test('if you pass it `false`, the "light mode" class is added to the element', () => {
      const calls = [];
      const mockElement = createTestElement(calls);
      const defaultOnChange = getDefaultOnChange(mockElement, 'dark', 'light');
      defaultOnChange(false);

      expect(calls.length).toBe(2);
      expect(calls[0]).toEqual({ method: 'add', className: 'light' });
      expect(calls[1]).toEqual({ method: 'remove', className: 'dark' });
    });
    test('if you pass it `true`, the "dark mode" class is added to the element', () => {
      const calls = [];
      const mockElement = createTestElement(calls);
      const defaultOnChange = getDefaultOnChange(mockElement, 'dark', 'light');
      defaultOnChange(true);

      expect(calls.length).toBe(2);
      expect(calls[0]).toEqual({ method: 'add', className: 'dark' });
      expect(calls[1]).toEqual({ method: 'remove', className: 'light' });
    });
  });
};

describe('calling initialize', () => {
  test('with key)', () => {
    const { usePersistedDarkModeState } = initialize('key');
    expect(usePersistedDarkModeState).not.toBe(useState);
  });

  test('without key)', () => {
    const { usePersistedDarkModeState } = initialize();
    expect(usePersistedDarkModeState).toBe(useState);
  });
});

describe('initialize with default', () => {
  const global = undefined;
  testSuite(global, initialize(null, null, global));
});
describe('initialize with an empty object (SSR)', () => {
  const global = {};
  testSuite(global, initialize(null, null, global));
});
describe('initialize with a mock `window` (browser with dark mode support)', () => {
  const global = mockedWindowSupported;
  testSuite(global, initialize(null, null, global));
});
describe('initialize with a mock `window` (browser without dark mode support)', () => {
  const global = mockedWindowNotSupported;
  testSuite(global, initialize(null, null, global));
});
