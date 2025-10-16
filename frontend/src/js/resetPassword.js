import userApiClass from "./userApi.js";
// import showAlert  from "./main.js";

const userApi = new userApiClass();

const resetBtn = document.querySelector(".reset-btn");
const passwordBox = document.querySelector('#password');
const confirmPasswordBox = document.querySelector('#confirmPassword');
const email = localStorage.getItem("email");

console.log(resetBtn);

resetBtn.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    const password = passwordBox.value;
    const confirmPassword = confirmPasswordBox.value;

    if (!password || !confirmPassword) {
      // showMessage("Please enter all fields", "error");
      console.log("Please enter all fields");
      return;
    }

    if(password !== confirmPassword){
        console.log("password and reset password not matched!");
        return;
    }

    // showMessage("Registering user...", "info");
    await userApi.resetPassword(password, email);
    console.log("password changed successfully!");

  } catch (e) {
    console.error('error in changing password');
  }
});
