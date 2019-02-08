# use-dark-mode

A custom [React Hook](https://reactjs.org/docs/hooks-overview.html) to help you implement a "dark mode" component for your application.

[![npm version](https://badge.fury.io/js/use-dark-mode.svg)](https://badge.fury.io/js/use-dark-mode) [![Build Status](https://travis-ci.com/donavon/use-dark-mode.svg?branch=develop)](https://travis-ci.com/donavon/use-dark-mode)

![usedarkmode-small](https://user-images.githubusercontent.com/887639/51113468-079ee100-17d0-11e9-8a35-e29b12b74740.gif)

`useDarkMode` works in one of two ways:

1.  By toggling a CSS class on whatever element you specify (defaults to `document.body`).
    You then setup your CSS to display different views based on the presence of the selector. For example, the following CSS is used in the demo app to ease the background color in/out of dark mode.

    ```css
    body {
      background-color: #fff;
      color: #333;
      transition: background-color 0.3s ease;
    }
    body.dark-mode {
      background-color: #1a1919;
      color: #999;
    }
    ```

2.  If you don't use global classes, you can specify an `onChange` handler and take care of the implementation of switching to dark mode yourself.

## New in Version 2.x

* `useDarkMode` now persists between sessions. It stores the user setting in
`localStorage`.

* It shares dark mode state with all other `useDarkMode` components on the page.

* It shares dark mode state with all other tabs/browser windows.

* The initial dark mode is queried from the system. Note: this requires a browser that supports the `prefers-color-scheme: dark` media query
(currently only [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/release-notes/))
and a system that supports dark mode, such as macOS Mojave.

* Changing the system dark mode state will also change the state of `useDarkMode`
(i.e, change to light mode in the system will change to light mode in your app).

## Requirement

To use `use-dark-mode`, you must use `react@16.8.0` or greater which includes Hooks.

## Installation

```sh
$ npm i use-dark-mode
```

## Usage

```js
const darkMode = useDarkMode(initialState, optionalConfigObject);
```

### Config

You pass `useDarkMode` an `initialState` (a boolean specifying whether it should be in dark mode
by default) and an optional configuration object. The configuration object contains the following.

| Key         | Description                                                                                                                                                                                                                                                                                        |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `classNameDark` | The class to apply. Default = `dark-mode`.                                                                                                                                                                                                                                                         |
| `classNameLight` | The class to apply. Default = `light-mode`.                                                                                                                                                                                                                                                         |
| `element`   | The element to apply the class name. Default = `document.body`.                                                                                                                                                                                                                                    |
| `onChange`  | A function that will be called when the dark mode value changes and it is safe to access the DOM (i.e. it is called from within a `useEffect`). If you specify `onChange` then `classNameDark`, `classNameLight`, and `element` are ignored (i.e. no classes are automatically placed on the DOM). You have full control! |

### Return object

A `darkMode` object is returned with the following properties.

| Key         | Description                                             |
| :---------- | :------------------------------------------------------ |
| `value`     | A boolean containing the current state of dark mode.    |
| `enable()`  | A function that allows you to set dark mode to `true`.  |
| `disable()` | A function that allows you to set dark mode to `false`. |
| `toggle()`  | A function that allows you to toggle dark mode.         |

## Example

Here is a simple component that uses `useDarkMode` to provide a dark mode toggle control.
If dark mode is selected, the CSS class `dark-mode` is applied to `document.body` and is removed
when de-selected.

```jsx
import React from 'react';

import Toggle from './Toggle';
import useDarkMode from 'use-dark-mode';

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  return (
    <div>
      <button type="button" onClick={darkMode.disable}>
        ☀
      </button>
      <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
      <button type="button" onClick={darkMode.enable}>
        ☾
      </button>
    </div>
  );
};

export default DarkModeToggle;
```

## That flash!

If your CSS is setup to default to light mode, but the user selects dark mode,
the next time they visit your app, they will be in dark mode.
However, the user will see a flash of light mode before the app is spun up
and `useDarkMode` is called.

To prevent this, I've included some vanilla JavaScript that you can insert in your
`index.html` just after the `<body>` tag. It is in a file named `noflash.js.txt`.
You can either insert the contents of this file in a `<script>` tag or automate the
step in your build process.

## Live demo

You can view/edit a dark mode demo app on CodeSandbox.

[![Edit demo app on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mzj64x80ny)

## License

**[MIT](LICENSE)** Licensed

---

A special thanks to [@revelcw](https://twitter.com/revelcw) for his help and inspiration on this package.
