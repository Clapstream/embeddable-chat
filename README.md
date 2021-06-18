# Festkit Embeddable Chat

![Usage Screenshot](https://i.imgur.com/x0Vv5Wx.png)

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

Import the setup function and (optionally) the setRoom function:

```JavaScript
import { FKChat, setRoom } from '@festkit/embeddable-chat'
```

The widget is transparent and doesn't set its own background color. If you're overlaying the widget over some content, you will need to set a background color or gradient on its container element.

To set up the widget:

```JavaScript
FKChat('#chatBox', {
  sessionToken: '<your session token>',
  user: {
    name: '<the users name>', // to be displayed on the chat message
    uid: '<the users id>' // the unique id for the user.
  }
})
```

As the user navigates around in your single-page app, you may want to update their room. To do this, simply use the setRoom function:

```JavaScript
  setRoom('Rock Arena')
```

You can generate a session token for your user by making a `GET` request from your backend to `https://embeddable-chat.vercel.app/token` with your Access Key and Secret.

### Getting a session token
Make the following request from your backend:

`POST` `https://embeddable-chat.vercel.app/token`

#### Headers:

|Header|Value|
|------|-----|
|`Accept`|`application/json`|
|`Content-Type`|`application/json`|

#### Body:
```JSON
{
  "key": "<your access key>",
  "secret": "<your access secret>",
  "uid": "<the user's unique ID on your system>"
}
```


[Reach out to us](mailto:hello@clapstream.com) to get an Access Key and Secret for your project.

## API

### FKChat
| Option  | Type                      | Description |
|---------|---------------------------|-------------|
|`element`| `HTMLElement` or CSS selector `string` | The container in which the chat widget should be rendered. |
|`options`| `FKChatOptions`           | A set of config options (see writeup below). |


### FKChatOptions
| Option      | Type                                   | Description |
|-------------|----------------------------------------|-------------|
|`token`| `string` | The session token from `https://embeddable-chat.vercel.app/token`. |
|`presentation`| `string`                        | The kind of design to use for showing chat messages. Can be set to `cards` or `compact` (default: `cards`). |
|`room`| `string`                        | The initial room to show on the user's chat messages (default: `Home`). |
|`theme`| `string`                        | Is the widget being shown against a dark background or a light background? (Default: `light`).  |
|`user`| `UserDetails`                        | The details for the logged in user (see writeup below). |

### UserDetails
| Option      | Type                                   | Description |
|-------------|----------------------------------------|-------------|
|`name`| `string`                        | The name of the logged in user, shown on chat messages. |
|`uid`| `string`                        | The unique identifier for the logged in user. |

### setRoom
| Option      | Type                                   | Description |
|-------------|----------------------------------------|-------------|
|`name`| `string`                        | The name of the room to be shown on the user's chat messages. |

## License
>You can check out the full license [here](https://github.com/clapstream/embeddable-chat/blob/main/LICENSE)

This project is licensed under the terms of the ISC license.
