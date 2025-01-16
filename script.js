async function fetchPokemonData() {
  const randomId = Math.floor(Math.random() * 100) + 1;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  const data = await response.json();

  displayPokemonData(data);
}

function displayPokemonData(data) {
  // Show the card
  const card = document.getElementById("pokemon-card");
  card.classList.remove("hidden");

  // Name, ID, and Image
  document.getElementById("pokemon-name").textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  document.getElementById("pokemon-id").textContent = `#${data.id.toString().padStart(3, "0")}`;
  document.getElementById("pokemon-image").src = data.sprites.other["official-artwork"].front_default;

  // Types
  const typesContainer = document.getElementById("pokemon-types");
  typesContainer.innerHTML = "";
  data.types.forEach(typeInfo => {
    const typeElement = document.createElement("span");
    typeElement.textContent = typeInfo.type.name;
    typeElement.className = "px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-xs font-semibold";
    typesContainer.appendChild(typeElement);
  });

  // Height, Weight, Abilities
  document.getElementById("pokemon-height").textContent = data.height / 10 + " m";
  document.getElementById("pokemon-weight").textContent = data.weight / 10 + " kg";
  document.getElementById("pokemon-abilities").textContent = data.abilities.map(a => a.ability.name).join(", ");

  // Base Stats
  const statsContainer = document.getElementById("pokemon-stats");
  statsContainer.innerHTML = "";
  data.stats.forEach(statInfo => {
    const statName = statInfo.stat.name.toUpperCase();
    const baseStat = statInfo.base_stat;
    const statElement = document.createElement("div");
    statElement.className = "flex items-center space-x-2";
    statElement.innerHTML = `
      <span class="w-16 text-sm font-bold">${statName}</span>
      <div class="flex-1 bg-gray-300">
        <div class="stat-bar bg-purple-600" style="width: ${baseStat}%"></div>
      </div>
      <span class="text-sm font-semibold">${baseStat}</span>
    `;
    statsContainer.appendChild(statElement);
  });
}

document.getElementById("generate-btn").addEventListener("click", fetchPokemonData);
