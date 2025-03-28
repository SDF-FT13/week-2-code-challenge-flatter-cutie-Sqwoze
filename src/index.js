document.addEventListener("DOMContentLoaded", () => {
  const characterBar = document.getElementById("character-bar");
  const nameDisplay = document.getElementById("name");
  const imageDisplay = document.getElementById("image");
  const voteCount = document.getElementById("vote-count");
  const votesForm = document.getElementById("votes-form");

  let currentCharacter = null;

  function fetchAllCharacters() {
    fetch("http://localhost:3000/characters")
      .then((response) => response.json())
      .then((characters) => {
        renderCharacterBar(characters);
        if (characters.length > 0) {
          fetchCharacter(characters[0].id);
        }
      })
      .catch((error) => console.error("Error fetching characters:", error));
  }
  function renderCharacterBar(characters) {
    characterBar.innerHTML = "";
    characters.forEach((character) => {
      const span = document.createElement("span");
      span.textContent = character.name;
      span.dataset.id = character.id;
      span.addEventListener("click", () => {
        fetchCharacter(character.id);
      });
      characterBar.appendChild(span);
    });
  }
  function fetchCharacter(id) {
    fetch(`http://localhost:3000/characters/${id}`)
      .then((response) => response.json())
      .then((character) => {
        displayCharacterDetails(character);
      })
      .catch((error) =>
        console.error("Error fetching character details:", error)
      );
  }
  function displayCharacterDetails(character) {
    currentCharacter = character;
    nameDisplay.textContent = character.name;
    imageDisplay.src = character.image;
    imageDisplay.alt = character.name;
    voteCount.textContent = character.votes;
  }
  votesForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (currentCharacter) {
      const votesInput = document.getElementById("votes");
      const additionalVotes = parseInt(votesInput.value, 10) || 0;
      currentCharacter.votes += additionalVotes;
      voteCount.textContent = currentCharacter.votes;
      votesInput.value = "";
    }
  });

  fetchAllCharacters();

});
