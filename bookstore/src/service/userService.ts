import axios, { type AxiosResponse } from "axios";

const baseUrl = "https://bookstore.incubation.bridgelabz.com/bookstore_user";

interface loginRes {
  success: string;
  message: string;
  result: { accessToken: string };
}

export const Login = async (
  email: string,
  password: string
): Promise<AxiosResponse<loginRes>> => {
  const data = {
    email,
    password,
  };
  let res = await axios.post<loginRes>(`${baseUrl}/login`, data);
  //   if (res?.data?.success) {
  //     localStorage.setItem("token", res?.data?.result?.accessToken);
  //   }
  return res;
};

interface SignUpRequest {
  fullName: string;

  email: string;
  password: string;
  phone: string;
}

interface SignUpResponse {
  success: boolean;
  message: string;
  result: {
    address: [];
    isVerified: boolean;
    _id: string;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
export const Sign = async (
  fullName: string,
  email: string,
  password: string,
  phone: string
): Promise<AxiosResponse<SignUpResponse>> => {
  const data: SignUpRequest = {
    fullName,
    email,
    password,
    phone,
  };
  let res = await axios.post<SignUpResponse>(`${baseUrl}/registration`, data);
  return res;
};
