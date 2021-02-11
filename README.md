# Weather Journal App Project

## Table of Contents

* [About](#about)
* [Languages](#languages)
* [Dependencies](#dependencies)
* [Functionality](#functionality)

## About

This project required me to create an asynchronous web app that uses Web API and user data to dynamically update the UI in a Weather Journal application.

## Languages

* JavaScript
* HTML
* CSS

## Dependencies

* Node.js
* NPM
    * Express
    * Body-Parser
    * CORS

## Functionality

Create Weather Journal server:
* POST /add API to add entry
* GET /all API to retrieve all entries
* Serve Weather Journal website
* Log API errors to console

Create Weather Journal website:
* Send journal entry and on success update most recent entry on page
    * Get current temperature for zipcode from openeathermap.com API
    * Post journal entry including temperature and current system date to Weather Journal API
    * Get all journal entries from Weather Journal API
    * Update most recent journal entry on page
* Prevent sending multiple journal entries at once
* Show friendly error message on missing fields or failure
