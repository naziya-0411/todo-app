
const DOMAIN = "127.0.0.1";
const PORT = 8000;

const BASE_URL = `http://${DOMAIN}:${PORT}`;

const otpForm = document.querySelector('.otp-form');
const otpBox = document.querySelector('.otp-input');
const verifyBtn = document.querySelector('.verify-btn');
const resendBtn = document.querySelector('.resend-btn');

otpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const otp = otpForm.querySelector('')

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
