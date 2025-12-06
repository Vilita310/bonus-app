"use client"; // This is required because we are using hooks like useState

import React, { useState } from "react";

// Defining the shape of the API data using an Interface
// This ensures TypeScript knows what fields to expect.
interface University {
  name: string;
  country: string;
  web_pages: string[];
}

export default function Home() {
  // State for the user's input (country name)
  const [search, setSearch] = useState<string>("");
  
  // State to store the list of universities from the API
  const [universities, setUniversities] = useState<University[]>([]);
  
  // UX states for loading and errors
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Function to fetch data from the API
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    if (!search) return;

    setLoading(true);
    setError("");
    setUniversities([]); // Clear previous results

    try {
      // Using the free Hipolabs API (no key required)
      const response = await fetch(
        `https://universities.hipolabs.com/search?country=${search}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (data.length === 0) {
        setError("No universities found. Please check the spelling.");
      } else {
        setUniversities(data);
      }
    } catch (err) {
      setError("Something went wrong with the API connection.");
    } finally {
      // Always turn off loading spinner
      setLoading(false);
    }
  };

  return (
    <main className="container">
      {/* Semantic HTML header */}
      <header className="header">
        <h1>Global University Finder 🎓</h1>
        <p>Enter a country to see a list of universities.</p>
      </header>

      {/* Search Input Section */}
      <section className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="e.g. Canada, Japan, France..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
          />
          <button type="submit" disabled={loading} className="search-btn">
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        {error && <p className="error-text">{error}</p>}
      </section>

      {/* Results Section */}
      <section className="results-section">
        {universities.length > 0 && (
          <p className="result-count">Found {universities.length} universities:</p>
        )}
        
        <ul className="uni-list">
          {/* Mapping through the array to render list items */}
          {universities.map((uni, index) => (
            <li key={index} className="uni-card">
              <h3>{uni.name}</h3>
              <p>📍 {uni.country}</p>
              {/* Checking if web_pages exists before rendering */}
              {uni.web_pages && uni.web_pages[0] && (
                <a href={uni.web_pages[0]} target="_blank" rel="noreferrer">
                  Visit Website &rarr;
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}