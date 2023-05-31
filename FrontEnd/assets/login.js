const form = document.querySelector('form');
const messageErreur = document.getElementById("erreur-message");
const url = "http://localhost:5678/api/users/login";

form.addEventListener('submit', async (event) => {
  event.preventDefault(); 
  await connexion();
});

async function connexion () {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch((url), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });

  const data = await response.json();
  console.log(data);

  if (data.userId && data.token) {
    window.sessionStorage.setItem("token", data.token);
    window.location.href = 'http://127.0.0.1:5500/FrontEnd/index.html';
  } else {
    messageErreur.textContent = "Erreur dans l'identifiant ou le mot de passe";
    form.appendChild(messageErreur);
  }

}



connexion();
