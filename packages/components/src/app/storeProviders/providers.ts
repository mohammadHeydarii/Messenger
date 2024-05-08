export async function storeproviders() {
  const { LangProvider, ThemeProvider, TokenProvider } = await import(
    './store'
  );

  return [LangProvider, ThemeProvider, TokenProvider];
}
