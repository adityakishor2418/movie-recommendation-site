#  Movie Explorer

## Introduction

Movie Explorer is a web app for finding and exploring movies. It uses data from The Movie Database (TMDB) API to show trending, popular, top-rated, and upcoming films. I also included a small AI chatbot powered by Groq to help users find movies just by asking.

## Tech Stack

* **Frontend:** React.js (built with Vite)
* **Routing:** React Router (`react-router-dom`)
* **Languages:** HTML, CSS, and JavaScript
* **APIs:** * **TMDB API:** For movie data, posters, and search.
  * **Groq API:** Runs the LLaMA 3 model for the AI chat.

## Features

### 1. Home Page
The front page shows a grid of today's trending movies. It has a simple dark background with yellow accents.

### 2. Movie Categories
The navigation bar has links for "Popular", "Top Rated", and "Upcoming" movies. Under the hood, these all use the same reusable React component to fetch different data based on what you clicked.

### 3. Movie Details
If you click on any movie poster, it takes you to a new page showing the full poster, plot summary, release date, and user rating. 

### 4. Search Bar
There's a search bar at the top of every page. Typing in a movie name updates the URL and brings up a grid of matching search results.

### 5. AI Chat Assistant
There is a floating chat button in the bottom corner. Clicking it opens a small window where you can talk to an AI to get movie recommendations or ask trivia.
