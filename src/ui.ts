// Define the Country interface to represent the structure of a country object
export default interface Country {
    name: {
        common: string;
        official: string;
    };
    capital: string[];
    languages: { [key: string]: string };
    flags: {
        png: string;
        svg: string;
    };
    region: string;
}

// Function to render a list of countries into the HTML document
export function renderCountries(countriesToDisplay: any[]) {
    // Get the container element where countries will be displayed
    const container = document.getElementById('countries') as HTMLDivElement;
    container.innerHTML = ''; // Clear any existing content

    // If no countries to display, show a message
    if (countriesToDisplay.length === 0) {
        container.innerHTML = '<p>No countries found</p>';
        return;
    }

    // Iterate over each country and create its HTML representation
    countriesToDisplay.forEach((country: any) => {
        // Create a div element for the country card
        const countryCard = document.createElement('div');
        countryCard.className = 'country-card';
        
        // Create an img element for the country flag
        const flagImg = document.createElement('img');
        flagImg.src = country.flags.png;
        flagImg.alt = `${country.name.common} flag`;
        
        // Create a div element for the country information
        const countryInfo = document.createElement('div');
        countryInfo.className = 'country-info';
        
        // Create a paragraph element for the country name
        const countryName = document.createElement('p');
        countryName.innerHTML = `<strong>Name:</strong> ${country.name.common}`;
        
        // Create a paragraph element for the country capital(s)
        const capitalInfo = document.createElement('p');
        const capitals = Array.isArray(country.capital) ? country.capital.join(', ') : country.capital || 'N/A';
        capitalInfo.innerHTML = `<strong>Capital:</strong> <span class="capital-list">${capitals}</span>`;
        
        // Create a paragraph element for the country languages
        const languageInfo = document.createElement('p');
        const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
        languageInfo.innerHTML = `<strong>Language:</strong> <span class="language-list">${languages}</span>`;
        
        // Append the country information elements to the country info div
        countryInfo.appendChild(countryName);
        countryInfo.appendChild(capitalInfo);
        countryInfo.appendChild(languageInfo);
        
        // Append the flag image and country info div to the country card
        countryCard.appendChild(flagImg);
        countryCard.appendChild(countryInfo);
        
        // Append the country card to the container
        container.appendChild(countryCard);
    });
}
