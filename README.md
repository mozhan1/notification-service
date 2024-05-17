# Accounts-microservice
# Server-Side Events for Unified Sessions

This Node.js project, built with Fastify, implements a server-side event (SSE) system for Unified Sessions management. It integrates a real-time database through Firebase and uses a custom SSE infrastructure service for real-time client-server communication. It utilizes Firebase Realtime Database for dummy session data storage.

## Features

- **Server-Side Events (SSE):** Establishes a real-time communication channel with clients.
- **Dummy Session Management:** Generates and manages dummy sessions.
- **Firebase Integration:** Utilizes Firebase Realtime Database for session data storage.
- **Error Handling:** Robust error handling for server and API requests.

## Prerequisites

- Node.js installed
- Firebase project setup

## Setup

1. Clone the repository to your local machine.
2. Install dependencies using Yarn install.
3. Use the firebase certificate file to authenticate with Firebase. Put it under root directory and rename it to `firebaseCertificate.json`.
4. Build the project using Yarn build.
5. Bundle the project using Yarn bundle.
6. Start the server using Yarn start. It will be listening on the  http://localhost:3000/events/init
