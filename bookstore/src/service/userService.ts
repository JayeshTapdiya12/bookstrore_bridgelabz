import axios, { type AxiosResponse } from "axios";

const baseUrl = "https://booksbooking.onrender.com/api/v1/users";

interface loginRes {
  success: string;
  message: string;
  data: string;
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
  if (res?.data?.data !== "") {
    await localStorage.setItem("token", res?.data?.data);
  }
  return res;
};

interface SignUpRequest {
  name: string;
  lname: string;
  email: string;
  password: string;
  mobile: string;
}

interface SignUpResponse {
  code: number;
  data: {
    _id: string;
    name: string;
    lname: string;
    password: string;
    email: string;
    mobile: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  message: string;
}
export const Sign = async (
  name: string,
  lname: string,
  email: string,
  password: string,
  mobile: string
): Promise<AxiosResponse<SignUpResponse>> => {
  const data: SignUpRequest = {
    name,
    lname,
    email,
    password,
    mobile,
  };
  let res = await axios.post<SignUpResponse>(`${baseUrl}/sign`, data);
  return res;
};
