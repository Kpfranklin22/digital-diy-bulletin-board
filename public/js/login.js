const loginFormHandler = async (event) => {
  event.preventDefault();

  // Variables storing div locations in the HTML page

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  // Checks to make sure user is logged in, then sends the POST request to
  // the users api to login and create a session. Directs the user to the
  // "create event" page when finished.

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

// Event listener runs the function from the submit button

document.querySelector("#submit").addEventListener("click", loginFormHandler);

module.exports = loginFormHandler;
