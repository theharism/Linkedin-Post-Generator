function isValidEmailProvider(email) {
  const allowedProviders = ["gmail.com", "yahoo.com", "outlook.com"];

  // Extract the domain from the email address
  const emailParts = email.split("@");
  if (emailParts.length !== 2) {
    // Invalid email format (must have only one "@")
    return false;
  }

  const domain = emailParts[1];

  // Check if the domain is in the list of allowed providers
  for (const provider of allowedProviders) {
    if (domain.endsWith(provider)) {
      return true;
    }
  }

  return false;
}

export { isValidEmailProvider };
