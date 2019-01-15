import React, { Fragment } from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
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

const Component = ({ initialDarkMode, config }) => {
  const darkMode = useDarkMode(initialDarkMode, config);
  return (
    <Fragment>
      <span data-testid="isDarkMode">{JSON.stringify(darkMode.value)}</span>
      <button data-testid="setDarkMode" type="button" onClick={darkMode.enable} />
      <button data-testid="clearDarkMode" type="button" onClick={darkMode.disable} />
      <button data-testid="toggleDarkMode" type="button" onClick={darkMode.toggle} />
    </Fragment>
  );
};

describe('useDarkMode', () => {
  test('import useDarkMode from "use-dark-mode"', () => {
    expect(typeof useDarkMode).toBe('function');
  });

  test('you can pass an `initialValue`', () => {
    const {
      getByTestId,
    } = render(<Component initialDarkMode={true} config={{ element: createTestElement({}) }} />);
    const isDarkModeElement = getByTestId('isDarkMode');
    expect(isDarkModeElement.textContent).toBe('true');
  });

  test('`initialValue` defaults to `false`', () => {
    const { getByTestId } = render(<Component config={{ element: createTestElement({}) }} />);
    const isDarkModeElement = getByTestId('isDarkMode');
    expect(isDarkModeElement.textContent).toBe('false');
  });

  test('you can pass an optional `config`', () => {
    const { getByTestId } = render(<Component />);
    const isDarkModeElement = getByTestId('isDarkMode');
    expect(isDarkModeElement.textContent).toBe('false');
  });

  test('`config.className` is applied to the element `config.element`', (done) => {
    const test = {};
    const {
      getByTestId,
    } = render(<Component initialDarkMode={true} config={{ className: 'foo', element: createTestElement(test) }} />);
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
    render(<Component initialDarkMode={true} config={{ onChange }} />);
  });

  test('you can call `darkMode.enable` to set dark mode', () => {
    const {
      getByTestId,
    } = render(<Component initialDarkMode={false} config={{ element: createTestElement({}) }} />);
    const button = getByTestId('setDarkMode');
    fireEvent.click(button);
    const isDarkModeElement = getByTestId('isDarkMode');
    expect(isDarkModeElement.textContent).toBe('true');
  });

  test('you can call `darkMode.disable` to clear dark mode', () => {
    const {
      getByTestId,
    } = render(<Component initialDarkMode={true} config={{ element: createTestElement({}) }} />);
    const button = getByTestId('clearDarkMode');
    fireEvent.click(button);
    const isDarkModeElement = getByTestId('isDarkMode');
    expect(isDarkModeElement.textContent).toBe('false');
  });

  test('you can call `darkMode.toggle` to toggle dark mode on/off/on', () => {
    const {
      getByTestId,
    } = render(<Component initialDarkMode={true} config={{ element: createTestElement({}) }} />);
    const button = getByTestId('toggleDarkMode');
    const isDarkModeElement = getByTestId('isDarkMode');
    fireEvent.click(button);
    expect(isDarkModeElement.textContent).toBe('false');
    fireEvent.click(button);
    expect(isDarkModeElement.textContent).toBe('true');
    fireEvent.click(button);
    expect(isDarkModeElement.textContent).toBe('false');
  });
});
