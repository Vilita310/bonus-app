"use client"; // Required for hooks

import React, { useState } from "react";

// Interface for the Country data (Slide 16)
interface Country {
  name: {
    common: string;
    official: string;
  };
  region: string;
  subregion?: string;
  population: number;
  capital?: string[];
  flags: {
    png: string;
    alt: string;
  };
}

export default function Home() {
  // --- STATE (Slide 40) ---
  const [countryName, setCountryName] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // --- API HANDLER ---
  const searchCountry = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!countryName.trim()) return; 

    setLoading(true);
    setError("");
    setCountries([]); 

    try {
      // Fetching from RestCountries API (Free, Public, HTTPS)
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );

      if (!response.ok) {
        throw new Error("Country not found. Try 'USA' or 'Japan'.");
      }

      const data = await response.json();
      setCountries(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-container">
      {/* I wrapped the content in a 'hero' section to center it vertically 
        and make it look like a landing page.
      */}
      <section className="hero-section">
        <h1 className="title">🌍 Global Explorer</h1>
        <p className="subtitle">Discover details about any country in seconds.</p>

        <form onSubmit={searchCountry} className="search-form">
          <input
            type="text"
            placeholder="Type a country name..."
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            className="big-input"
          />
          <button type="submit" disabled={loading} className="big-button">
            {loading ? "..." : "Search"}
          </button>
        </form>

        {error && <div className="error-card">⚠️ {error}</div>}
      </section>

      {/* Results Grid */}
      {countries.length > 0 && (
        <section className="results-container">
          {countries.map((country, index) => (
            <article key={index} className="country-card">
              <div className="flag-wrapper">
                <img 
                  src={country.flags.png} 
                  alt={country.flags.alt} 
                  className="flag-img"
                />
              </div>
              <div className="info-wrapper">
                <h2>{country.name.common}</h2>
                <div className="tags">
                  <span className="tag">{country.region}</span>
                  {country.subregion && <span className="tag secondary">{country.subregion}</span>}
                </div>
                <div className="stats">
                  <p><strong>🏛 Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
                  <p><strong>👥 Population:</strong> {country.population.toLocaleString()}</p>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
