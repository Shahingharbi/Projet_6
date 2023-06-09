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
    console.log('Erreur:', error);
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

      figure.id = element.id; 
  
      figure.appendChild(image);
      figure.appendChild(titre);
      travauxContainer.appendChild(figure);
    };
  }
  
  elementAPI();

  // Création des boutons //

  function filtreBouton(container) {
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
  filtreBouton(btnFiltreContainer);
  

/////////////////////////////// Modale  Galerie photo/////////////////////////////////////////


const modaleSection = document.querySelector(".modale_section");
const editing = document.querySelectorAll(".modifier");
const boutonContainer = document.createElement('div')
const boutonPhoto = document.createElement ('a')
const boutonSupprimer = document.createElement('a')

// Fermer la modale au clique en dehors 

const modale = document.getElementById('edit');
modale.addEventListener('click', function(fermer) {
    if (fermer.target === modale) {
        window.location = '#';
    }
}); 

boutonContainer.classList.add('bouton_container')

boutonPhoto.classList.add ('bouton_photo')
boutonPhoto.textContent = "Ajouter une photo"

boutonSupprimer.classList.add ('bouton_supprimer')
boutonSupprimer.textContent = "Supprimer la galerie";


editing.forEach((bouton) => {
  bouton.addEventListener('click' , afficherImagesGalerie)
})

async function afficherImagesGalerie() {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();

    const div = document.createElement('div');
    div.classList.add ('galerie_image');

    data.forEach((element , index) => {
      const imageContainer = document.createElement('div'); // Utilisation d'une div pour envelopper l'image et l'icône
      const img = document.createElement('img');
      const editer = document.createElement('p');
      const icone = document.createElement('i');
      icone.classList.add('fa-solid', 'fa-trash-can');

      editer.textContent = "éditer";
      imageContainer.classList.add('image_container');
  
      img.src = element.imageUrl;
      img.alt = element.title;

      imageContainer.id = `travail-${element.id}`
  
      imageContainer.appendChild(img); // Ajout de l'image dans la div
      imageContainer.appendChild(icone); // Ajout de l'icône dans la div
      imageContainer.appendChild(editer)
      div.appendChild(imageContainer); // Ajout de la div contenant l'image et l'icône à la galerie

      if (index === 0 ) {
        const iconeIndex = document.createElement('i')
        iconeIndex.classList.add('fa-solid' , 'fa-arrows-up-down-left-right')
        imageContainer.appendChild(iconeIndex) && imageContainer.appendChild(icone)
      }
          icone.addEventListener('click' , (e) => {
            e.preventDefault()
            supprimerTravaux(element.id)
            console.log(element.id)
          })
          
          
    });
    
    modaleSection.appendChild(div);
    modaleSection.appendChild(boutonContainer )
    boutonContainer.appendChild(boutonPhoto)
    boutonContainer.appendChild(boutonSupprimer)

    editing.forEach((bouton) => {
      bouton.removeEventListener('click' , afficherImagesGalerie)
    })
}

///////////////////// Supression travaux ////////////////////////////////


async function supprimerTravaux(travailId) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${travailId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const travailElement = document.getElementById(`travail-${travailId}`);
      if (travailElement) {
        travailElement.remove();
      }

      console.log(`ID de l'élément à supprimer : travail-${travailId}`);

      const elementPrincipal = document.getElementById(travailId);
      if (elementPrincipal) {
        elementPrincipal.remove();
      }
    } else {
      console.log('Erreur lors de la suppression du travail:', response.status);
    }

    console.log(response);
  } catch (error) {
    console.log(error);
  }
}


/////////////////////////// Modale ajout photo //////////////////////////////////

const modaleContainer1 = document.querySelector('.modale_container1');
const modaleContainer2 = document.querySelector('.modale_container2');

boutonPhoto.addEventListener('click' , () => {
  modaleContainer1.style.display = "none";
  modaleContainer2.style.display = "block";
}) 
  
const flecheGauche = document.querySelector('.fa-arrow-left')

flecheGauche.addEventListener('click' , () => {
  modaleContainer1.style.display = "block";
  modaleContainer2.style.display = "none";
})
// recuperation des categories via l'API // 

