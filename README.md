# Festkit Embeddable Chat

[Usage Screenshot](https://i.imgur.com/x0Vv5Wx.png)

## Installation

Embeddable Chat is available as an NPM package.

To install:

```zsh
yarn add @festkit/embeddable-chat
```
or
```zsh
npm install @festkit/embeddable-chat
```

## Usage

Import the chat widget setup function and 

```JavaScript
import { FKChat, setRoom } from '@festkit/embeddable-chat'
```
You need to provide a container into which the chat widget can be rendered.

The widget is transparent and doesn't set it's own background color. You will need to set a background color or gradient on the container element if required.

To set up the chat widget:

```JavaScript
FKChat('#chatBox', {
  accessToken: '<your access token>',
  user: {
    name: '<the users name>', // to be displayed on the chat message
    uid: '<the users id>' // the unique id for the user.
  }
})
```

As the user navigates around in your SPA, you may want to set the room. To do this, simply use the setRoom function:

```JavaScript
  setRoom('Rock Arena')
```

If you don't already have an accessToken, [reach out to us](mailto:hello@clapstream.com) to get your token.

## API

### FKChat
| Option  | Type                      | Description |
|---------|---------------------------|-------------|
|`element`| `HTMLElement` or CSS selector `string` | The container in which the chat widget should be rendered |
|`options`| `FKChatOptions`           | A set of config options (see writeup below) 


### FKChatOptions
| Option      | Type                                   | Description |
|-------------|----------------------------------------|-------------|
|`accessToken`| `string` | The access token provided to you by Clapstream |
|`presentation`| `string`                        | The kind of design to use for showing chat messages. Can be set to `cards` or `compact` (default: `cards`). |
|`room`| `string`                        | The initial room to show on the user's chat messages (default: `Home`). |
|`theme`| `string`                        | Is the widget being shown against a dark background or a light background? (Default: `light`)  |
|`user`| `UserDetails`                        | The details for the logged in user (see writeup below). |

### UserDetails
| Option      | Type                                   | Description |
|-------------|----------------------------------------|-------------|
|`name`| `string`                        | The name of the logged in user |
|`uid`| `string`                        | The unique identifier for the logged in user. |

## License
>You can check out the full license [here](https://github.com/clapstream/embeddable-chat/blob/master/LICENSE)

This project is licensed under the terms of the **ISC** license.
