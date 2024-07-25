import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = async () => {
    const response = await fetch("/api/user/logout", {
      method: "GET",
    });
    const json = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: null });

      // update loading state
    }
  };

  return { logout };
};
