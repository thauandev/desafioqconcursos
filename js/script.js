let result = [];
let repos = [];
let reposUser = [];
let isRender = false;

let htmlChallenge = null;
let htmlRepos = `<strong>LISTA DOS REPOSITÓRIOS</strong>`;

window.addEventListener("load", () => {
  htmlChallenge = document.querySelector("#challenge-card");

  fetchChallenge();
});

async function fetchChallenge() {
  const response = await fetch("https://api.github.com/users/thauandev");
  result = await response.json();

  render();
}

function render() {
  renderCard();
  handleRepos();
}

function renderCard() {
  const cardHtml = `
  <div class="card-3">
  <img src="${result.avatar_url}" alt="Avatar">
  <a href="${result.html_url}">VISITAR PERFIL</a>
  </div>

   <div class="card"> 
    <span>REPOSITÓRIOS: ${result.public_repos}</span>
    <span>SEGUIDORES: ${result.followers}</span>
    <span>SEGUINDO: ${result.following}</span>
  </div>
  
  <div class="card-2">
    <button id="button"> VER REPOSITÓRIOS </button>
    <button> VER FAVORITOS </button> 
  </div>
  
  <div id="card-repo"> 
      
  </div>
  `;

  htmlChallenge.innerHTML = cardHtml;
}

function handleRepos() {
  const repoButton = document.querySelector("#button");

  repoButton.addEventListener("click", handleButton);
}

async function handleButton() {
  const response = await fetch("https://api.github.com/users/thauandev/repos");

  const results = await response.json();

  reposUser = results;

  renderRepos();
}

function renderRepos() {
  reposUser.forEach((repo) => {
    const repoHTML = `<span>${repo.name}</span>`;

    htmlRepos += repoHTML;
  });
  if (!isRender) {
    const cardRepo = document.querySelector("#card-repo");

    cardRepo.innerHTML = htmlRepos;

    isRender = true;
  }
}
