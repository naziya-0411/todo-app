import { PORT, DOMAIN } from '../../constants.js';

const BASE_URL = `${DOMAIN}:${PORT}`;

const loginForm = document.querySelector(".login-form");
const emailBox = document.querySelector("#email");
const passwordBox = document.querySelector("#password");
const resetPasswordLink = document.querySelector('.reset-password-link');

console.log(resetPasswordLink);

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailBox.value.trim();
  const password = passwordBox.value;

  if (!email || !password) {
    return;
  }

  await loginUser(email, password);
});

async function loginUser(email, password) {
  try {
    const res = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("access-token", data.accessToken);
      localStorage.setItem("refresh-token", data.refreshToken);

      window.location.href = "/";
    } else {
      console.error("Login Failed:", data.message || "Unknown error");
    }
  } catch (err) {
    console.error("Network Error:", err.message);
  }
}

resetPasswordLink.addEventListener('click', async (e) =>{
    e.preventDefault();
    const email = emailBox.value.trim();

    sendOTP(email);
    window.location.href = "/pages/otp";
});


