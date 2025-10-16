import userApiClass from "../userApi.js";
// import showAlert  from "./main.js";

const userApi = new userApiClass();

const resetForm = document.querySelector(".reset-form");
const passwordBox = document.querySelector("#password");
const confirmPasswordBox = document.querySelector("#confirm-password");
const email = localStorage.getItem("email");

resetForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const password = passwordBox.value;
    const confirmPassword = confirmPasswordBox.value;

    console.log(password, "this is confirm password", confirmPassword);

    if (!password || !confirmPassword) {
      // showMessage("Please enter all fields", "error");
      console.log("Please enter all fields");
      return;
    }

    if (password !== confirmPassword) {
      console.log("password and reset password not matched!");
      return;
    }

    // showMessage("Registering user...", "info");
    await userApi.resetPassword(email, password);
    window.location.href = "/pages/login";
    console.log("password changed successfully!");
  } catch (e) {
    console.error("error in changing password");
  }
});
