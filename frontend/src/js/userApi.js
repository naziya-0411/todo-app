import { DOMAIN, PORT } from "../../constants.js";
import TokenManagerClass from "../../utils/tokenManager.js";

const TokenManager = new TokenManagerClass();
const BASE_URL = `${DOMAIN}:${PORT}`;

export default class userApiClass {
  registerUser = async (username, email, password) => {
    try {
      console.log(`${BASE_URL}/user/register`);

      const res = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error response:", errorData);
        return;
      }

      console.log("Registration successful");
      return;
    } catch (e) {
      console.error("Error registering user:", e);
      return;
    }
  };

  loginUser = async (email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await res.json();

      console.log("Login successful:", data);
      return data;
    } catch (e) {
      console.error("Error logging in user:", e);
      throw e;
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
        console.log("OTP verified successfully!");
        window.location.href = "/pages/login.html";
      } else {
        console.error(
          "Unable to verify user:",
          data.message || "Unknown error"
        );
      }
    } catch (err) {
      console.error("Network Error:", err.message);
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
        const errorData = await res.json();
        console.log("Please try Again! unable to send OTP");
        throw new Error(errorData.message || "OTP failed");
      }

      console.log("OTP sent successfully");
    } catch (e) {
      console.error("Network Error:", e);
      throw e;
    }
  };

  resetPassword = async (password) => {
    try {
      const res = await fetch(`${BASE_URL}/user/resetPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log("Unable to reset password");
        throw new Error(errorData.message || "OTP failed");
      }

      console.log("password reset successfully");
    } catch (e) {
      console.error("unable to reset password", e);
      throw e;
    }
  };

  refreshToken = async () => {
    try {
      const refreshToken = TokenManager.getRefreshToken();

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const res = await fetch(
        `${APIInterceptor.API_BASE_URL}/user/refreshToken`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await res.json();

      TokenManager.setTokens(data.accessToken, data.refreshToken);

      return data;
    } catch (error) {
      console.error("Token refresh error:", error);
      TokenManager.clearTokens();
      throw error;
    }
  };

  logout() {
    TokenManager.clearTokens();
  }
}
