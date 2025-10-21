import AuthAPI from "../AuthAPI.js";
import showAlert from "../toast.js";

const api = new AuthAPI();
const accessToken = localStorage.getItem("accessToken");

if (accessToken) {
  window.location.href = "/";
}

const otpBox = document.querySelector(".otp-input");
const verifyBtn = document.querySelector(".verify-btn");
const resendBtn = document.querySelector(".resend-btn");
const email = localStorage.getItem("email");

verifyBtn.addEventListener("click", async (e) => {
  try {
    const otp = otpBox.value.trim();

    if (!otp) {
      showAlert("Please enter OTP", "error");
      return;
    }

    if (!email) {
      showAlert("User not found! Please register to continue!");
      window.location.href = "/pages/register";
      return;
    }

    await api.verifyOTP(email, otp);

    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("type");

    if (type === "login") {
      window.location.href = "/pages/login";
    } else {
      window.location.href = "/pages/resetPassword";
    }

  } catch (err) {
    console.log("inside catch of OTP page!");
    showAlert(err.message, "error");
  }
});

resendBtn.addEventListener("click", async () => {
  try {
    await api.sendOTP(email);
    showAlert("OTP sent successfully", "success");
  } catch(err) {
    showAlert(err.message, "error");
  }
});
