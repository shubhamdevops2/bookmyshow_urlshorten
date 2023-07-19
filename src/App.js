

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [originalURL, setOriginalURL] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');
  const [reverseShortURL, setReverseShortURL] = useState('');
  const [reverseOriginalURL, setReverseOriginalURL] = useState('');
  const [reverseErrorMessage, setReverseErrorMessage] = useState('');

  const handleURLSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://192.168.0.179:30554/shorten', { url: originalURL });
      setShortenedURL(response.data.shortenedURL);
    } catch (error) {
      console.error('Error submitting URL:', error);
    }
  };

  const handleReverseURLSubmit = async (e) => {
    e.preventDefault();

    const hash = reverseShortURL.split('/').pop();
    console.log("hash value is ->",hash)
    try {
      const response = await axios.get(`http://192.168.0.179:30554/reverse/${hash}`);
      setReverseOriginalURL(response.data.originalURL);
      setReverseErrorMessage('');
    } catch (error) {
      console.error('Error retrieving original URL:', error);
      setReverseOriginalURL('');
      setReverseErrorMessage('Invalid URL');
    }
  };

  return (
    <div className="container">
      <h1 className="title">URL Shortener</h1>

      {/* Shorten URL form */}
      <form onSubmit={handleURLSubmit} className="form">
        <input
          type="text"
          placeholder="Enter the URL"
          value={originalURL}
          onChange={(e) => setOriginalURL(e.target.value)}
          className="url-input"
        />
        <button type="submit" className="submit-button">
          Shorten URL
        </button>
      </form>

      {/* Shortened URL display */}
      {shortenedURL && (
        <div className="result-container">
          <h3 className="result-title">Shortened URL:</h3>
          <a href={originalURL} target="_blank" rel="noopener noreferrer" className="result-link">
          http://localhost:3000/{shortenedURL}
          </a>
        </div>
      )}

      {/* Reverse URL form */}
      <form onSubmit={handleReverseURLSubmit} className="form">
        <input
          type="text"
          placeholder="Enter the shortened URL"
          value={reverseShortURL}
          onChange={(e) => setReverseShortURL(e.target.value)}
          className="url-input"
        />
        <button type="submit" className="submit-button">
          Get Original URL
        </button>
      </form>

      {/* Reverse URL result */}
      {reverseOriginalURL && (
        <div className="result-container">
          <h3 className="result-title">Original URL:</h3>
          <p className="result-text">{reverseOriginalURL}</p>
        </div>
      )}

      {/* Reverse URL error */}
      {reverseErrorMessage && (
        <div className="error-container">
          <p className="error-text">{reverseErrorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default App;

