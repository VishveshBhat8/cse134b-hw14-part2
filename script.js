class ProjectCard extends HTMLElement {
    constructor() {
      super();
  
      const shadow = this.attachShadow({ mode: 'open' });
  
      const heading = document.createElement('h2');
      const image = document.createElement('img');
      const description = document.createElement('p');
      const readMoreLink = document.createElement('a');
  
      const name = this.getAttribute('name');
      const imgSrc = this.getAttribute('img-src');
      const imgAlt = this.getAttribute('img-alt');
      const projectDescription = this.getAttribute('description');
      const readMore = this.getAttribute('readMore');
  
      heading.textContent = name;
      image.src = imgSrc;
      image.alt = imgAlt;
      description.textContent = projectDescription;
      readMoreLink.textContent = 'Read More';
      readMoreLink.href = readMore; // Replace '#' with the actual link of the project

  
      shadow.innerHTML = `
        <div>
          ${heading.outerHTML}
          ${image.outerHTML}
          ${description.outerHTML}
          ${readMoreLink.outerHTML}
        </div>
      `;
    }
  }
  
customElements.define('project-card', ProjectCard);


const jsonData = {
    "projects": [
      {
        "name": "First Card",
        "imgSrc": "https://source.unsplash.com/random/192x108/?wallpaper,landscape",
        "imgAlt": "Image of a random landscape from Unsplash",
        "description": "This is the First Card! It contains the name, image, description, and a read more link.",
        "readMore": "https://ucsd.edu"
      },
      {
        "name": "Second Card",
        "imgSrc": "./trident.png",
        "imgAlt": "Image of the trident logo",
        "description": "This is the Second Card! It contains the name, image, description, and a read more link.",
        "readMore": "https://ucsd.edu"
      },
      {
        "name": "Third Card",
        "imgSrc": "https://source.unsplash.com/random/192x108/?wallpaper,scenery",
        "imgAlt": "Image of a random scenery from Unsplash",
        "description": "This is the Third Card! It contains the name, image, description, and a read more link.",
        "readMore": "https://ucsd.edu"
      }
    ]
  };
const jsonString = JSON.stringify(jsonData);
localStorage.setItem("data", jsonString);

//-----------------------------------------------------------------------------


const loadLocalButton = document.getElementById('loadLocalButton');
const loadRemoteButton = document.getElementById('loadRemoteButton');
const cardContainer = document.getElementById('cardContainer');

loadLocalButton.addEventListener('click', () => {
    const jsonString = localStorage.getItem("data");

    const jsonData = JSON.parse(jsonString);
    const jsonDataProjects = jsonData['projects'];

    cardContainer.innerHTML = '';

    jsonDataProjects.forEach((data) => {
        const card = `<project-card name='${data.name}' img-src='${data.imgSrc}' img-alt='${data.imgAlt}' description='${data.description}' readMore='${data.readMore}'></project-card> `;
        cardContainer.innerHTML += card;

    });

});


//-----------------------------------------------------------------------------

loadRemoteButton.addEventListener('click', () => {
    const url = "https://api.jsonbin.io/v3/qs/64cee6b99d312622a38c9162";//json url

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            cardContainer.innerHTML = '';

            data['record']['projects'].forEach((elem) => {
                const card = `<project-card name='${elem.name}' img-src='${elem.imgSrc}' img-alt='${elem.imgAlt}' description='${elem.description}' readMore='${elem.readMore}'></project-card> `;
                cardContainer.innerHTML += card;

            });


        })
        .catch(error => {
            console.error("Error occured while querying data:", error);
        });

});


//-----------------------------------------------------------------------------

document.getElementById("updateForm").addEventListener("submit", function(event) {
    const dataName = document.getElementById("dataName").value;
    const updatedContent = document.getElementById("updatedContent").value;

    localStorage.setItem(dataName, updatedContent);

});
