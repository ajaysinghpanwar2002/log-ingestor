# Log Ingestor and Query Interface

This is a logging application built with Node.js, React, Express, and MongoDB for handling and searching logs. The application allows clients to ingest logs and provides an endpoint to search logs based on various criteria.

## Features

- **Ingest Logs:**
  - You can send logs to the server using the `http://localhost:3000/api/logs` endpoint.
  - Logs are processed in batches and stored in the MongoDB database.
  - Batch processing is triggered either when the batch size reaches a specified limit or at regular time intervals.

- **Search Logs:**
  - Clients can search logs using the User Interface.
  - Search parameters include:
    - `searchQuery`: Search for logs containing a specific message.
    - `filters`: Additional filters for log attributes (e.g., level, timestamp).
    - `page`: Pagination for the search results.
    - `limit`: Number of logs per page.
  - Search within specific date ranges (bonus)
  - Utilized regular expressions for search (bonus)
  - Search with multiple filters (bonus)

## Prerequisites

- Node.js installed
- MongoDB installed and running

## Installation

1. Clone the repository:

```bash
git clone https://github.com/dyte-submissions/november-2023-hiring-ajaysinghpanwar2002.git
```
   
2. Install dependencies

```bash
cd client
npm install

cd log-ingestor
npm install
```

3. Copy the .env.example and create a new env file, replace the DATABASE_URL with your database.

```
PORT=3000
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.jrjaog4.mongodb.net/prisma"
```

4. Start the application

```bash
cd client
npm run dev

cd server
npm run dev
```

5. The client will be running at `http://localhost:5173/` and the server at `http://localhost:3000/`

## API Endpoints

1. Ingest Logs

```
POST `http://localhost:3000/api/logs` 
```
- **Example Request body**

```json
[
  {
    "level": "info",
    "message": "Application started",
    "resourceId": "server-001",
    "timestamp": "2023-11-17T09:00:00Z",
    "traceId": "abc-123-xyz",
    "spanId": "span-001",
    "commit": "a1b2c3d4e5f6",
    "metadata": {
      "parentResourceId": "server-000"
    }
  },
  // ... more logs
]

```

2. Search Logs

```
POST `http://localhost:3000/api/search`
```
- **Access using the UI(React)**

## Screenshots

[![landing.png](https://i.postimg.cc/4dzwJTNn/app1.png)](https://postimg.cc/CBxbNX8V)
[![landing.png](https://i.postimg.cc/yxDdm7g8/Screenshot-2023-11-19-024317.png)](https://postimg.cc/CBxbNX8V)
[![landing.png](https://i.postimg.cc/tJ8gD8Wt/Screenshot-2023-11-19-024334.png)](https://postimg.cc/CBxbNX8V)