// Function to fetch all countries from the API
export async function getCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    
    try {
        // Parse the response as JSON
        const data = await response.json();
        return data;
    } catch (error) {
        // Log an error message if the fetch fails
        console.log("Erro ao buscar os países", error);
    }
}

// Function to search countries based on a query and filter
export async function searchCountries(query: string, filter: string) {
    // Get the list of all countries
    const countries = await getCountries();
    
    if (filter === 'region') {
        // Filter countries by region
        return countries.filter((country: any) => 
            country.region?.toLowerCase().includes(query.toLowerCase())
        );
    } else if (filter === 'language') {
        // Filter countries by language
        return countries.filter((country: any) => {
            // Check if languages property exists
            if (!country.languages || typeof country.languages !== 'object') return false;
            
            // Try to match any language value
            return Object.values(country.languages).some((language: any) => 
                language && typeof language === 'string' && 
                language.toLowerCase().includes(query.toLowerCase())
            );
        });
    } else {
        // Return an empty array if the filter is not recognized
        return [];
    }
}