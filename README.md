# Playwright API Testing

API test suite built with Playwright and TypeScript, testing a live hotel booking REST API.

## What This Project Tests

Full CRUD operations against the Restful Booker API:

- Health check endpoint verification
- GET all bookings returns valid array
- GET single booking returns correct data structure
- POST create booking returns new booking ID
- DELETE booking with authentication token

## Tech Stack

- Playwright - API testing via request context
- TypeScript - strongly typed test code
- Restful Booker API - https://restful-booker.herokuapp.com

## Running the Tests

Install dependencies:

    npm install

Run all tests:

    npx playwright test

View the HTML report:

    npx playwright show-report

## Test Results

- 15 tests passing
- Covers health check, GET, POST and DELETE operations
- Runs across Chromium, Firefox and WebKit

## About

Second project in my QA automation portfolio. Demonstrates API
testing skills alongside the UI automation in my playwright-portfolio
repository. Built as part of my transition from manual QA testing
into test automation.