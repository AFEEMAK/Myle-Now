import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  const getUser = async () => {
    try {
      const data = await fetch("/api/user/me", {
        method: "GET",
      });
      const json = await data.json();
      console.log("Data", json);
      if (json) {
        dispatch({ type: "LOGIN", payload: json });
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };
  useEffect(() => {
    getUser();
    // const user = JSON.parse(localStorage.getItem("user"));

    // if (user) {
    //   dispatch({ type: "LOGIN", payload: user });
    // }
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
