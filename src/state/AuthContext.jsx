import React, { createContext, useReducer, useContext, useEffect } from "react";

const initialState = {
  isAuthenticated: false,
  token: null,
  isInitialized: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    case "INITIALIZE":
      return {
        ...state,
        isInitialized: true,
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedState = localStorage.getItem("authState");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      dispatch({ type: "LOGIN", payload: { token: parsedState.token } });
      dispatch({ type: "INITIALIZE" });
    } else {
      dispatch({ type: "INITIALIZE" });
    }
  }, []);

  useEffect(() => {
    if (state.isInitialized) {
      localStorage.setItem("authState", JSON.stringify(state));
    }
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const initialState = {
    isAuthenticated: context.state.isAuthenticated,
    token: context.state.token,
    isInitialized: context.state.isInitialized,
  };

  return {
    ...context,
    state: initialState,
  };
};
