document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const pwToggle = document.getElementById("pwToggle");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  // Toggle Password Visibility
  pwToggle.addEventListener("click", () => {
    if (password.type === "password") {
      password.type = "text";
      pwToggle.textContent = "🙈";
    } else {
      password.type = "password";
      pwToggle.textContent = "👁";
    }
  });

  // Form Submission Handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match!");
      return;
    }

    const user = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      role: document.getElementById("role").value,
      password: password.value,
    };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Sign up successful!");
    window.location.href = "login.html";
  });
});
