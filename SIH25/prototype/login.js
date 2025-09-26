function togglePw(inputId, btn) {
  const input = document.getElementById(inputId);
  const type = input.getAttribute("type") === "password" ? "text" : "password";
  input.setAttribute("type", type);
  btn.setAttribute("aria-label", type === "password" ? "Show password" : "Hide password");
}

function login(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const role = document.getElementById("loginRole").value;

  if (!email || !password || !role) {
    alert("Please fill all fields.");
    return;
  }

  // Redirect to verification page with role in query string
  redirectToVerify(role);
}

function redirectToVerify(role) {
  window.location.href = `verify.html?role=${encodeURIComponent(role)}`;
}
