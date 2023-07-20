
// Installing the  required libraries 
import React, { useState } from 'react';
import axios from 'axios';

// Importing the CSS file
import './App.css';

// Createing the App function to use as a UI and actions performed on the UI
function App() {

  // Creating the required variables
  const [originalURL, setOriginalURL] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');
  const [reverseShortURL, setReverseShortURL] = useState('');
  const [reverseOriginalURL, setReverseOriginalURL] = useState('');
  const [reverseErrorMessage, setReverseErrorMessage] = useState('');

  // This function will be triggered when the user clicks on the Submit button to generate the short URL.
  const handleURLSubmit = async (e) => {
    // To prevent from the auto reload in UI when this function will trigger
    e.preventDefault();

    // try catch block to handle the errors after sending api request
    try {
      
      // In the API POST request, we are sending the request to the handler server along with the original URL
      // since the handler server works on port 3001, the API POST request is directed to the same port by passing the original URL in the request body.
      // We can also use the handler kuberentes service like handler-svc:3001 for the same result
      const response = await axios.post('http://10.104.85.125:3001/shorten', { url: originalURL });
      
      // Storing the result to ShortenURL variable
      setShortenedURL(response.data.shortenedURL);
    } catch (error) {
      console.error('Error submitting URL:', error);
    }
  };

  // This function will trigger once the user clicked on Submit button for getting the original URL from database
  const handleReverseURLSubmit = async (e) => {
    // To prevent from the auto reload in UI when this function will trigger
    e.preventDefault();
    // From the user input, you will obtain the short URL, but you only need the hash key (the unique identifier) to retrieve the original URL from the database. 
    // Other parts of the URL might remain static, such as the domain or base URL, as they are not altered or changed during the process of shortening or redirecting the URL.
    // Example - Short -> http://localhost:3000/dsfnaufn
    //           Original -> https://en.wikipedia.org/wiki/Artificial_intelligence
    //
    // hence we will use the hash keys only like -> dsfnaufn
    const hash = reverseShortURL.split('/').pop();
    
    
    // try catch block to handle the errors after sending api request
    try {

      // In the API POST request, we are sending the request to the handler server along with the shorten hash key path
      // since the handler server works on port 3001, the API POST request is directed to the same port by passing the hash key in parameters
      // We can also use the handler kuberentes service like handler-svc:3001 for the same result
      const response = await axios.get(`http://10.104.85.125:3001/reverse/${hash}`);
      
      // Storing the result to Original URL variable
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