async function categoriesAPI () {
  const response = await fetch ('http://localhost:5678/api/categories')
  const data = await response.json();
  afficherCategorieModale(data)
}

categoriesAPI()

  function afficherCategorieModale (categories) {
  const categorieModale = document.getElementById('input_categorie')

  for (let i = 0 ; i < categories.length ; i++) {
    const categorie = categories[i]
    const optionValue = document.createElement('option')
    optionValue.textContent = categorie.name
    optionValue.value = categorie.id

    categorieModale.appendChild(optionValue)

  }

  }

// Evenement au moment du submit pour actionner ma fonction //
const formImage = document.querySelector('#form_modale');

formImage.addEventListener('submit', async(event) => {
  event.preventDefault();
  const image = document.getElementById("upload-photo").files[0];
  const titre = document.getElementById("input_titre").value;
  const categorie = document.getElementById('input_categorie').value;
  const messageErreur = document.getElementById ('message_erreur');

  if (!image || !titre || !categorie) {
    messageErreur.textContent = "Veuillez remplir le formulaire correctement";
  } else {
    messageErreur.textContent = "";
    const nouveauTravail = await modaleAjoutPhoto();
    if (nouveauTravail) {
      afficherElement(nouveauTravail);
      formImage.reset();
      imageUpload.src = "";
      ajoutPhoto.style.display = "flex";
      bouton.style.backgroundColor = "";
      
    }
  }
});

// Fonction pour ajouter les travaux dans l'API et retourner le nouveau travail ajouté
async function modaleAjoutPhoto () {
  try {
    const image = document.getElementById("upload-photo").files[0];
    const titre = document.getElementById("input_titre").value;
    const categorie = document.getElementById('input_categorie').value;

    const formData = new FormData();
    formData.append("image" , image);
    formData.append("title" , titre); 
    formData.append("category", categorie);

    const response = await fetch ('http://localhost:5678/api/works', {
      method : 'POST',
      headers : {
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${token}`,
      } ,
      body : formData
    });

    if (response.ok) {
      const nouveauTravail = await response.json();
      console.log(nouveauTravail); 
            return nouveauTravail;
    } else {
      console.log('Erreur lors de l\'ajout du travail:', response.status);
      return null;
    }
    
  } 
  
  catch (error) {
    console.log('Erreur:', error);
    return null;
  }
}

// Fonction pour afficher un seul élément à partir de l'API
function afficherElement(element) {
  const travauxContainer = document.querySelector('.gallery');
  const figure = document.createElement('figure');
  const image = document.createElement('img');
  const titre = document.createElement('figcaption');

  image.src = element.imageUrl;
  image.alt = element.title;
  titre.textContent = element.title;

  figure.appendChild(image);
  figure.appendChild(titre);
  travauxContainer.appendChild(figure);
}


// Fonction pour afficher l'image sur l'input //

  const imageUpload = document.getElementById('image_upload');
  const ajoutPhoto = document.querySelector('.ajout_photo');
  
  const voirImage = function (image) {
    const [images] = image.files;
    if (images) {
      imageUpload.src = URL.createObjectURL(images);
      ajoutPhoto.style.display = "none";
    } else {
      imageUpload.src = '';
      ajoutPhoto.style.display = "block";
    }
  };
  
  const uploadPhoto = document.getElementById('upload-photo');
  uploadPhoto.addEventListener('change', function() {
    voirImage(this);
  });

    // Changer la couleur du bouton en vert quand tout les éléments sont remplis correctement //

    const bouton = document.querySelector('.bouton_valider button')
    const imageInput = document.getElementById('upload-photo')
    const titreInput = document.getElementById('input_titre')
    const categorieInput = document.getElementById('input_categorie')
  
    function changeCouleur () {
      const imageValue = imageInput.files[0]
      const titreValue = titreInput.value
      const categorieValue = categorieInput.value
      if (imageValue && titreValue && categorieValue) {
        bouton.style.backgroundColor = "#1D6154"
      } else {
        bouton.style.backgroundColor = ""
      }
    }
  
    imageInput.addEventListener('change' , changeCouleur)
    titreInput.addEventListener('change' , changeCouleur)
    categorieInput.addEventListener('change' , changeCouleur)
  



