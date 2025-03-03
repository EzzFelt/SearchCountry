// index.ts
import { getCountries, searchCountries } from "./api.js";
import { renderCountries } from "./ui.js";

// Get references to DOM elements
const regionBtn = document.getElementById('regionBtn') as HTMLButtonElement;
const languageBtn = document.getElementById('languageBtn') as HTMLButtonElement;
const searchInput = document.getElementById('search') as HTMLInputElement;
const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;
const recommendationsDiv = document.getElementById('recommendations') as HTMLDivElement;

let countries: any[] = [];
let currentFilter: 'region' | 'language' | null = null;

// Load countries on page initialization
document.addEventListener('DOMContentLoaded', async () => {
  countries = await getCountries();
  renderCountries(countries); // Display all countries initially
  recommendationsDiv.style.display = 'none';
  showInstructions();
});

// Show instructions to the user
function showInstructions() {
  const container = document.getElementById('countries') as HTMLDivElement;
  container.innerHTML = '<p>Select a filter and search for countries</p>';
}

// Event listener for region button
regionBtn.addEventListener('click', () => {
  currentFilter = 'region';
  languageBtn.classList.remove('selected');
  regionBtn.classList.add('selected');
  searchInput.placeholder = 'Search by region';
  searchInput.value = '';
  recommendationsDiv.style.display = 'none'; 
  showInstructions();
});

// Event listener for language button
languageBtn.addEventListener('click', () => {
  currentFilter = 'language';
  regionBtn.classList.remove('selected');
  languageBtn.classList.add('selected');
  searchInput.placeholder = 'Search by language';
  searchInput.value = '';
  recommendationsDiv.style.display = 'none';
  showInstructions();
});

// Event listener for search button
searchBtn.addEventListener('click', async () => {
  const searchValue = searchInput.value.trim().toLowerCase();

  if (!currentFilter) {
    alert('Please select a filter option (Region or Language)');
    return;
  }
  
  if (searchValue === '') {
    alert('Please enter a search term');
    return;
  }

  const filteredCountries = await searchCountries(searchValue, currentFilter);
  renderCountries(filteredCountries);
});

// Event listener for search input to show recommendations
searchInput.addEventListener('input', () => {
  const value = searchInput.value.trim();
  
  // Only show recommendations if there's input and a filter is selected
  if (value.length > 0 && currentFilter) {
    recommendationsDiv.style.display = 'block';
    
    if (currentFilter === 'region') {
    showRegionRecommendation(value);
    } else if (currentFilter === 'language') {
    showLanguage(value);
    }
  } else {
    recommendationsDiv.style.display = 'none';
  }
});

// Event listener for search input focus
searchInput.addEventListener('focus', () => {
  if (currentFilter && searchInput.value.trim().length > 0) {
    recommendationsDiv.style.display = 'block';
  }
});
  
// Event listener for search input blur
searchInput.addEventListener('blur', () => {
  setTimeout(() => {
    recommendationsDiv.style.display = 'none';
  }, 200);
});

// Show region recommendations based on user input
function showRegionRecommendation(query: string) {
  const regions = new Set(countries.map((country) => country.region.toLowerCase()));
  recommendationsDiv.innerHTML = '';
  
  regions.forEach((region) => {
    if (region.includes(query.toLowerCase())) {
      const suggestion = document.createElement('p');
      suggestion.textContent = region.charAt(0).toUpperCase() + region.slice(1);
      suggestion.addEventListener('click', () => {
        searchInput.value = region;
        recommendationsDiv.style.display = 'none';
        });
      recommendationsDiv.appendChild(suggestion);
    }
  });
}

// Show language recommendations based on user input
function showLanguage(query: string) {
  const languagesSet = new Set<string>();
  
  countries.forEach(country => {
    if (country.languages && typeof country.languages === 'object') {
      Object.values(country.languages).forEach((lang: any) => {
        if (lang && typeof lang === 'string') {
          languagesSet.add(lang.toLowerCase());
        }
      });
    }
  });
  
  recommendationsDiv.innerHTML = '';
  
  languagesSet.forEach((language) => {
    if (language.includes(query.toLowerCase())) {
      const suggestion = document.createElement('p');
      suggestion.textContent = language.charAt(0).toUpperCase() + language.slice(1);
      suggestion.addEventListener('click', () => {
        searchInput.value = language;
        recommendationsDiv.style.display = 'none';
        });
      recommendationsDiv.appendChild(suggestion);
    }
  });
}
