import React from 'react';
import { getBaseUrl, i18n, storeLang, storeToken } from 'core/src';
import { Routes } from './Routes';
import { createSocketIoContext } from 'react-signalr/socketio';
export const SocketIOContext = createSocketIoContext();
const AppCantainer = () => {
  const { lang } = storeLang.useState();
  i18n.changeLanguage(lang);
  const { token } = storeToken.useState();
  return (
    <SocketIOContext.Provider
      connectEnabled={!!token}
      autoConnect
      automaticReconnect
      accessTokenFactory={() => `Bearer ${token}`}
      dependencies={[token]}
      // url={'https://msg.damopet24.com/core'}
      url={getBaseUrl()}
      // url={'http://195.214.235.211:5000'}
    >
      <Routes {...{ token }} />
    </SocketIOContext.Provider>
  );
};

export { AppCantainer };
