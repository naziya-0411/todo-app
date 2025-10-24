import AuthAPI from "../api/AuthAPI";
import { showAlert } from "../toast";

const api = new AuthAPI();

const profileForm = document.querySelector("profile-img-form");
const profileSubmit = document.querySelector("profile-img-submit");

profileForm.addEventListener("submit", updateProfile);

async function updateProfile(e) {
  try {
    e.preventDefault();

    await api.updateProfile(profileInput[0]);

    showAlert("file uploaded successfully!");
  } catch (err) {
    showAlert(err.message, "error");
  }
}
