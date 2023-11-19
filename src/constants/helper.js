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

export { isEmail, checkSubscriptionType };
