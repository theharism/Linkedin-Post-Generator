import axios from "axios";

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

const LinkedinAuthorization = (state) => {
  const authorizationUrl = "https://www.linkedin.com/oauth/v2/authorization";
  const clientId = "77en64fxw71b3d"; // Replace with your LinkedIn OAuth client ID
  const redirectUri = "https://themusetool.com/verify"; // Replace with your callback URL
  const scope = "w_member_social";

  // Construct the URL with query parameters
  const url = `${authorizationUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

  try {
    window.location.href = url;
  } catch (error) {
    console.log(error);
  }
};

const LinkedinAuthentication = (code, email) => {
  const requestData = new URLSearchParams({
    grant_type: "authorization_code",
    code: `${code}`,
    client_id: "77en64fxw71b3d",
    client_secret: "vINnSBD6pqS0Wj81",
    redirect_uri: "https://themusetool.com/verify",
  });

  fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: requestData,
  })
    .then((response) => response.json())
    .then(async (data) => {
      console.log(data);

      const {
        access_token,
        expires_in,
        refresh_token,
        refresh_token_expires_in,
      } = data;

      const dataToSend = {
        email,
        access_token,
        expires_in, // expiration time in seconds
        refresh_token,
        refresh_token_expires_in, // expiration time in seconds for the refresh token
      };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/linkedindata`,
          dataToSend
        );

        if (response.data.message) {
          return access_token;
        }
      } catch (error) {
        console.log(error);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export {
  isEmail,
  checkSubscriptionType,
  LinkedinAuthorization,
  generateLocalState,
  LinkedinAuthentication,
};
