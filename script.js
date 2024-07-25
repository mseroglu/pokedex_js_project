import { bg_color } from "./colors.js";

const poke_container = document.querySelector(".poke-container")
const search = document.querySelector(".search")
const searchInput = document.querySelector(".searchInput")
const searchBtn = document.querySelector(".searchBtn")

const pokemon_count = 151

searchBtn.addEventListener("click", () => {
    search.classList.toggle("active")

})

searchInput.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase()
    const pokeNameElements = document.querySelectorAll(".poke-name")
    pokeNameElements.forEach((element) => {
        if (element.innerHTML.toLowerCase().includes(searchText)){
            element.parentElement.parentElement.style.display= "flex"
        }else{
            element.parentElement.parentElement.style.display= "none"
        }
    })
    console.log(filtered)
})

const fetchPokemons = async () => {
    for (let i = 1; i < pokemon_count; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`
        const res = await fetch(url)
        const data = await res.json()
        //console.log(data)
        createPokeCard(data)
    }
}

const createPokeCard = (data) => {
    const pokeId = data.id.toString().padStart(3, "0")
    const pokeType = data.types[0].type.name
    const pokeBg = bg_color[pokeType]

    const pokeDiv = document.createElement("div")
    pokeDiv.classList.add("pokemon")
    pokeDiv.style.backgroundColor = pokeBg

    pokeDiv.innerHTML = `
    <div class="image-container" >
        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeId}.png" alt="pokemon">
    </div>
    <div class="poke-info">
        <h5 class="poke-id">#${pokeId}</h5>
        <h3 class="poke-name">${data.name}</h3>
        <div class="small">
            <small class="poke-exp">
                <i class="fa-solid fa-flask"></i> ${data.base_experience} exp
            </small>
            <small class="poke-weight">
                <i class="fa-solid fa-flask"></i> ${data.weight} kg
            </small>
        </div>
        <div class="poke-type">
            <i class="fa-brands fa-uncharted"></i> ${pokeType}
        </div>
    </div>         
    `
    poke_container.appendChild(pokeDiv)

}

fetchPokemons()

