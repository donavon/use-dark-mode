# use-dark-mode
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/887639?v=4" width="100px;" alt="Donavon West"/><br /><sub><b>Donavon West</b></sub>](http://donavon.com)<br />[🚇](#infra-donavon "Infrastructure (Hosting, Build-Tools, etc)") [⚠️](https://github.com/donavon/use-dark-mode/commits?author=donavon "Tests") [💡](#example-donavon "Examples") [🤔](#ideas-donavon "Ideas, Planning, & Feedback") [🚧](#maintenance-donavon "Maintenance") [👀](#review-donavon "Reviewed Pull Requests") [🔧](#tool-donavon "Tools") [💻](https://github.com/donavon/use-dark-mode/commits?author=donavon "Code") | [<img src="https://avatars2.githubusercontent.com/u/29359616?v=4" width="100px;" alt="Revel Carlberg West"/><br /><sub><b>Revel Carlberg West</b></sub>](https://github.com/revelcw)<br />[🤔](#ideas-revelcw "Ideas, Planning, & Feedback") | [<img src="https://avatars2.githubusercontent.com/u/9800850?v=4" width="100px;" alt="Mateusz Burzyński"/><br /><sub><b>Mateusz Burzyński</b></sub>](https://github.com/Andarist)<br />[💻](https://github.com/donavon/use-dark-mode/commits?author=Andarist "Code") | [<img src="https://avatars1.githubusercontent.com/u/1288694?v=4" width="100px;" alt="Justin Hall"/><br /><sub><b>Justin Hall</b></sub>](https://github.com/wKovacs64)<br />[💻](https://github.com/donavon/use-dark-mode/commits?author=wKovacs64 "Code") | [<img src="https://avatars1.githubusercontent.com/u/24556921?v=4" width="100px;" alt="Jeremy"/><br /><sub><b>Jeremy</b></sub>](https://github.com/fxbabys)<br />[📓](#userTesting-fxbabys "User Testing") [🐛](https://github.com/donavon/use-dark-mode/issues?q=author%3Afxbabys "Bug reports") |
| :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!