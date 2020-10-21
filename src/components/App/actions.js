import {
  WEB_SOCKET_ON_OPEN,
  WEB_SOCKET_ON_CLOSE,
  WEB_SOCKET_ON_ERROR,
  WEB_SOCKET_ON_MESSAGE,
  WEB_SOCKET_SEND_MESSAGE,
} from "./constants";

export const webSocketOnOpen = (webSocket, webSocketChannel) => ({
  type: WEB_SOCKET_ON_OPEN,
  webSocket,
  webSocketChannel,
});

export const webSocketOnClose = (code, reason) => ({
  type: WEB_SOCKET_ON_CLOSE,
  code,
  reason,
});

export const webSocketOnError = () => ({
  type: WEB_SOCKET_ON_ERROR,
});

export const webSocketOnMessage = ({ type, ...data }) => ({
  type: `${WEB_SOCKET_ON_MESSAGE}/${type}`,
  ...data,
});

export const webSocketSendMessage = (data) => ({
  type: WEB_SOCKET_SEND_MESSAGE,
  data,
});
