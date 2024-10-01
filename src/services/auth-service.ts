import axios, { AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/auth/";

interface LoginResponseData {
  expiresIn: number;
  token: string;
}

interface RegisterResponseData {
  message: string;
}

const login = (email: string, password: string): Promise<LoginResponseData> => {
  return axios
    .post<LoginResponseData>(API_URL + "login", {
      email,
      password,
    })
    .then((response: AxiosResponse<LoginResponseData>) => {
      const { token } = response.data;
      if (token) {
        sessionStorage.setItem("accessToken", token);
      }
      return response.data;
    });
};

const logout = (): void => {
  sessionStorage.removeItem("accessToken");
};

const register = (
  fullName: string,
  email: string,
  password: string
): Promise<RegisterResponseData> => {
  return axios
    .post<RegisterResponseData>(API_URL + "signup", {
      fullName,
      email,
      password,
    })
    .then((response: AxiosResponse<RegisterResponseData>) => {
      return response.data;
    });
};

const getCurrentUserToken = (): string | null => {
  return sessionStorage.getItem("accessToken");
};

const AuthService = {
  login,
  logout,
  register,
  getCurrentUserToken,
};

export default AuthService;
