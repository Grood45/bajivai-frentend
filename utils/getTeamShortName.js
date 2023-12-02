function getTeamShortName(fullName) {
  // Split the full name into individual words
  const words = fullName?.split(" ");

  // Extract the initials from the words
  const initials = words?.reduce((acc, word) => {
    if (word) {
      acc += word[0].toUpperCase(); // Consider the first letter of each word
    }
    return acc.replace(/-/g, "");
  }, "");

  return initials;
}

export default getTeamShortName;
