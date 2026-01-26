# Metabolic Equivalent of Task (MET) Converter

[Demo](https://modek4.github.io/met-converter)

## 🪐 TODO
- Make data great again [Paco Compendium](https://pacompendium.com/)

An interactive web application for searching and calculating energy expenditure during physical activities using the MET unit.

## 📋 Description

**MET Calculator** is an AI-powered tool that helps users find physical activities and calculate their Metabolic Equivalent of Task (MET). The application supports searching in English (and Polish someday) languages and uses advanced text processing techniques for accurate search matching.

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Data Source**: [Paco Compendium](https://pacompendium.com/)

## 📦 Project Structure

```
src/
├── app/ # Main application component
├── components/ # UI components (Search, Details, Calculator)
├── domain/ # Data types and validation
├── hooks/ # Custom React hooks
├── logic/ # Business logic (search, stemming, tokenization)
└── data/ # Activity data (EN, PL)
```

🧠 Search Algorithms

- **Stemming** - Reducing words to their root forms
- **Tokenization** - Breaking text into tokens
- **Levenshtein Distance** - Measuring text similarity
- **Indexing** - Fast prefix and suffix search

📄 License
This project uses data from [Paco Compendium](https://pacompendium.com/).