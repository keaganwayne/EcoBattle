async function getSession() {
  const { data, error } = await window.sb.auth.getSession();
  if (error) {
    console.error("Session error:", error.message);
    return null;
  }
  return data.session;
}

async function requireAuth() {
  const session = await getSession();
  if (!session) {
    window.location.href = "login.html";
    return null;
  }
  return session;
}

async function redirectIfLoggedIn() {
  const session = await getSession();
  if (session) {
    window.location.href = "index.html";
  }
}

async function signOut() {
  await window.sb.auth.signOut();
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", async () => {
  const authMode = document.body.dataset.authMode || "protected";

  // PUBLIC LOGIN PAGE
  if (authMode === "login") {
    await redirectIfLoggedIn();

    const form = document.getElementById("authForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const signInBtn = document.getElementById("signInBtn");
    const signUpBtn = document.getElementById("signUpBtn");
    const message = document.getElementById("authMessage");

    if (!form || !emailInput || !passwordInput) return;

    function setMessage(text, isError = false) {
      if (!message) return;
      message.textContent = text;
      message.style.color = isError ? "#ba1a1a" : "#154212";
    }

    signInBtn?.addEventListener("click", async (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        setMessage("Email and password are required.", true);
        return;
      }

      const { error } = await window.sb.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setMessage(error.message, true);
        return;
      }

      window.location.href = "index.html";
    });

    signUpBtn?.addEventListener("click", async (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        setMessage("Email and password are required.", true);
        return;
      }

      const { error } = await window.sb.auth.signUp({
        email,
        password
      });

      if (error) {
        setMessage(error.message, true);
        return;
      }

      setMessage("Account created. Check email if confirmation is enabled.");
    });

    return;
  }

  // PROTECTED PAGES
  const session = await requireAuth();
  if (!session) return;

  const logoutBtns = document.querySelectorAll("[data-logout]");
  logoutBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      await signOut();
    });
  });
});