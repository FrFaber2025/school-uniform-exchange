import { useInternetIdentity } from './useInternetIdentity';
import { useActor } from './useActor';
import type { Identity } from '@icp-sdk/core/agent';

export interface UseAuthReturn {
    identity?: Identity;
    login: () => void;
    logout: () => void;
    isLoggingIn: boolean;
    actor: any;
    isFetching: boolean;
}

/**
 * Combined authentication hook that provides both actor and identity functionality.
 * This hook wraps useActor and useInternetIdentity to provide a unified interface.
 */
export function useAuth(): UseAuthReturn {
    const { identity, login, clear, isLoggingIn } = useInternetIdentity();
    const { actor, isFetching } = useActor();

    return {
        identity,
        login,
        logout: clear,
        isLoggingIn,
        actor,
        isFetching
    };
}
