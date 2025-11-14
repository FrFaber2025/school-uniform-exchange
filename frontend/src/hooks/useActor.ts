export function useActor() {
  return { actor: null, isFetching: false, login: () => {}, logout: () => {}, isLoggingIn: false };
}