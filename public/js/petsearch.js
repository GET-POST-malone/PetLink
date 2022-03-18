function handleSearchForPetsBtnClick() {
  let cityInput = document.getElementById('cityInput').value.toLowerCase();
  console.log(cityInput);

  const dropdownSpecies = document.getElementById('dropdownSpecies');
  const speciesSelected = dropdownSpecies.options[dropdownSpecies.selectedIndex].value;
  console.log(speciesSelected);

  const dropdownAge = document.getElementById('dropdownAge');
  const ageSelected = dropdownAge.options[dropdownAge.selectedIndex].value;
  console.log(ageSelected);

  const dropdownSex = document.getElementById('dropdownSex');
  const sexSelected = dropdownSex.options[dropdownSex.selectedIndex].value;
  console.log(sexSelected);

  const dropdownSize = document.getElementById('dropdownSize');
  const sizeSelected = dropdownSize.options[dropdownSize.selectedIndex].value;
  console.log(sizeSelected);
}

// event handlers
document.getElementById('searchForPetsBtn').addEventListener('click', handleSearchForPetsBtnClick);
