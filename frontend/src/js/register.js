import { DOMAIN, PORT } from "../../constants.js";
import userApiClass from "./userApi.js";
// import showAlert  from "./main.js";

const BASE_URL = `http://${DOMAIN}:${PORT}`;
const userApi = new userApiClass();

const registerForm = document.querySelector(".register-form");
const emailBox = document.querySelector("#email");
const passwordBox = document.querySelector("#password");
const usernameBox = document.querySelector("#username");

registerForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const username = usernameBox.value.trim();
    const email = emailBox.value.trim();
    const password = passwordBox.value;

    if (!username || !email || !password) {
      // showMessage("Please enter all fields", "error");
      console.log("Please enter all fields");
      return;
    }

    // showMessage("Registering user...", "info");
    await userApi.registerUser(username, email, password);

    console.log("user registered successfully, moving to otp page");
    localStorage.setItem("email", email);
    await userApi.sendOTP(email);
    window.location.href = "/pages/otp";
  } catch (e) {
    console.log("error in registration");
  }
});
