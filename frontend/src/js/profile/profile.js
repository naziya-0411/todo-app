import AuthAPI from "../api/AuthAPI";
import { showAlert } from "../toast";

const BASE_URL = "http://localhost:8000";

const api = new AuthAPI();

const profileForm = document.querySelector("#profile-img-form");
const nameEl = document.querySelector(".profile-info-box h5");
const emailEl = document.querySelector(".profile-info-box p");
const profileImg = document.querySelector(".profile-img");
const profileInput = document.querySelector(".profile-input");
const imageUrlField = document.querySelector('#profile-img-form h5');

profileInput.addEventListener("change", ()=>{
  imageUrlField.innerText = profileInput.files[0].name;
})

profileForm.addEventListener("submit", updateProfile);
document.addEventListener("DOMContentLoaded", fetchUserProfile);


async function fetchUserProfile() {
  try {
    const user = await api.fetchUserDetail();

    nameEl.textContent = `Name: ${user.username || "N/A"}`;
    emailEl.innerHTML = `Email ID: <i class="fa-solid fa-envelope me-2"></i>${
      user.email || "N/A"
    }`;

    if (user.avatar) {
      profileImg.src = `${BASE_URL}/uploads/${user.avatar}`;
    } else {
      profileImg.src =
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
    }

  } catch (err) {
    showAlert(err.message, "error");
  }
}

async function updateProfile(e) {
  try {
    e.preventDefault();

    const profileInput = document.querySelector(".profile-input");

    if (!profileInput.files || !profileInput.files[0]) {
      showAlert("Please upload an image!", "error");
      return; 
    }

    await api.updateProfileApi(profileInput.files[0]);

    imageUrlField.innerText = "";
    showAlert("File uploaded successfully!");

    await api.fetchUserDetail();
    
  } catch (err) {
    showAlert(err.message, "error");
  }
}
