/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
loadKittens();
ifKittens();

function ifKittens(){
  if (kittens.length > 0){
  document.getElementById("clear-kittens").innerHTML =
  `
  <button onclick="clearKittens()" class="btn-cancel">Clear ${kittens.length} Kittens</button>
  `;
  }
}

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let newKitten ={
    id: generateId(),
    name: form.name.value,
    image: `https://robohash.org/${form.name.value}?set=set4`,
    mood: "Tolerant",
    affection: 5,
  }

  kittens.push(newKitten)
  saveKittens()

  form.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens",JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(localStorage.getItem("kittens"))
  if (kittensData){
    kittens = kittensData
  }
  if(!document.getElementById("welcome")){
    drawKittens();
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let template = ""
  kittens.forEach(kitten => {
    template += `

    <div class="card p-2 text-center bg-dark m-1">
    <div class="card p-2 text-center bg-dark kitten ${kitten.mood}">
    <img class="kitten" src=${kitten.image} height="150" width="150" alt="Missing Kitten">
    </div>
    <div class="mt-2 text-light">

      <div class="d-flex justify-content-center"> Name: ${kitten.name}</div>
      <div class="d-flex justify-content-center"> Mood: ${kitten.mood}</div>
      <div class="d-flex justify-content-center"> Affection: ${kitten.affection}</div>
    </div>

    <div>
          <button onclick="pet('${kitten.id}')">Pet</button>
          <button onclick="catnip('${kitten.id}')">Catnip</button>
    </div>
    </div>
    `
  document.getElementById("kittens").innerHTML = template
  })
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let petRandom = Math.random()
  let chosenKitten = findKittenById(id)
  if (petRandom > 0.7){
    chosenKitten.affection += 1;
  } else{
    chosenKitten.affection -= 1;
  }
  setKittenMood(chosenKitten)
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let chosenKitten = findKittenById(id)
  chosenKitten.affection = 5;
  setKittenMood(chosenKitten)
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  if(kitten.affection <= 0){
    kitten.mood = "gone"
  }
  else if(kitten.affection <= 3){
    kitten.mood = "angry"
  }
  else if(kitten.affection <= 5){
    kitten.mood = "tolerant"
  }
  else{
    kitten.mood = "happy"
  }

  saveKittens()
  drawKittens()
}

function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("add-kitten").classList.remove("hidden");
  loadKittens();
}

function clearKittens(){
  kittens = []
  saveKittens()
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
