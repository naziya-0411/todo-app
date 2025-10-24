import AuthAPI from "../api/AuthAPI";
import { showAlert } from "../toast";

const api = new AuthAPI();

const profileForm = document.querySelector("#profile-img-form");
console.log(profileForm);

profileForm.addEventListener("submit", updateProfile);

async function updateProfile(e) {
  try {
    e.preventDefault();
    const profileInput = document.querySelector(".profile-input");
    console.log("this is ", profileInput)

    if (!profileInput[0]) {
      showAlert("Please upload image!", "error");
    }

    console.log(profileInput);

    await api.updateProfile(profileInput[0]);


    showAlert("file uploaded successfully!");

  } catch (err) {
    showAlert(err.message, "error");
  }
}
