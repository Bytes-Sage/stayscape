"use client";

import { isAuthenticated, loginUser, registerUser } from "@/app/apis/endpoints";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for an existing token on mount
  useEffect(() => {
    // Check if the user is authenticated using the function from endpoints.ts
    if (isAuthenticated()) {
      try {
        // Decode the token to get user data
        const _user = JSON.parse(localStorage.getItem("user") as string);

        if (_user) {
          const mockUser: User = {
            id: _user.id || _user._id,
            email: _user.email,
            firstName: _user.firstName,
            lastName: _user.lastName,
            avatar: "https://avatar.iran.liara.run/public",
          };
          setUser(mockUser);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginUser({ email, password });

      if (response && response.data) {
        const { id, email, firstname, lastname } = response.data;

        const loggedInUser: User = {
          id: id,
          email: email,
          firstName: firstname,
          lastName: lastname,
          avatar: "https://avatar.iran.liara.run/public",
        };

        setUser(loggedInUser);

        localStorage.setItem("user", JSON.stringify(loggedInUser));
      } else {
        throw new Error("Invalid login response from API.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    try {
      // Call your registerUser API function
      const response = await registerUser(userData);
      // If the API returns a token on signup, you can log the user in immediately.
      if (response.data && response.data.accessToken) {
        // If the API automatically logs in and returns a token on signup
        // you would handle it here, similar to the login function.
        // For now, let's assume the user needs to manually login after signup.
        console.log("Signup successful. Please log in.");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Call the logout function from your endpoints.ts file
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
