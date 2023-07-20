# Frontend Application

This application serves as a frontend that communicates exclusively with the handler server. It facilitates the seamless sharing of data with the handler server, which, in turn, manages the storage and retrieval of data in the backend MongoDB database.

Example -

**Input URL ->** https://en.wikipedia.org/wiki/Artificial_intelligence , 
**Output URL ->** http://localhost:3000/70ovli4d


##

# Architecture

- This application is based on the react.js app so it uses 3000 port to access to UI. 
- The UI is primarily composed of two main pages, namely App.js and App.css. For the clarity, we'll focus solely on App.js as it contains the frontend logic, while disregarding other files for now. The App.css is solely responsible for styling the UI.




### App.js

- This file, App.js, plays a pivotal role in both the User Interface (UI) presentation and handling API requests to the handler server. It effectively interacts with the UI buttons to trigger specific actions, subsequently sending the relevant API requests to the handler server.
- Please review the App.js file for detailed comments and explanations to understand the code better

### Dockerimage

- Please refer to the Dockerfile for comments and explanations to gain a deeper understanding.




