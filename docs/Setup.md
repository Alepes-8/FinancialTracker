# FinancialTracker Setup Guide

This document describes how to get *FinancialTracker* up and running locally, how it is structured, and any useful tips for development or building for production.

---

## Table of Contents

1. [What is FinancialTracker](#what-is-financialtracker)  
2. [Prerequisites](#prerequisites)  
3. [Getting the Code](#getting-the-code)  
4. [Project Structure](#project-structure)  
5. [Configuration](#configuration)  
6. [Development Setup](#development-setup)  
7. [Building / Production](#building--production)  
8. [Database](#database)  
9. [Linting / Formatting](#linting--formatting)  
10. [Troubleshooting](#troubleshooting)  
11. [Contributing](#contributing)  

---

## What is FinancialTracker

FinancialTracker is a desktop/web application built with **React + TypeScript + Vite**, intended to track financial transactions (or similar features). It uses SQLite for local storage.

---

## Prerequisites

Make sure you have the following installed:

- Node.js (version 16+ recommended)  
- npm or yarn  
- Git  
- (Optional) [Electron] if targeting native desktop builds  

---

## Getting the Code

    ```bash
    # Clone the repo
    git clone https://github.com/Alepes-8/FinancialTracker.git
    ```

    Navigate into the directory
    cd FinancialTracker

---

## Project Structure

Here’s a high-level view of the repository:

FinancialTracker/
├── src/ # Application source code
│ ├── assets/ # Static assets (images, icons, etc.)
│ ├── database/ # Database file and helper functions for queries
│ ├── electron/ # Backend (Electron) implementation
│ │ ├── preload/ # Secure IPC bridge between frontend and backend
│ │ └── main/ # Sets up IPC channels and manages database communication
│ ├── frontend/ # React components and UI implementation
│ ├── lib/ # Shared libraries and utilities for cleaner imports
│ ├── types/ # TypeScript type definitions (contracts for IPC and data models)
│ ├── app.tsx # Root React component (application entry point)
│ └── main.tsx # Frontend renderer entry point
├── index.html # Base HTML entry point
├── package.json # Project metadata, dependencies, and scripts


src/ — the main TypeScript + React code.
databaseSQLite.db — local database file.
electron-builder.json — config for packaging as native app (if applicable).
eslint.config.js — linting rules.
vite.config.ts — build tool configuration (dev server, build settings).

### Project Communication Pipeline

The system uses an **IPC (Inter-Process Communication) bus principle** to securely connect the frontend and backend, ensuring that sensitive operations and data remain protected. This design enforces clear lines of communication between components, restricting interactions to specific, well-defined calls. The general flow from the frontend to the database follows this sequence:

1. **Frontend Rendering**  
   - `app.tsx` renders the application to the user.  
   - Depending on the context, it loads components such as categories, expenses, and graphs.  

2. **User Input**  
   - The user enters information into the expense report form.  
   - This data is temporarily managed by the frontend’s input field state.  

3. **Submitting Data**  
   - When the user presses the submit button, a request is triggered to the backend to apply the change in the database.  

4. **Type Enforcement**  
   - The call specifies a type defined in `types.d.ts`, which also dictates the expected input format.  
   - This file enforces which communication channels are allowed from the frontend, acting as a contract.  

5. **Preload Mediation**  
   - If the type is valid, `electron/preload/preload.cts` must also permit the communication.  
   - The preload file establishes IPC inputs and outputs for the backend and defines what data each connection can handle.  

6. **Backend Function Call**  
   - With the connection allowed, the backend function (e.g. `sendCreateExpense: (payload) => ...`) is invoked.  

7. **IPC Messaging**  
   - The backend uses `electron.ipcRenderer.send` with the appropriate channel and payload.  
   - The message is received by any **IPC listener** registered for that channel.  
   - For data retrieval (rather than creating or updating records), the call uses an **IPC handler** instead of a listener.  
     - **Listeners**: perform actions, but don’t necessarily return data.  
     - **Handlers**: manage data acquisition and return responses to the caller.  

8. **Resource Manager Routing**  
   - Listeners are defined in `resourceManager.ts`.  
   - This file determines how to handle payloads and forwards valid requests to `dbManager.ts` with the appropriate input data.  

9. **Database Execution**  
   - `dbManager.ts` executes the requested action (e.g. creating a new expense).  

10. **Response Handling**  
    - `dbManager.ts` sends a response back along the same communication channel.  
    - This response includes success confirmation or any errors encountered during database operations.  

---

This IPC bus architecture ensures:  
- **Security**: Only approved communication channels are allowed.  
- **Clarity**: Each layer (frontend, preload, resource manager, database manager) has a well-defined role.  
- **Flexibility**: Both fire-and-forget actions (listeners) and request–response flows (handlers) are supported.  


## Configuration

Before running, you may want to check or adjust:
    - package.json — scripts for start, build, etc.
    - electron-builder.json — if packaging for desktop.
    - Vite config — ports, public path, etc, if needed.
    - SQLite database file — might need to be initialised or seeded.
    
---

## Development Setup

To start development with hot-reload:
    
    npm install
    npm run dev

---

## Building / Production

If you desire to build the app in order to run it localy without having the code running through visual studio or any other tool used to run the code, you can do 
```
    npm run dist:linux  #Run if you are running the code on a linux system
    npm run dist:win    #Run if you are running the code on a window system
    npm run dist:mac    #Run if you are running the code on a apple mac system
```

---

## Database

A SQLite database file databaseSQLite.db is included.
Make sure the file path is correct / accessible for read/write.
If you want to reset the DB, you can remove/rename the file and the app should recreate or re-seed it (if that logic is implemented).

---

## Linting / Formatting

To keep code consistent:

---

## Troubleshooting
| Problem                     | Possible Cause                                                             | Suggested Fix                                                 |
| --------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------- |
| App doesn’t start           | Missing dependencies or wrong Node version                                 | Ensure `node` and `npm` are updated; run `npm install` again  |
| Errors building for desktop | Misconfiguration in `electron-builder.json` or missing native dependencies | Double-check configuration; look for any OS specific settings |
| DB file not writable        | Permission issues or incorrect file path                                   | Check folder permissions; ensure app runs with correct user   |
| TypeScript compile errors   | Invalid types, missing tsconfig settings                                   | Inspect TS config files; maybe adjust `tsconfig.app.json`     |

---