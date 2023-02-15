const signupFormHandler = async (event) => {
  event.preventDefault();

  // Variables storing div locations in the HTML page

  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  // Checks to make sure all fields have been filled, then sends POST request to the
  // users api to create a new user. Directs user to the "create event" page when finished

  if (username && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

// Assigns function to submit button

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);

module.exports = signupFormHandler;
