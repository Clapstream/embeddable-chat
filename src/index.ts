type options = {
  accessKey: string,
  sessionToken: string,
  room?: string,
  theme?: string,
  presentation?: string,
  headCountElement?: HTMLElement,
  user: userType
}

type userType = {
  name: string,
  uid: string
}

type frameMessage = {
  type: string,
  data: any
}

let containerElement: HTMLElement,
  accessKey: string,
  sessionToken: string,
  room: string,
  theme: string,
  presentation: string,
  headCountElement: HTMLElement,
  frame: HTMLIFrameElement,
  user: userType

const _handleReady = () => {
  const event = new Event('ready')
  containerElement.dispatchEvent(event)
}

const _handleNewHeadcount = (hc: number) => {
  if (headCountElement instanceof HTMLElement) {
    headCountElement.innerText = '' + hc
  }
}

const _onMessage = (message: frameMessage) => {
  switch (message.type) {
    case 'READY':
      _handleReady()
      break

    case 'NEW_HEADCOUNT':
      _handleNewHeadcount(message.data.headCount)
      break
  }
}

const _message = (message: frameMessage) => {
  if (!frame.contentWindow) {
    return
  }

  frame.contentWindow.postMessage(message, 'https://embeddable-chat.vercel.app')
}

const _getFrameParams = () => {
  const params = {
    token: sessionToken,
    key: accessKey,
    uid: user.uid,
    name: user.name,
    theme,
    presentation,
    room
  }

  return new URLSearchParams(params).toString()
}

const _appendIFrame = () => {
  frame = document.createElement('iframe')

  frame.src = 'https://embeddable-chat.vercel.app?' + _getFrameParams()

  frame.style.backgroundColor = 'transparent'
  frame.style.width = '100%'
  frame.style.height = '100%'

  window.addEventListener('message', event => {
    if (!(event.source instanceof MessagePort)) {
      const source: WindowProxy | null | ServiceWorker = event.source
      if (source !== frame.contentWindow) return

      _onMessage(event.data)
    }
  }, false)

  while (containerElement.lastChild) {
    containerElement.removeChild(containerElement.lastChild);
  }

  containerElement.appendChild(frame)
}

const setRoom = (room: string) => {
  _message({
    type: 'SET_ROOM',
    data: {
      room
    }
  })
}

const FKChat = (
  element: HTMLElement | string,
  options: options
) => {
  if (typeof element === 'string') {
    const el: HTMLElement | null = document.querySelector(element)

    if (el === null) {
      throw new Error('Element provided is not a valid DOM Element.')
    }

    containerElement = el
  } else if (element instanceof HTMLElement) {
    containerElement = element
  }

  if (typeof options.headCountElement === 'string') {
    const el: HTMLElement | null = document.querySelector(options.headCountElement)

    if (el === null) {
      throw new Error('headCountElement provided is not a valid DOM Element.')
    }

    headCountElement = el
  } else if (element instanceof HTMLElement) {
    headCountElement = element
  }

  if (!options.sessionToken) {
    throw new Error('Please provide a valid session token.')
  }

  if (!options.user || !options.user.name || !options.user.uid) {
    throw new Error('User\'s name or uid is not valid')
  }

  sessionToken = options.sessionToken
  accessKey = options.accessKey
  room = options.room ? options.room : 'Home'
  theme = options.theme ? options.theme : 'dark'
  presentation = options.presentation ? options.presentation : 'cards'
  user = options.user

  _appendIFrame()
}

export { FKChat, setRoom }
