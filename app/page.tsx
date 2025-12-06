"use client"; // Required for useState to work

import React, { useState } from "react";

// I found the 'Rest Countries' API on the GitHub public-apis list.
// It is free, public, and does not require an API key.
// I created this interface to define the data structure I need (Slide 16).
interface Country {
  name: {
    common: string; // The common name of the country
    official: string;
  };
  region: string;
  population: number;
  flags: {
    png: string; // URL for the flag image
    alt: string; // Description for accessibility
  };
}

export default function Home() {
  // --- STATE (Slide 40) ---
  // Stores the user's search input
  const [countryName, setCountryName] = useState<string>("");
  
  // Stores the result from the API
  const [countries, setCountries] = useState<Country[]>([]);
  
  // UX states: loading spinner and error messages
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // This function fetches data when the form is submitted
  const searchCountry = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop page reload

    if (!countryName) return; // Do nothing if input is empty

    // Resetting states before the new search
    setLoading(true);
    setError("");
    setCountries([]);

    try {
      // Using fetch() to connect to the API (Slide 110)
      // I am using the 'name' endpoint to search by country name.
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );

      // Checking for 404 Not Found or other errors
      if (!response.ok) {
        throw new Error("Country not found. Please check your spelling.");
      }

      const data = await response.json();
      setCountries(data); // Updating state with the new data
    } catch (err: any) {
      // If something breaks, show the error message to the user
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  return (
    // Semantic HTML: using 'main' for the primary content
    <main className="container">
      <header>
        <h1>World Country Search 🌍</h1>
        <p>Enter a name to find country details.</p>
      </header>

      {/* Input Section */}
      <section className="search-area">
        <form onSubmit={searchCountry} className="search-form">
          <input
            type="text"
            placeholder="e.g. Canada, Japan..."
            value={countryName}
            // Controlled component: updating state on change
            onChange={(e) => setCountryName(e.target.value)}
            className="input-box"
          />
          <button type="submit" disabled={loading} className="btn-search">
            {loading ? "Loading..." : "Search"}
          </button>
        </form>
        {/* Conditional rendering for errors */}
        {error && <p className="error-text">{error}</p>}
      </section>

      {/* Results Section */}
      <section className="results">
        {/* Mapping through the results array (Slide 33) */}
        {countries.map((country, index) => (
          <article key={index} className="country-card">
            {/* Displaying the flag image */}
            <img 
              src={country.flags.png} 
              alt={country.flags.alt || "Country Flag"} 
              className="flag"
            />
            <div className="info">
              <h2>{country.name.common}</h2>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
