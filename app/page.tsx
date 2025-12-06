"use client"; // Required for useState hooks

import React, { useState } from "react";

// I found the 'Rest Countries' API on the GitHub public-apis list.
// It is free, public, HTTPS, and Auth: No.

// I updated the interface to include a few more interesting details (Capital, Subregion)
// to make the app look more complete. (Slide 16: Interfaces)
interface Country {
  name: {
    common: string;
    official: string;
  };
  region: string;
  subregion?: string; // Some records might not have this
  population: number;
  capital?: string[]; // Capital is an array, and might be missing for some entries
  flags: {
    png: string;
    alt: string;
  };
}

export default function Home() {
  // --- STATE MANAGEMENT (Slide 40) ---
  const [countryName, setCountryName] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  
  // UX states for a better user experience
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // --- API HANDLER ---
  const searchCountry = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    // Basic validation: don't search if empty
    if (!countryName.trim()) return; 

    setLoading(true);
    setError("");
    setCountries([]); // Clear previous results

    try {
      // Fetching data from the RestCountries API (Slide 110)
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );

      // Handling errors (like 404 Not Found)
      if (!response.ok) {
        throw new Error("Country not found. Please check the spelling.");
      }

      const data = await response.json();
      // We might get multiple results (e.g. searching "United" returns US, UK, UAE...)
      // So I'm storing the whole array.
      setCountries(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    // Semantic HTML structure
    <main className="container">
      <header className="app-header">
        <h1>🌎 Global Explorer</h1>
        <p>Discover facts about countries around the world.</p>
      </header>

      {/* Search Section */}
      <section className="search-container">
        <form onSubmit={searchCountry} className="search-form">
          <input
            type="text"
            // Added better placeholder text for guidance
            placeholder="Enter country name (e.g., Japan, France, Brazil)..."
            value={countryName}
            // Controlled input binding
            onChange={(e) => setCountryName(e.target.value)}
            className="main-input"
          />
          <button type="submit" disabled={loading} className="search-button">
            {loading ? "Searching..." : "Find Country"}
          </button>
        </form>
        
        {/* Error Message Display */}
        {error && <div className="error-message">⚠️ {error}</div>}
      </section>

      {/* Results Section */}
      <section className="results-grid">
        {/* Using map to render the list of countries (Slide 33) */}
        {countries.map((country, index) => (
          <article key={index} className="country-card">
            <div className="flag-container">
              <img 
                src={country.flags.png} 
                alt={country.flags.alt || `Flag of ${country.name.common}`} 
                className="flag-image"
              />
            </div>
            <div className="card-details">
              <h2>{country.name.common}</h2>
              <p className="official-name">{country.name.official}</p>
              
              <div className="stats-grid">
                {/* Using conditional checks for optional fields like capital */}
                <div className="stat-item">
                  <strong>🏛️ Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}
                </div>
                <div className="stat-item">
                  <strong>📍 Region:</strong> {country.region}
                </div>
                <div className="stat-item">
                  <strong>🗺️ Subregion:</strong> {country.subregion || 'N/A'}
                </div>
                <div className="stat-item">
                  <strong>👥 Population:</strong> {country.population.toLocaleString()}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
