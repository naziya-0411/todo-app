import { DOMAIN, PORT } from "../../constants.js";
import TokenManagerClass from "../../utils/tokenManager.js";
import showAlert from "./toast.js";

const TokenManager = new TokenManagerClass();
const BASE_URL = `${DOMAIN}:${PORT}`;

export default class AuthAPI {
  registerUser = async (username, email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const error = new Error(res.statusText || "Registration failed");
        error.status = res.status;
        throw error;
      }

      return;
    } catch (err) {
      throw err
    }
  };

  loginUser = async (email, password) => {
    try {
      console.log("this is login API");

      const res = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = new Error(res.statusText || "Login failed");
        error.status = res.status;
        throw error;
      }

      return await res.json();
    } catch (err) {
      throw err;
    }
  };

  verifyOTP = async (email, otp) => {
    try {
      const res = await fetch(`${BASE_URL}/otp/verifyOTP`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        showAlert("OTP verified successfully!");
        window.location.href = "/pages/login.html";
      } else {
        const err = new Error(res.statusText || "Unable to verify OTP");
        err.status = res.status;
        throw err;
      }

    } catch (err) {
      showAlert("Network Error:", err.message);
    }
  };

  sendOTP = async (email) => {
    try {
      const res = await fetch(`${BASE_URL}/otp/sendOTP?redirect=loginPage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const err = new Error(res.statusText || "Unable to send OTP");
        err.status = res.status;
        throw err;
      }
    } catch (err) {
      throw err;
    }
  };

  resetPassword = async (email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/user/resetPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = new Error(res.statusText || "Unable to reset Password!");
        err.status = res.status;
        throw err;
      }

    } catch (err) {
      throw err;
    }
  };

  refreshToken = async () => {
    try {
      const refreshToken = TokenManager.getRefreshToken();

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const res = await fetch(
        `${BASE_URL}/user/refreshToken`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!res.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await res.json();
      TokenManager.setTokens(data.accessToken, data.refreshToken);
      return data;

    } catch (err) {
      TokenManager.clearTokens();
      throw err;
    }
  };
}