import userApiClass from "../userApi.js";
import TokenManagerClass from "../../../utils/tokenManager.js";

const userApi = new userApiClass();
const TokenManager = new TokenManagerClass();

const loginForm = document.querySelector(".login-form");
const emailBox = document.querySelector("#email");
const passwordBox = document.querySelector("#password");
const resetPasswordLink = document.querySelector(".reset-password-link");

console.log(resetPasswordLink);

loginForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const email = emailBox.value.trim();
    const password = passwordBox.value;

    if (!email || !password) {
      console.error("please enter all fields!");
      return;
    }

    const data = await userApi.loginUser(email, password);
    TokenManager.setTokens(data.accessToken, data.refreshToken);

    window.location.href = "/";
  } catch (e) {
    console.error("Login failed due to some error", e.message);
  }
});

resetPasswordLink.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = emailBox.value.trim();

  userApi.sendOTP(email);
  window.location.href = "/pages/otp?type=reset";
});
