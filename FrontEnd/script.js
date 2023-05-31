// Recupération du token pour se connecter //

const edit = document.querySelector(".edit_mode ");
const token = window.sessionStorage.getItem("token");
const filtre = document.querySelector(".btn-filtre")
const modifier = document.querySelectorAll(".modifier_container")
const logout = document.querySelector("li a")

  if (!token) {
    edit.style.display = "none";
    modifier.forEach((modifier) => {
      modifier.style.display ="none";
    })
  } 

  if (token) {
    filtre.style.display = "none";
    logout.innerHTML = "logout";
    logout.addEventListener("click", () => {
      window.sessionStorage.removeItem("token");
    });
  }




 
  
// Création de ma fonction pour l'appel a l'API //

async function elementAPI() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();
    afficherElements(data);

    // Écouteur d'événement pour les boutons de filtre
    const btnsFiltre = document.querySelectorAll('.btn-filtre .btn');
    btnsFiltre.forEach(btn => {
      btn.addEventListener('click', () => {
        const categorie = btn.textContent;

        // Filtrer les travaux par catégorie
        let travauxFiltres;
        if (categorie === 'Tous') {
          travauxFiltres = data; 
        } else {
          travauxFiltres = data.filter(travail => travail.category.name === categorie || travail.categoryId === categorie);
        }

        afficherElements(travauxFiltres);
      });
      
    });
  } catch (error) {
    console.log('Une erreur est survenue lors de la récupération des éléments :', error);
  }
}

elementAPI()

  // fonction pour afficher les travaux a partir de l'API // 

  function afficherElements(elements) {
    const travauxContainer = document.querySelector('.gallery');
    travauxContainer.innerHTML = '';
  
    for (let i = 0 ; i < elements.length ; i++) {
      const element = elements[i];
      const figure = document.createElement('figure');
      const image = document.createElement('img');
      const titre = document.createElement('figcaption');
  
      image.src = element.imageUrl;
      image.alt = element.title;
      titre.textContent = element.title;
  
      figure.appendChild(image);
      figure.appendChild(titre);
      travauxContainer.appendChild(figure);
    };
  }
  
  elementAPI();

  // Création des boutons //

  function createFilterButtons(container) {
    const categories = ['Tous', 'Objets', 'Appartements', 'Hotels & restaurants'];
  
    categories.forEach(category => {
      const button = document.createElement('button');
      button.classList.add('btn');
      button.textContent = category;
      container.appendChild(button);
    });
  }
  
  // Appel de la fonction pour créer les boutons dans le conteneur approprié

  const btnFiltreContainer = document.querySelector('.btn-filtre');
  createFilterButtons(btnFiltreContainer);
  

// Modale //
const modale = document.querySelector(".modale")
const editing = document.querySelector(".modifier")
editing.addEventListener("click" , () => {
  console.log ('modale ouverte')
  modaleOuverte(modale)

})

async function modaleOuverte (elements) {
  const response = await fetch('http://localhost:5678/api/works');
  const data = await response.json();
  console.log (data)

  for (let i = 0 ; i < elements.length ; i++) {
    const element = elements[i];
    const img = document.createElement("img")
    img.src = element.imageUrl
    modale.appendChild(img)
    console.log(data.img)
  }

}
modaleOuverte()

  
  
    
        

