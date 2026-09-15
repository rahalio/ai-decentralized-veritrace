'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  clearAuthTokens,
  getAccessToken,
  getApiKey,
  isAuthenticated as checkAuth,
  setApiKey,
  setAuthTokens,
} from '@/services/shared/infrastructure/auth-tokens';
import { setEffectiveTenantId } from '@/services/shared/infrastructure/tenant-state';
import { apiClient } from '@/services/shared/infrastructure/api-client';
import { unwrapDataEnvelope } from '@/services/shared/contracts';

type AuthContextValue = {
  ready: boolean;
  authenticated: boolean;
  signInWithApiKey: (apiKey: string, tenantLabel?: string) => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(checkAuth());
    setReady(true);
  }, []);

  const signInWithApiKey = useCallback(
    async (apiKey: string, tenantLabel?: string) => {
      setApiKey(apiKey.trim());
      if (tenantLabel) setEffectiveTenantId(tenantLabel);
      setAuthenticated(true);
    },
    [],
  );

  const signInWithPassword = useCallback(
    async (email: string, password: string) => {
      const res = await apiClient.post<{
        data?: {
          accessToken?: string;
          refreshToken?: string;
          token?: string;
        };
        accessToken?: string;
        refreshToken?: string;
        token?: string;
      }>('/v0/auth/login', {
        body: { email, password },
      });

      const data = unwrapDataEnvelope(res.data);
      const accessToken = data.accessToken ?? data.token;
      if (!accessToken) throw new Error('Login did not return an access token');

      setAuthTokens({
        accessToken,
        refreshToken: data.refreshToken,
      });
      setAuthenticated(true);
    },
    [],
  );

  const signOut = useCallback(() => {
    clearAuthTokens();
    setEffectiveTenantId(null);
    setAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      ready,
      authenticated,
      signInWithApiKey,
      signInWithPassword,
      signOut,
    }),
    [ready, authenticated, signInWithApiKey, signInWithPassword, signOut],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function useSessionSnapshot() {
  return {
    hasApiKey: Boolean(getApiKey()),
    hasJwt: Boolean(getAccessToken()),
  };
}
