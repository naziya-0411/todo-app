import AuthAPI from "../api/AuthAPI";
import { showAlert } from "../toast";

const api = new AuthAPI();

const profileForm = document.querySelector("#profile-img-form");
const nameEl = document.querySelector(".profile-info-box h5");
const emailEl = document.querySelector(".profile-info-box p");
const profileImg = document.querySelector(".profile-img");


profileForm.addEventListener("submit", updateProfile);
document.addEventListener("DOMContentLoaded", fetchUserProfile);

async function fetchUserProfile() {
  try {

    
 

    const user = data.user;

    nameEl.textContent = `Name: ${user.username || "N/A"}`;
    emailEl.innerHTML = `Email ID: <i class="fa-solid fa-envelope me-2"></i> ${
      user.email || "N/A"
    }`;

    if (user.avatar) {
      profileImg.src = `${BASE_URL}/uploads/${user.avatar}`;
    } else {
      profileImg.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
    }
  } catch (err) {
    console.error("Error loading profile:", err);
  }
}

async function updateProfile(e) {
  try {
    e.preventDefault();
    const profileInput = document.querySelector(".profile-input");
    console.log("this is ", profileInput)

    if (!profileInput[0]) {
      showAlert("Please upload image!", "error");
    }

    await api.updateProfile(profileInput[0]);

    showAlert("file uploaded successfully!");

  } catch (err) {
    showAlert(err.message, "error");
  }
}
