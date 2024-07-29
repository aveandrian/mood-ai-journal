# AI-Powered Journal Application

This repository contains a NextJS application that serves as a personal journal with AI-powered analysis features. The application analyzes the mood, subject, summary, sentiment, and determines if an entry is negative. It also includes a history page displaying a sentiment graph over time.

## Features

- **Journal Entries:** Create and save journal entries with AI analysis.
- **Mood Analysis:** AI determines the mood of each entry.
- **Subject Identification:** AI identifies the main subject of each entry.
- **Summary Generation:** AI generates a brief summary of each entry.
- **Sentiment Analysis:** AI evaluates the sentiment (positive, negative, neutral) of each entry.
- **Negativity Detection:** AI flags entries that are negative.
- **Sentiment History:** View a graphical representation of sentiment trends over time.

## Tech Stack

- **NextJS:** Framework for the React-based web application.
- **Prisma:** ORM for interacting with the PostgreSQL database.
- **PostgreSQL:** Database for storing journal entries.
- **Langchain & OpenAI:** AI models for analyzing journal entries.
- **Clerk:** Authentication service for user management.
- **Vitest:** Testing framework for unit tests.
