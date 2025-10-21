import AuthAPI from "../AuthAPI.js";
import TokenManagerClass from "../../../utils/tokenManager.js";
import showAlert from "../toast.js";

const api = new AuthAPI();
const TokenManager = new TokenManagerClass();

const accessToken = localStorage.getItem("accessToken");
const email = localStorage.getItem("email");

if (accessToken) {
  window.location.href = "/";
}

const loginForm = document.querySelector(".login-form");
const emailBox = document.querySelector("#email");
const passwordBox = document.querySelector("#password");
const resetPasswordLink = document.querySelector(".reset-password-link");

loginForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const email = emailBox.value.trim();
    const password = passwordBox.value;

    if (!email || !password) {
      showAlert("Please enter all fields!", "error");
      return;
    }

    const data = await api.loginUser(email, password);

    TokenManager.setTokens(data.accessToken, data.refreshToken);
    window.location.href = "/";

  } catch (err) {
    showAlert(err.message, "error");
  }
});

resetPasswordLink.addEventListener("click", async (e) => {
  try{
    e.preventDefault();
  
    await api.sendOTP(email);
    window.location.href = "/pages/otp?type=reset";
  } catch(err){
    showAlert(err.message, 'error');
  }
});
