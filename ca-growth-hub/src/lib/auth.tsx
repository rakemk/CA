import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "ca:auth:token";
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

function safeStorageSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    void error;
  }
}

function safeStorageRemove(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    void error;
  }
}

type User = {
  identifier: string;
  email?: string;
};

type AuthContextValue = {
  token: string | null;
  user: User | null;
  loading: boolean;
  requestOtp: (identifier: string) => Promise<void>;
  verifyOtp: (identifier: string, otp: string) => Promise<void>;
  manualLogin: (identifier: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(!!token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }

    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("invalid token");
        const body = await res.json();
        if (mounted) setUser({ identifier: body.identifier, email: body.email });
      } catch (err) {
        void err;
        safeStorageRemove(STORAGE_KEY);
        if (mounted) setToken(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [token]);

  const requestOtp = async (identifier: string) => {
    const res = await fetch(`${API_BASE}/api/auth/request-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to request OTP");
    }
  };

  const verifyOtp = async (identifier: string, otp: string) => {
    const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, otp }),
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || "OTP verify failed");
    }

    const body = await res.json();
    const newToken = body.token;
    setToken(newToken);
    safeStorageSet(STORAGE_KEY, newToken);

    // populate user
    const meRes = await fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${newToken}` },
    });
    if (meRes.ok) {
      const me = await meRes.json();
      setUser({ identifier: me.identifier, email: me.email });
    }

    navigate("/dashboard", { replace: true });
  };

  const manualLogin = async (identifier: string) => {
    const res = await fetch(`${API_BASE}/api/auth/manual-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier }),
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || "Manual login failed");
    }

    const body = await res.json();
    const newToken = body.token;
    setToken(newToken);
    safeStorageSet(STORAGE_KEY, newToken);

    const meRes = await fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${newToken}` },
    });
    if (meRes.ok) {
      const me = await meRes.json();
      setUser({ identifier: me.identifier, email: me.email });
    }

    navigate("/dashboard", { replace: true });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    safeStorageRemove(STORAGE_KEY);
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, requestOtp, verifyOtp, manualLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
