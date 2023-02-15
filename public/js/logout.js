async function logout() {
  // Sends the POST request to the users api to logout. Directs user to the homepage
  // after ending the session.

  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

// Assigns function to logout button

document.querySelector("#logout").addEventListener("click", logout);

module.exports = logout();
