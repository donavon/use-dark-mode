# use-dark-mode

A custom [React Hook](https://reactjs.org/docs/hooks-overview.html) to help you implement a "dark mode" component for your application.
The user setting persists to `localStorage`.

❤️ it? ⭐️ it on [GitHub](https://github.com/donavon/use-dark-mode/stargazers)
or [Tweet](https://twitter.com/intent/tweet?text=Check%20out%20the%20useDarkMode%20custom%20React%20Hook%20that%20simplifies%20adding%20a%20persistent%20dark%20mode%20setting%20to%20your%20app.&url=https%3A%2F%2Fgithub.com%2Fdonavon%2Fuse-dark-mode&via=donavon&hashtags=reactjs,hooks,darkmode)
about it.

[![npm version](https://badge.fury.io/js/use-dark-mode.svg)](https://badge.fury.io/js/use-dark-mode) [![Build Status](https://travis-ci.com/donavon/use-dark-mode.svg?branch=master)](https://travis-ci.com/donavon/use-dark-mode) [![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20the%20useDarkMode%20custom%20React%20Hook%20that%20simplifies%20adding%20a%20persistent%20dark%20mode%20setting%20to%20your%20app.&url=https%3A%2F%2Fgithub.com%2Fdonavon%2Fuse-dark-mode&via=donavon&hashtags=reactjs,hooks,darkmode)

![usedarkmode-small](https://user-images.githubusercontent.com/887639/51113468-079ee100-17d0-11e9-8a35-e29b12b74740.gif)

`useDarkMode` works in one of two ways:

1.  By toggling a CSS class on whatever element you specify (defaults to `document.body`).
    You then setup your CSS to display different views based on the presence of the selector. For example, the following CSS is used in the demo app to ease the background color in/out of dark mode.

    ```css
    body.light-mode {
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

- `useDarkMode` now persists between sessions. It stores the user setting in
  `localStorage`.

- It shares dark mode state with all other `useDarkMode` components on the page.

- It shares dark mode state with all other tabs/browser windows.

- The initial dark mode is queried from the system. Note: this requires a browser that supports the `prefers-color-scheme: dark` media query
  ([currently Chrome, Firefox, Safari and Edge](https://caniuse.com/#search=prefers-color-scheme))
  and a system that supports dark mode, such as macOS Mojave.

- Changing the system dark mode state will also change the state of `useDarkMode`
  (i.e, change to light mode in the system will change to light mode in your app).

- Support for Server Side Rendering (SSR) in version 2.2 and above.

## Requirement

To use `use-dark-mode`, you must use `react@16.8.0` or greater which includes Hooks.

## Installation

```sh
$ npm i use-dark-mode
```

## Usage

```js
const darkMode = useDarkMode(initialState, darkModeConfig);
```

### Parameters

You pass `useDarkMode` an `initialState` (a boolean specifying whether it should be in dark mode
by default) and an optional `darkModeConfig` object. The configuration object may contain the following keys.

| Key               | Description                                                                                                                                                                                                                                                                                                               |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `classNameDark`   | The class to apply. Default = `dark-mode`.                                                                                                                                                                                                                                                                                |
| `classNameLight`  | The class to apply. Default = `light-mode`.                                                                                                                                                                                                                                                                               |
| `element`         | The element to apply the class name. Default = `document.body`.                                                                                                                                                                                                                                                           |
| `onChange`        | A function that will be called when the dark mode value changes and it is safe to access the DOM (i.e. it is called from within a `useEffect`). If you specify `onChange` then `classNameDark`, `classNameLight`, and `element` are ignored (i.e. no classes are automatically placed on the DOM). You have full control! |
| `storageKey`      | A string that will be used by the `storageProvider` to persist the dark mode value. If you specify a value of `null`, nothing will be persisted. Default = `darkMode`.                                                                                                                                                                                                                   |
| `storageProvider` | A storage provider. Default = `localStorage`. You will generally never need to change this value.                                                                                                                                                                                                                       |

### Return object

A `darkMode` object is returned with the following properties.

| Key         | Description                                             |
| :---------- | :------------------------------------------------------ |
| `value`     | A boolean containing the current state of dark mode.    |
| `enable()`  | A function that allows you to set dark mode to `true`.  |
| `disable()` | A function that allows you to set dark mode to `false`. |
| `toggle()`  | A function that allows you to toggle dark mode.         |

Note that because the methods don't require any parameters, you can call them
direcly from an `onClick` handler from a button, for example
(i.e., no lambda function is required).

## Example

Here is a simple component that uses `useDarkMode` to provide a dark mode toggle control.
If dark mode is selected, the CSS class `dark-mode` is applied to `document.body` and is removed
when de-selected.

```jsx
import React from 'react';
import useDarkMode from 'use-dark-mode';

import Toggle from './Toggle';

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
`index.html` just after the `<body>` tag. It is in a file named [noflash.js.txt](https://github.com/donavon/use-dark-mode/blob/develop/noflash.js.txt).
You can either insert the contents of this file in a `<script>` tag or automate the
step in your build process.

Note that if you change any of the default—such as `storageKey` or `classNameDark` for example—the `noflash.js` file will need to be modified with the same values.

### Gatsby

Gatsby users may leverage [`gatsby-plugin-use-dark-mode`](https://github.com/wKovacs64/gatsby-plugin-use-dark-mode#readme) to inject `noflash.js` for you.

### Next.js

For next.js uses copy the `noflash.js.txt` to your `public` folder (`public/noflash.js`) and then create a `_document.js` and include the script **before** `<Main />`.

```js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <script src="noflash.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

## Sample Apps

Here is a list of apps build with `use-dark-mode`.
If you have an app you would like to include on this list, open a PR.

* [Demo App on CodeSandbox](https://codesandbox.io/s/mzj64x80ny) - by [@donavon](https://twitter.com/donavon)

## License

**[MIT](LICENSE)** Licensed

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://donavon.com"><img src="https://avatars3.githubusercontent.com/u/887639?v=4" width="100px;" alt=""/><br /><sub><b>Donavon West</b></sub></a><br /><a href="#infra-donavon" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/donavon/use-dark-mode/commits?author=donavon" title="Tests">⚠️</a> <a href="#example-donavon" title="Examples">💡</a> <a href="#ideas-donavon" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-donavon" title="Maintenance">🚧</a> <a href="https://github.com/donavon/use-dark-mode/pulls?q=is%3Apr+reviewed-by%3Adonavon" title="Reviewed Pull Requests">👀</a> <a href="#tool-donavon" title="Tools">🔧</a> <a href="https://github.com/donavon/use-dark-mode/commits?author=donavon" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/revelcw"><img src="https://avatars2.githubusercontent.com/u/29359616?v=4" width="100px;" alt=""/><br /><sub><b>Revel Carlberg West</b></sub></a><br /><a href="#ideas-revelcw" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/Andarist"><img src="https://avatars2.githubusercontent.com/u/9800850?v=4" width="100px;" alt=""/><br /><sub><b>Mateusz Burzyński</b></sub></a><br /><a href="https://github.com/donavon/use-dark-mode/commits?author=Andarist" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/wKovacs64"><img src="https://avatars1.githubusercontent.com/u/1288694?v=4" width="100px;" alt=""/><br /><sub><b>Justin Hall</b></sub></a><br /><a href="https://github.com/donavon/use-dark-mode/commits?author=wKovacs64" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/fxbabys"><img src="https://avatars1.githubusercontent.com/u/24556921?v=4" width="100px;" alt=""/><br /><sub><b>Jeremy</b></sub></a><br /><a href="#userTesting-fxbabys" title="User Testing">📓</a> <a href="https://github.com/donavon/use-dark-mode/issues?q=author%3Afxbabys" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://janosh.io"><img src="https://avatars0.githubusercontent.com/u/30958850?v=4" width="100px;" alt=""/><br /><sub><b>Janosh Riebesell</b></sub></a><br /><a href="https://github.com/donavon/use-dark-mode/commits?author=janosh" title="Documentation">📖</a></td>
    <td align="center"><a href="http://hipstersmoothie.com"><img src="https://avatars3.githubusercontent.com/u/1192452?v=4" width="100px;" alt=""/><br /><sub><b>Andrew Lisowski</b></sub></a><br /><a href="https://github.com/donavon/use-dark-mode/commits?author=hipstersmoothie" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://jorgegonzalez.io"><img src="https://avatars2.githubusercontent.com/u/12901172?v=4" width="100px;" alt=""/><br /><sub><b>Jorge Gonzalez</b></sub></a><br /><a href="https://github.com/donavon/use-dark-mode/commits?author=jorgegonzalez" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
