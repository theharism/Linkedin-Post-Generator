import axios from "axios";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

function isEmail(input) {
  // Define a regular expression pattern for an email
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Use the pattern to test the input
  return emailPattern.test(input);
}

function checkSubscriptionType(inputString) {
  const lowercaseString = inputString.toLowerCase();
  const hasMonthlySubstring = lowercaseString.includes("monthly");
  const hasYearlySubstring = lowercaseString.includes("yearly");

  return hasMonthlySubstring
    ? "Monthly"
    : hasYearlySubstring
    ? "Yearly"
    : "Free";
}

const generateLocalState = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let state = "";

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    state += characters.charAt(randomIndex);
  }

  return state;
};

const LinkedinAuthentication = async (code, email) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/linkedin-auth`,
      { code, email }
    );

    if (response.data.message) {
      return true;
    }
  } catch (error) {
    console.log("Linkedin Auth Error", error);
    Swal.fire({
      title: "Internal Server Error",
      icon: "success",
      showConfirmButton: false, // Hide the "OK" button in the success popup
      timer: 1500,
    });
  }
};

const LinkedInPost = async (state, text, email) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/linkedin-post`,
      {
        state,
        text,
        email,
      }
    );

    if (response.data.message) {
      Swal.fire({
        title: "Post Created on Linkedin Sucessfully",
        icon: "success",
        showConfirmButton: false, // Hide the "OK" button in the success popup
        timer: 1500,
      });
      return true;
    } else if (response.data.url) {
      window.location.href = response.data.url;

      return false;
    }
  } catch (error) {
    console.log("Linkedin Post error", error);

    Swal.fire({
      title: "Internal Server Error",
      icon: "error",
      showConfirmButton: false, // Hide the "OK" button in the success popup
      timer: 1500,
    });
  }
};

const createCheckoutSession = async (
  email,
  username,
  referralCode,
  price_id
) => {
  try {
    if (referralCode === username + "_PARTNER") {
      Swal.fire({
        title: "You cannot use your own referral code",
        icon: "error",
        showConfirmButton: false, // Hide the "OK" button in the success popup
        timer: 1500,
      });
      return;
    }

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/create-checkout-session`,
      {
        email,
        username,
        referralCode,
        price_id,
      }
    );
    if (response.data) {
      window.open(response.data.url, "_blank");
    }
  } catch (error) {
    console.log("Error create checkout session", error);

    Swal.fire({
      title: error.response.data.error,
      icon: "error",
      showConfirmButton: false, // Hide the "OK" button in the success popup
      timer: 1500,
    });
  }
};

function signout(auth) {
  signOut(auth)
    .then(() => {
      Swal.fire({
        title: "Signed Out!",
        icon: "success",
        showConfirmButton: false, // Hide the "OK" button in the success popup
        timer: 1000,
      });
    })
    .catch((error) => {
      // An error happened.
      toast.error("Error Signing out", {
        position: "top-right",
        autoClose: 1500,
      });
    });
}

export {
  isEmail,
  checkSubscriptionType,
  generateLocalState,
  signout,
  LinkedinAuthentication,
  LinkedInPost,
  createCheckoutSession,
};
