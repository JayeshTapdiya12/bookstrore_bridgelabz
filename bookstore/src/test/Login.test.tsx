import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

import * as userService from "../service/userService";
jest.mock("../service/userService");

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login page", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Email Id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /SignUp/i })).toBeInTheDocument();
  });

  test("switches to Signup tab", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const signupTab = screen.getByRole("tab", { name: /SignUp/i });
    fireEvent.click(signupTab);

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email Id$/i)).toBeInTheDocument(); // Signup email
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument(); // Signup password
    expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument();
  });

  test("successful login triggers navigate", async () => {
    const mockLogin = userService.Login as jest.MockedFunction<
      typeof userService.Login
    >;
    mockLogin.mockResolvedValueOnce({
      data: {
        success: "true",
        message: "Login successful",
        data: "fake-token",
      },
    } as any);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email Id/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/");
    });

    expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
  });

  test("successful signup triggers alert and navigate", async () => {
    const mockSign = userService.Sign as jest.MockedFunction<
      typeof userService.Sign
    >;
    mockSign.mockResolvedValueOnce({
      data: { message: "Signup successful", code: 201, data: {} },
    } as any);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Switch to Signup tab
    fireEvent.click(screen.getByRole("tab", { name: /SignUp/i }));

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/^Email Id$/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "pass123" },
    });
    fireEvent.change(screen.getByLabelText(/Mobile Number/i), {
      target: { value: "9876543210" },
    });

    // Mock window.alert
    window.alert = jest.fn();

    fireEvent.click(screen.getByRole("button", { name: /Signup/i }));

    await waitFor(() => {
      expect(mockSign).toHaveBeenCalledWith(
        "John",
        "Doe",
        "john@example.com",
        "pass123",
        "9876543210"
      );
      expect(window.alert).toHaveBeenCalledWith("Signup successful");
      expect(mockedNavigate).toHaveBeenCalledWith("/login");
    });
  });

  test("login shows alert if fields are empty", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    window.alert = jest.fn();

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
    expect(window.alert).toHaveBeenCalledWith(
      "Please enter both email and password"
    );
  });

  test("signup shows alert if fields are empty", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("tab", { name: /SignUp/i }));

    window.alert = jest.fn();

    fireEvent.click(screen.getByRole("button", { name: /Signup/i }));
    expect(window.alert).toHaveBeenCalledWith(
      "Please enter all signup details."
    );
  });
});
