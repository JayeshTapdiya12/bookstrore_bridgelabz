import axios, { type AxiosResponse } from "axios";

const baseUrl = "http://localhost:3001/api/v1/users";

interface loginRes {
  token: string;
  userId?: string;
  password?: string;
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
  console.log(res);
  return res;
};

interface SignUpRequest {
  name: string;
  lname: string;
  email: string;
  password: string;
  mobile: number;
}

interface SignUpResponse extends SignUpRequest {
  role: string;
  createdAt: string;
  updatedAt: string;
}

export const Sign = async (
  name: string,
  lname: string,
  email: string,
  password: string,
  mobile: number,
  user: boolean
): Promise<AxiosResponse<SignUpResponse>> => {
  const data: SignUpRequest = {
    name,
    lname,
    email,
    password,
    mobile,
  };
  if (user) {
    let res = await axios.post<SignUpResponse>(`${baseUrl}/sign`, data);
    return res;
  } else {
    let res = await axios.post<SignUpResponse>(`${baseUrl}/sign/admin`, data);
    return res;
  }
};
