<!DOCTYPE html>
<html>
<head>
  <title>Login - NexaPayFX</title>
</head>
<body style="background:#0f172a;color:white;text-align:center;padding:50px;">

<h2>Login</h2>

<input id="email" placeholder="Email"><br><br>
<input id="password" type="password" placeholder="Password"><br><br>

<button onclick="login()">Login</button>

<p id="msg"></p>

<script>
const API = "https://nexapayfx-backend.onrender.com/api";

async function login(){
  const res = await fetch(`${API}/auth/login`, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  });

  const data = await res.json();

  if(res.ok){
    localStorage.setItem("token", data.token);
    window.location.href = "index.html";
  } else {
    document.getElementById("msg").innerText = "Login failed";
  }
}
</script>

</body>
</html>
