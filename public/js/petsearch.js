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
    handleResults(data);
  } else {
    console.log(`Search failed: ${response.statusText}`);
  }
}

function handleResults(data) {
  // clear search div before looping
  document.getElementById('searchedPetCards').innerHTML = '';

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
    newImageCard.appendChild(newImageFigure);
    newImageFigure.classList.add('image', 'is-square');
    const newPetImg = document.createElement('IMG');
    newPetImg.classList.add('of-cover');
    newImageFigure.appendChild(newPetImg);
    // if there is no image provide placeholder
    if (petObj.image === null) {
      petObj.image = '/img/placeholder_no_image_available.png';
    }
    newPetImg.src = petObj.image;

    newPetCard.appendChild(newImageCard);

    // create card-content div to contain content div
    const cardContentDiv = document.createElement('div');
    cardContentDiv.classList.add('card-content', 'p-2');
    newPetCard.appendChild(cardContentDiv);

    // create content div containing all ptags with p-tags with animal details
    const detailCard = document.createElement('div');
    detailCard.classList.add('bgc-peach', 'br-15', 'c-dTeal', 'content', 'has-text-centered', 'has-text-weight-semibold', 'p-3');
    cardContentDiv.append(detailCard);

    // create p element with species and append to div
    const petSpecies = document.createElement('p');
    petSpecies.innerHTML = petObj.species;
    detailCard.appendChild(petSpecies);

    // create p element with breed and append to div
    const petBreed = document.createElement('p');
    petBreed.innerHTML = petObj.breed;
    detailCard.appendChild(petBreed);

    // create p element with sex and append to div
    const petSex = document.createElement('p');
    petSex.innerHTML = petObj.sex;
    detailCard.appendChild(petSex);

    // create p element with age and append to div
    const petAge = document.createElement('p');
    if (petObj.age === 'youngAdult') {
      petObj.age = 'young adult';
    }
    petAge.innerHTML = petObj.age;
    detailCard.appendChild(petAge);

    // create p element with size and append to div
    const petSize = document.createElement('p');
    petSize.innerHTML = petObj.size;
    detailCard.appendChild(petSize);

    // create p element with city and append to div
    const petCity = document.createElement('p');
    petCity.innerHTML = petObj.city;
    detailCard.appendChild(petCity);

    // create a p element with contact email and append to div
    const petOwnerEmail = document.createElement('p');
    petOwnerEmail.innerHTML = petObj.login.email;
    detailCard.appendChild(petOwnerEmail);

    // append detailCard to newPetCard
    newPetCard.append(detailCard);

    // append the new pet div to the searchedPetCards div
    searchedPetCards.append(newPetCard);
  });
}

// event handlers
document.getElementById('searchForPetsBtn').addEventListener('click', handleSearchForPetsBtnClick);
