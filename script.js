function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Invalid credentials");
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("userRole", data.role);

      if (data.role === "manager") {
        window.location.href = "manager.html";
      } else if (data.role === "staff") {
        window.location.href = "staff.html";
      } else if (data.role === "public") {
        window.location.href = "public.html";
      } else {
        document.getElementById("message").textContent = "Unknown role!";
      }
    })
    .catch((err) => {
      document.getElementById("message").textContent = err.message;
    });
}
