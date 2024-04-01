import axios from "../../interceptors/axios";
import { useNavigate } from "react-router-dom";

export const AuthService = () => {
  const history = useNavigate();
  const baseUrl = process.env.REACT_APP_SERVER_URL;

  const authUser = async ({ email, password }) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email,
        password,
      });

      if (response.data.status === 200) {
        if (response.data.result.user && response.data.result.access_token) {
          history("/");
        }
      }
      return response.data;
    } catch (error) {
      console.error("Erro de autenticação:", error);
      throw error;
    }
  };

  const signOut = () => {
    window.localStorage.clear();
    history("/");
  };

  return {
    authUser,
    signOut,
  };
};
