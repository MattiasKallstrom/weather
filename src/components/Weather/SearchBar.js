import React, { useState, useRef, useEffect } from 'react';

const SearchBar = ({ onSearch, recentSearches, error }) => {
  const [city, setCity] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const dropdownRef = useRef(null);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setCity(inputValue);
    if (inputValue) {
      const filtered = recentSearches.filter((search) =>
        search.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    if (city.trim() !== '') {
      onSearch(city);
      setCity('');
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center mb-8 relative">
      <div className="flex justify-center items-center w-full max-w-sm">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter city"
          className="bg-gray-800 text-white py-2 px-4 rounded-l mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          onFocus={() => setShowSuggestions(filteredSuggestions.length > 0)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul
          ref={dropdownRef}
          className="bg-gray-800 text-white rounded shadow-xl absolute top-full mt-2 w-full max-w-sm z-10"
        >
          {filteredSuggestions.map((search, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(search)}
              className="cursor-pointer py-2 px-4 hover:bg-gray-700"
            >
              {search}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
