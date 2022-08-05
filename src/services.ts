import axios, { AxiosError, AxiosResponse } from "axios";
import { IHttpException, ISuccessfulAuthResponse } from "./types";

const http = axios.create({
  baseURL: "http://localhost:8000"
});

export async function login({
  email,
  password
}: {
  email: string;
  password: string;
}): Promise<ISuccessfulAuthResponse | undefined> {
  try {
    const res = await http.post<any, AxiosResponse<ISuccessfulAuthResponse>>(
      "/auth/login",
      {
        email,
        password
      }
    );
    const { data } = res;

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function refresh(): Promise<ISuccessfulAuthResponse | undefined> {
  try {
    const res = await http.get<any, AxiosResponse<ISuccessfulAuthResponse>>(
      "/auth/refresh",
      {
        withCredentials: true
      }
    );
    const { data } = res;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(">Response, ", error.response);
      const { data } = error.response!;
      console.log(">Error data", data);
    }
    console.log(error);
  }
}
