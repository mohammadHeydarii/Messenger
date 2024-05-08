import { useQuery } from '@tanstack/react-query';

async function initialize() {
  const {
    mapLangPersistToState,
    mapThemePersistToState,
    mapTokenPersistToState,
  } = await import('./storeProviders');
  try {
    const fetch = [
      mapThemePersistToState(),
      mapLangPersistToState(),
      mapTokenPersistToState(),
    ];
    await Promise.all(fetch);
    return true;
  } catch (e) {
    return false;
  }
}
const Initialize = ({ children }: { children: () => JSX.Element | null }) => {
  const { data: isInitialized } = useQuery({
    queryKey: ['initialize'],
    queryFn: initialize,
  });

  return Boolean(isInitialized) ? children() : null;
};

export default Initialize;
