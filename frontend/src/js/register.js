// import {DOMAIN, PORT} from '../../constants.js';
// import showAlert  from "./main.js";

const DOMAIN = "127.0.0.1";
const PORT = 8000;

const BASE_URL = `http://${DOMAIN}:${PORT}`;

const registerForm = document.querySelector(".register-form");
const emailBox = document.querySelector("#email");
const passwordBox = document.querySelector("#password");
const usernameBox = document.querySelector("#username");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("inside register");

  const username = usernameBox.value.trim();
  const email = emailBox.value.trim();
  const password = passwordBox.value;

  if (!username || !email || !password) {
    console.error("Please enter all fields");
    return;
  }

  await registerUser(username, email, password);
});

async function registerUser(username, email, password) {
  try {
    const res = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      sendOTP(email); //sending OTP after signing in.

      window.location.href = "/pages/otp";
    } else {
      console.error("Registration Failed:", data.message || "Unknown error");
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

async function sendOTP(email) {
  const res = await fetch(`${BASE_URL}/otp/sendOTP`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (res.ok) {
    console.log("Please try Again! unable to send OTP");
    return;
  }
  console.log("OTP sent successfully");
  return;
}
