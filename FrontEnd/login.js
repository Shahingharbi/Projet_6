const form = document.querySelector('form');
const messageErreur = document.getElementById("erreur-message");

messageErreur.textContent = ""
form.appendChild(messageErreur);


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
    window.location.href = './index.html';
  } else {
    messageErreur.innerText = "Erreur dans l'identifiant ou le mot de passe";
  }


}

