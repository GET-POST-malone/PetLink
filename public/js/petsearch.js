const searchedPetCards = document.getElementById('searchedPetCards');

function handleSearchForPetsBtnClick() {
  let cityInput = document.getElementById('cityInput').value.toLowerCase();

  const dropdownSpecies = document.getElementById('dropdownSpecies');
  const speciesSelected = dropdownSpecies.options[dropdownSpecies.selectedIndex].value;

  const dropdownAge = document.getElementById('dropdownAge');
  const ageSelected = dropdownAge.options[dropdownAge.selectedIndex].value;

  const dropdownSex = document.getElementById('dropdownSex');
  const sexSelected = dropdownSex.options[dropdownSex.selectedIndex].value;

  const dropdownSize = document.getElementById('dropdownSize');
  const sizeSelected = dropdownSize.options[dropdownSize.selectedIndex].value;

  searchForPets(cityInput, speciesSelected, ageSelected, sexSelected, sizeSelected);
}

async function searchForPets(cityInput, speciesSelected, ageSelected, sexSelected, sizeSelected) {
  event.preventDefault();

  // set url variable as start of search
  let url = '/api/pets?';

  // set variable for each search parameters and include possibility of empty string
  const city = cityInput || '';
  const species = speciesSelected || '';
  const age = ageSelected || '';
  const sex = sexSelected || '';
  const size = sizeSelected || '';

  // add each query parrameter to the url
  // add the city query parameter: if cityInput is not blank, then add city=searchedcity into the url otherwise return all pets
  url = city !== '' ? (url += `city=${city}&`) : url;
  // add the species query parameter: if speciesSelected is not blank, then add species=searchedspecies into the url otherwise return all pets
  url = species !== '' ? (url += `species=${species}&`) : url;
  // add the age query parameter: if ageSelected is not blank, then add age=ageSelected into the url otherwise return all pets
  url = age !== '' ? (url += `age=${age}&`) : url;
  // add the age query parameter: if ageSelected is not blank, then add age=ageSelected into the url otherwise return all pets
  url = sex !== '' ? (url += `sex=${sex}&`) : url;
  // add the age query parameter: if ageSelected is not blank, then add age=ageSelected into the url otherwise return all pets
  url = size !== '' ? (url += `size=${size}&`) : url;

  // fet to GET pets with city parameter (only city parameter for now)

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    handleResults(data);
  } else {
    alert('Search failed');
  }
}

function handleResults(data) {
  // TODO: clear search div before looping

  // create new route
  // petsearch?ids=1,2,3

  data.forEach(function (petObj) {
    // create the div to hold the pet card
    const newPetDiv = document.createElement('div');

    // create the img element, add the image source link, and append to div
    const newPetImg = document.createElement('IMG');
    newPetImg.src = petObj.image;
    newPetDiv.appendChild(newPetImg);

    // create text node with pet name and append to div
    const petName = document.createTextNode(petObj.name);
    newPetDiv.appendChild(petName);

    // create text node with species and append to div
    const petSpecies = document.createTextNode(petObj.species);
    newPetDiv.appendChild(petSpecies);

    // create text node with breed and append to div
    const petBreed = document.createTextNode(petObj.breed);
    newPetDiv.appendChild(petBreed);

    // create text node with sex and append to div
    const petSex = document.createTextNode(petObj.sex);
    newPetDiv.appendChild(petSex);

    // create text node with age and append to div
    const petAge = document.createTextNode(petObj.age);
    newPetDiv.appendChild(petAge);

    // create text node with size and append to div
    const petSize = document.createTextNode(petObj.size);
    newPetDiv.appendChild(petSize);

    // create text node with city and append to div
    const petCity = document.createTextNode(petObj.city);
    newPetDiv.appendChild(petCity);

    // append the new pet div to the searchedPetCards div
    searchedPetCards.append(newPetDiv);
  });
}

// event handlers
document.getElementById('searchForPetsBtn').addEventListener('click', handleSearchForPetsBtnClick);
