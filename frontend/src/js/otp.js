import { PORT, DOMAIN } from "../../constants.js";
import userApiClass from "./userApi.js";

const userApi = new userApiClass();
const BASE_URL = `${DOMAIN}:${PORT}`;

const otpBox = document.querySelector(".otp-input");
const verifyBtn = document.querySelector(".verify-btn");
const resendBtn = document.querySelector(".resend-btn");
const email = localStorage.getItem("email");

verifyBtn.addEventListener("click", async (e) => {
  const otp = otpBox.value.trim();

  if (!otp) {
    console.error("Please enter OTP");
    return;
  }

  if (!email) {
    console.error("Email not found. Please go back and register again.");
    return;
  }

  await userApi.verifyOTP(email, otp);
  window.location.href = '/user/login';
});

resendBtn.addEventListener("click", async () => {
  await userApi.sendOTP(email);
});
