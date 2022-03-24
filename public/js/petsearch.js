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
  // clear search div before looping
  document.getElementById('searchedPetCards').innerHTML = '';

  // create new route
  // petsearch?ids=1,2,3

  data.forEach(function (petObj) {
    // create the div to hold the pet card
    const newPetCard = document.createElement('div');
    // add classes to div
    newPetCard.classList.add('bgc-lTeal', 'card', 'column', 'is-one-quarter', 'm-3');

    // create p element with pet name and append to div
    const petName = document.createElement('p');
    petName.classList.add('has-text-centered', 'is-size-3', 'p-2');
    petName.innerHTML = petObj.name;
    newPetCard.appendChild(petName);

    // create an image-card div, create the img element, add the image source link, and append to div
    const newImageCard = document.createElement('div');
    newImageCard.classList.add('card-image');
    const newImageFigure = document.createElement('figure');
    newImageFigure.classList.add('image', 'is-4by3');
    newImageCard.appendChild(newImageFigure);
    const newPetImg = document.createElement('IMG');
    newImageFigure.appendChild(newPetImg);
    // if there is no image provide placeholder
    if (petObj.image === null) {
      petObj.image = '/img/placeholder_no_image_available.png';
    }
    newPetImg.src = petObj.image;

    newPetCard.appendChild(newPetImg);

    // create p element with species and append to div
    const petSpecies = document.createElement('p');
    petSpecies.classList.add('has-text-centered', 'is-size-3', 'p-2');
    petSpecies.innerHTML = petObj.species;
    newPetCard.appendChild(petSpecies);

    // create p element with breed and append to div
    const petBreed = document.createElement('p');
    petBreed.classList.add('has-text-centered', 'is-size-3', 'p-2');
    petBreed.innerHTML = petObj.breed;
    newPetCard.appendChild(petBreed);

    // create p element with sex and append to div
    const petSex = document.createElement('p');
    petSex.classList.add('has-text-centered', 'is-size-3', 'p-2');
    petSex.innerHTML = petObj.sex;
    newPetCard.appendChild(petSex);

    // create p element with age and append to div
    const petAge = document.createElement('p');
    petAge.classList.add('has-text-centered', 'is-size-3', 'p-2');
    if (petObj.age === 'youngAdult') {
      petObj.age = 'young adult';
    }
    petAge.innerHTML = petObj.age;
    newPetCard.appendChild(petAge);

    // create p element with size and append to div
    const petSize = document.createElement('p');
    petSize.classList.add('has-text-centered', 'is-size-3', 'p-2');
    petSize.innerHTML = petObj.size;
    newPetCard.appendChild(petSize);

    // create p element with city and append to div
    const petCity = document.createElement('p');
    petCity.classList.add('has-text-centered', 'is-size-3', 'p-2');
    petCity.innerHTML = petObj.city;
    newPetCard.appendChild(petCity);

    // create a p element with contact email and append to div
    const petOwnerEmail = document.createElement('p');
    petOwnerEmail.classList.add('has-text-centered', 'is-size-3', 'p-2');
    petOwnerEmail.innerHTML = petObj.login.email;
    newPetCard.appendChild(petOwnerEmail);

    // append the new pet div to the searchedPetCards div
    searchedPetCards.append(newPetCard);
  });
}

// event handlers
document.getElementById('searchForPetsBtn').addEventListener('click', handleSearchForPetsBtnClick);
