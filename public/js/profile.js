const newFormHandler = async (event) => {
  event.preventDefault();

  hideElementById('petAddError');

  // set petName variable and assign trimmed string
  const petName = document.getElementById('pet-name').value.trim();

  // set petSpecies and assign dropdown menu value selected
  const dropdownSpecies = document.getElementById('pet-species');
  const petSpecies = dropdownSpecies.options[dropdownSpecies.selectedIndex].value;

  // set petBreed variable and assign trimmed string
  const petBreed = document.getElementById('pet-breed').value.trim();

  // set petSex and assign dropdown menu value selected
  const dropdownSex = document.getElementById('pet-sex');
  const petSex = dropdownSex.options[dropdownSex.selectedIndex].value;

  // set petAge and assign dropdown menu value selected
  const dropdownAge = document.getElementById('pet-age');
  const petAge = dropdownAge.options[dropdownAge.selectedIndex].value;

  // set petSize and assign dropdown menu value selected
  const dropdownSize = document.getElementById('pet-size');
  const petSize = dropdownSize.options[dropdownSize.selectedIndex].value;

  // set petName variable and assign string set to lowercase
  let petCity = document.getElementById('pet-city').value.toLowerCase();

  //TODO: add login_id

  if (petName && petSpecies && petBreed && petSex && petAge && petSize && petCity) {
    const response = await fetch(`/api/pets`, {
      method: 'POST',
      body: JSON.stringify({ petName, petSpecies, petBreed, petSex, petAge, petSize, petCity }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/pets');
    } else {
      alert('Failed to add new pet');
    }
  } else {
    showElementById('petAddError');
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/pets/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/pets');
    } else {
      alert('Failed to delete pet');
    }
  }
};

//utility function to show element by id
function showElementById(element) {
  document.getElementById(element).classList.remove('hidden');
}

//utility function to hide element by id
function hideElementById(element) {
  document.getElementById(element).classList.add('hidden');
}

// event handlers

document.getElementById('new-pet-form').addEventListener('submit', newFormHandler);

// If any pets exist, add an event listener
let petList = document.getElementById('pet-list');
if (petList) {
  petList.addEventListener('click', delButtonHandler);
}
