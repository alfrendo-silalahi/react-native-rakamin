import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { replace } from "expo-router/build/global-state/routing";
import { Base64 } from "js-base64";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AUTH_TOKEN = "auth__token";
const USER_DATA = "user__data";

type UserTokenPayload = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female" | string; // bisa diubah kalau hanya dua opsi
  image: string;
  iat: number; // issued at (UNIX timestamp)
  exp: number; // expiration (UNIX timestamp)
};

type AuthContextType = {
  user: string | null;
  isLoading: boolean;
  signUpMessage: string | null;
  error: string | null;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setSignUpMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [signUpMessage, setSignUpMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log("render auth provider");
    async function checkExistingAuth() {
      try {
        const token: string | null = await AsyncStorage.getItem(AUTH_TOKEN);
        const userData: string | null = await AsyncStorage.getItem(USER_DATA);

        if (token && userData) {
          const payloadToken: string = token.split(".")[1];
          const payload: UserTokenPayload = JSON.parse(
            Base64.decode(payloadToken)
          );

          const now = Math.floor(Date.now() / 1000);
          console.log({ now, exp: payload.exp, isExpired: now > payload.exp });

          if (now >= payload.exp) {
            replace("/signin");
          } else {
            router.replace("/");
          }
        } else {
          router.replace("/signin");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("unknown error");
        }
        await clearAuthData();
      }
    }

    checkExistingAuth();
  }, []);

  const clearAuthData = async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN);
    await AsyncStorage.removeItem(USER_DATA);
    setUser(null);
  };

  const signIn = async (username: string, password: string) => {
    console.log("sign in with dummy auth sign in");
    try {
      setIsLoading(true);

      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, expiresInMins: 1 }),
      });

      const data = await response.json();
      console.log({ data });

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user data
      await AsyncStorage.setItem("auth__token", data.accessToken);
      await AsyncStorage.setItem("user__data", JSON.stringify(data));

      setUser(JSON.stringify(data));
      router.replace("/");
      setError(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (username: string, password: string): Promise<void> => {
    console.log("sign up with dummy auth sign up");
    try {
      setIsLoading(true);
      const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setSignUpMessage(JSON.stringify(data));
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await clearAuthData();
      router.replace("/signin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("unknown error");
      }
    }
  };

  const value = {
    user,
    isLoading,
    signUpMessage,
    error,
    signIn,
    signUp,
    signOut,
    setSignUpMessage,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context: AuthContextType | null = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
