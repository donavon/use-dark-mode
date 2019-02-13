import { testHook, act, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import useDarkMode from '../src';

afterEach(cleanup);

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

describe('useDarkMode without onChange', () => {
  test('initializing with a default value will return false', () => {
    let value;
    testHook(() => {
      ({ value } = useDarkMode(undefined, { storageKey: null }));
    });
    expect(value).toBe(false);
  });

  test('initializing with a value of false will return false', () => {
    let value;
    testHook(() => {
      ({ value } = useDarkMode(false, { storageKey: null }));
    });
    expect(value).toBe(false);
  });

  test('initializing with a initial value of true will return true', () => {
    let value;
    testHook(() => {
      ({ value } = useDarkMode(true, { storageKey: null }));
    });
    expect(value).toBe(true);
  });

  test('calling `enable` will return `true`', () => {
    let value;
    let enable;
    testHook(() => {
      ({ value, enable } = useDarkMode(false, { storageKey: null }));
    });
    act(enable);
    expect(value).toBe(true);
  });

  test('calling `disable` will return `true`', () => {
    let value;
    let disable;
    testHook(() => {
      ({ value, disable } = useDarkMode(true, { storageKey: null }));
    });
    act(disable);
    expect(value).toBe(false);
  });

  test('calling `toggle` will return flip from `true` to `false` and vice versa', () => {
    let value;
    let toggle;
    testHook(() => {
      ({ value, toggle } = useDarkMode(true, { storageKey: null }));
    });
    act(toggle);
    expect(value).toBe(false);
    act(toggle);
    expect(value).toBe(true);
  });

  test('a media change to "light mode" will return true', () => {
    let callback;

    const mockGlobal = {
      matchMedia: media => ({
        media,
        match: false,
        addListener: (handler) => { callback = handler; },
        removeistener: () => {},
      }),
    };

    let value;
    testHook(() => {
      ({ value } = useDarkMode(false, { storageKey: null, global: mockGlobal }));
    });
    callback({ matches: true });
    expect(value).toBe(true);
  });

  test('a media change to "dark mode" will return false', () => {
    let callback;

    const mockGlobal = {
      matchMedia: media => ({
        media,
        match: true,
        addListener: (handler) => { callback = handler; },
        removeistener: () => {},
      }),
    };

    let value;
    testHook(() => {
      ({ value } = useDarkMode(true, { storageKey: null, global: mockGlobal }));
    });
    callback({ matches: false });
    expect(value).toBe(false);
  });
});

describe('useDarkMode with onChange', () => {
  test('calling `enable` will call handler with `true`', () => {
    let enable;
    const handler = jest.fn();
    testHook(() => {
      ({ enable } = useDarkMode(false, { storageKey: null, onChange: handler }));
    });
    act(enable);
    expect(handler).toHaveBeenCalledWith(true);
  });
  test('calling `disable` will call handler with `true`', () => {
    let disable;
    const handler = jest.fn();
    testHook(() => {
      ({ disable } = useDarkMode(true, { storageKey: null, onChange: handler }));
    });
    act(disable);
    expect(handler).toHaveBeenCalledWith(false);
  });
});

describe('useDarkMode accepts a default `config`', () => {
  test('calling `disable` will call handler with `true`', () => {
    let value;
    testHook(() => {
      ({ value } = useDarkMode(true));
    });
    expect(value).toBe(true);
  });
});

describe('useDarkMode and default `onChange`', () => {
  test('`classNameDark` and `classNameDark` default', () => {
    const calls = [];
    const mockElement = createTestElement(calls);

    testHook(() => {
      (useDarkMode(true, {
        storageKey: null,
        element: mockElement,
      }));
    });
    expect(calls.length).toBe(2);
    expect(calls[0]).toEqual({ method: 'add', className: 'dark-mode' });
    expect(calls[1]).toEqual({ method: 'remove', className: 'light-mode' });
  });

  test('`classNameDark` and `classNameDark` can be specified in `config`', () => {
    const calls = [];
    const mockElement = createTestElement(calls);

    let toggle;
    testHook(() => {
      ({ toggle } = useDarkMode(true, {
        storageKey: null,
        element: mockElement,
        classNameDark: 'd',
        classNameLight: 'l',
      }));
    });
    expect(calls.length).toBe(2);
    expect(calls[0]).toEqual({ method: 'add', className: 'd' });
    expect(calls[1]).toEqual({ method: 'remove', className: 'l' });

    act(toggle);
    expect(calls.length).toBe(4);
    expect(calls[2]).toEqual({ method: 'add', className: 'l' });
    expect(calls[3]).toEqual({ method: 'remove', className: 'd' });
  });

  test('you can specify a custom `storageProvider` and a `storageKey', () => {
    const data = [];
    const mockProvider = {
      getItem: () => null,
      setItem: (key, value) => { data.push([key, value]); },
    };

    let toggle;
    testHook(() => {
      ({ toggle } = useDarkMode(true, {
        storageKey: 'key',
        storageProvider: mockProvider,
        onChange: () => {},
      }));
    });
    expect(data.length).toBe(1);
    expect(data[0]).toEqual(['key', 'true']);

    act(toggle);

    expect(data.length).toBe(2);
    expect(data[1]).toEqual(['key', 'false']);
  });
});
