import React, { Fragment } from 'react';
import { render, cleanup } from 'react-testing-library';
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
  const [isDarkMode, setDarkMode, clearDarkMode, toggleDarkMode] = useDarkMode(
    initialDarkMode, config
  );
  return (
    <Fragment>
      <span data-testid="isDarkMode">{JSON.stringify(isDarkMode)}</span>
      <button data-testid="setDarkMode" type="button" onClick={setDarkMode} />
      <button data-testid="clearDarkMode" type="button" onClick={clearDarkMode} />
      <button data-testid="toggleDarkMode" type="button" onClick={toggleDarkMode} />
    </Fragment>
  );
};

describe('useDarkMode', () => {
  test('import { useDarkMode } from "use-dark-mode"', () => {
    expect(typeof useDarkMode).toBe('function');
  });
  test('`initialDarkMode` defaults to `false`', () => {
    const { getByTestId } = render(<Component config={{ element: createTestElement({}) }} />);
    const isDarkModeElement = getByTestId('isDarkMode');
    expect(isDarkModeElement.textContent).toBe('false');
  });
  test('you can pass an `initialDarkMode`', () => {
    const {
      getByTestId,
    } = render(<Component initialDarkMode={true} config={{ element: createTestElement({}) }} />);
    const isDarkModeElement = getByTestId('isDarkMode');
    expect(isDarkModeElement.textContent).toBe('true');
  });
  test('the class `className` is applied to the element `element`', (done) => {
    const test = {};
    const {
      getByTestId,
    } = render(<Component initialDarkMode={true} config={{ className: 'foo', element: createTestElement(test) }} />);
    setTimeout(() => {
      expect(test).toEqual({ className: 'foo', method: 'add' });
      done();
    }, 1);
  });
  test('you can pass an `callback` that is called with the current state of dark mode', (done) => {
    const callback = (isDarkMode) => {
      expect(isDarkMode).toBe(true);
      done();
    };
    const { getByTestId } = render(<Component initialDarkMode={true} config={{ callback }} />);
  });
  // test('supports a custom initial index of 0, 1, or 2', () => {
  //   [0, 1, 2].forEach((i) => {
  //     const { container } = render(<Component initialColorIndex={i} />);
  //     const child = container.firstChild;
  //     expect(child.textContent).toBe(`${i}`);
  //   });
  // });
  // test('has a default duration array of [5000, 4000, 1000] msecs', () => {
  //   const { container } = render(<Component />);
  //   const child = container.firstChild;
  //   expect(child.textContent).toBe('0');
  //   jest.advanceTimersByTime(5000);
  //   expect(child.textContent).toBe('1');
  //   jest.advanceTimersByTime(4000);
  //   expect(child.textContent).toBe('2');
  //   jest.advanceTimersByTime(1000);
  //   expect(child.textContent).toBe('0');
  // });
  // test('supports a custom duration array', () => {
  //   const { container } = render(<Component durations={[500, 400, 100]} />);
  //   const child = container.firstChild;
  //   expect(child.textContent).toBe('0');
  //   jest.advanceTimersByTime(500);
  //   expect(child.textContent).toBe('1');
  //   jest.advanceTimersByTime(400);
  //   expect(child.textContent).toBe('2');
  //   jest.advanceTimersByTime(100);
  //   expect(child.textContent).toBe('0');
  // });
});
