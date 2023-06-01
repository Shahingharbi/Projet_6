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


const modaleSection = document.querySelector(".modale_section");
const editing = document.querySelector(".modifier");
const boutonContainer = document.createElement('div')
const boutonPhoto = document.createElement ('a')
const boutonSupprimer = document.createElement('a')


const modale = document.getElementById('edit');
modale.addEventListener('click', function(e) {
    if (e.target === modale) {
        window.location = '#';
    }
}); 

boutonContainer.classList.add('bouton_container')

boutonPhoto.classList.add ('bouton_photo')
boutonPhoto.textContent = "Ajouter une photo"

boutonSupprimer.classList.add ('bouton_supprimer')
boutonSupprimer.textContent = "Supprimer la galerie"

editing.addEventListener ("click" , afficherImagesGalerie);

async function afficherImagesGalerie() {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();

    const div = document.createElement('div');
    div.classList.add ('galerie_image');

    data.forEach((element , index) => {
      const imageContainer = document.createElement('div'); // Utilisation d'une div pour envelopper l'image et l'icône
      const img = document.createElement('img');
      const icone = document.createElement('i');
      const editer = document.createElement('p');
      editer.textContent = "éditer"
      icone.classList.add('fa-solid', 'fa-trash-can');
      imageContainer.classList.add('image_container')
  
      img.src = element.imageUrl;
      img.alt = element.title;
  
      imageContainer.appendChild(img); // Ajout de l'image dans la div
      imageContainer.appendChild(icone); // Ajout de l'icône dans la div
      imageContainer.appendChild(editer)
      div.appendChild(imageContainer); // Ajout de la div contenant l'image et l'icône à la galerie

      if (index === 0 ) {
        const iconeIndex = document.createElement('i')
        iconeIndex.classList.add('fa-solid' , 'fa-arrows-up-down-left-right')
        imageContainer.appendChild(iconeIndex) && imageContainer.appendChild(icone)
      }
    });
    
    modaleSection.appendChild(div);
    modaleSection.appendChild(boutonContainer)
    boutonContainer.appendChild(boutonPhoto)
    boutonContainer.appendChild(boutonSupprimer)
    editing.removeEventListener ("click" , afficherImagesGalerie)
}


boutonPhoto.addEventListener ('click' ,  () => {
  console.log ("cliquer")
});

  
  
    
        

