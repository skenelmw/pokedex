import '/node_modules/pokemon-font/css/pokemon-font.css';
document.getElementById("sprite").hidden = true
const autoCompletejs = new autoComplete({
  data: {
    src: axios.get("https://pokeapi.co/api/v2/pokemon?limit=964")
    .then(res => {
      const data = res.data.results
      console.log(data)
      return data
    }),
    key: ["name"],
    cache: false
  },
  placeHolder: "Pokemon",
  selector: "#search_field",
  threshold: 2,
  maxResults: 5,
  resultsList: {                       
        render: true,
        container: source => {
            source.setAttribute("id", "pokemon_list");
        },
        destination: document.querySelector("#auto_results"),
        position: "afterend",
        element: "ul"
    },
  resultItem: {                          
      content: (data, source) => {
          source.innerHTML = data.match;
      },
      element: "li"
  },
  onSelection: feedback => {
    document.querySelector("#search_field").value = feedback.selection.value.name
    axios.get(feedback.selection.value.url).then(res => displayPokemonData(res.data))
  }
})
document.querySelector("#search_button").addEventListener("click", (e) => {
  let searchValue = document.querySelector("#search_field").value;

  document.getElementById("pokemon_list").hidden = true

  axios.get("https://pokeapi.co/api/v2/pokemon/" + searchValue ).then((res) => {
    displayPokemonData(res.data)
    
  }).catch((err) => {
    console.log(err);
    document.querySelector("#name").innerText = "Missingno: TRY AGAIN";
    document.querySelector("#search_field").value = "";
  });
});
document.querySelector("#search_field").addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    document.getElementById("search_button").click()
  }
  document.getElementById("pokemon_list").hidden = false
})
function capLetter(a) {
  return a[0].toUpperCase() + a.slice(1)
}
const displayPokemonData = ({ name, id, height, weight, sprites, types }) => {
    document.querySelector("#name").innerText = "NAME: " + capLetter(name)
    document.querySelector("#num").innerText = "DEX NO. " + id;
    document.querySelector("#height").innerText = "HEIGHT: " + height * 10 + " cm";
    document.querySelector("#weight").innerText = "WEIGHT: " + weight / 10 + " kg";
    document.querySelector("#type1").innerText = "TYPE: " + types[0].type.name;
    if (types.length === 2) {
      document.querySelector("#type1").innerText += ", " + types[1].type.name;
    }
    document.querySelector("#sprite").src = sprites.front_default;
    document.getElementById("sprite").hidden = false
}

