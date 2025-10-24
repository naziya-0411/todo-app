import AuthAPI from "../api/AuthAPI";
import { showAlert } from "../toast";

const api = new AuthAPI();

const profileForm = document.querySelector("profile-img-form");

profileForm.addEventListener("submit", updateProfile);

async function updateProfile(e) {
  try {
    e.preventDefault();
    const profileInput = document.querySelector("profile-img-submit");

    if (!profileInput[0]) {
      showAlert("Please upload image!", "error");
    }

    await api.updateProfile(profileInput[0]);

    showAlert("file uploaded successfully!");
    
  } catch (err) {
    showAlert(err.message, "error");
  }
}
