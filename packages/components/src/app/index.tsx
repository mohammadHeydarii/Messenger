import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import Initialize from './initialize';
import { ProvidersList } from 'react-principal';
import { storeproviders } from './storeProviders';
import { AppCantainer } from './appcontainer';
import { ToastProvider } from 'react-native-toast-notifications';
import { Text } from 'react-native';
import { BottomSheetProvider } from '../organisms/myBottomsheet/store';

const App: React.FC = () => {
  const { data: providers = [] } = useQuery({
    queryKey: ['providers'],
    queryFn: storeproviders,
  });
  const isShowSplash = !providers.length;

  return (
    <>
      {Boolean(providers.length) && (
        <ProvidersList providers={providers}>
          <Initialize>
            {() => (!isShowSplash ? <AppCantainer /> : null)}
          </Initialize>
        </ProvidersList>
      )}
      {isShowSplash && <Text>Splash</Text>}
    </>
  );
};

const AppContainers = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider {...{ client }}>
      <ToastProvider>
        <BottomSheetProvider>
        <App />
        </BottomSheetProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export { AppContainers as App };
