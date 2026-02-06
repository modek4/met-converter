# Metabolic Equivalent of Task (MET) Converter

## 📋 Description

An interactive web application for searching and calculating energy expenditure during physical activities using the MET unit for adults.

## 🛠️ Technology Stack (Work in progress)
- **Data Source**: [Paco Compendium](https://pacompendium.com/)

## 📦 Project Structure (Work in progress)
```
met-converter/
├── public/
│   └── data/               # Static assets and generated datasets
│       ├── debug_raw.txt   # Intermediate raw text from PDF
│       └── met_db.json     # Final JSON database
├── scripts/                # ETL pipeline
│   ├── fetchMET.ts         # Data fetching
│   └── lib/                # Script utilities
│       ├── config.ts       # Environment variables loader
│       ├── parser.ts       # Regex logic text-to-JSON
│       └── types.ts        # Shared interfaces for scripts
├── src/
│   ├── app/                # App Router
│   │   ├── layout.tsx      # Root layout with providers
│   │   └── page.tsx        # Main application entry point
│   ├── components/
│   │   ├── ui/             # "dumb" components
│   │   ├── features/       # "smart" components
│   │   └── layout/         # Structural components
│   ├── hooks/              # Custom hooks
│   │   ├── useSearch.ts    # Fuse.js integration
│   │   └── useCalories.ts  # MET calculation logic
│   ├── lib/                # Core business logic & utilities
│   │   ├── ai/             # "Local AI" for intensity estimation
│   │   ├── search/         # Fuse.js configuration & indexing logic
│   │   └── utils.ts        # Helper functions
│   ├── store/              # Global state management
│   │   └── useStore.ts     # Centralized app state
│   └── types/              # Domain Models
├── .env                    # Template for environment variables
├── .prettierrc             # Code formatting rules
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/modek4/met-converter
cd met-converter
```

2. Install dependencies and sync your data with [Paco Compendium](https://pacompendium.com/)

```bash
npm install
npm run data:sync
```

**🚩 ATTENTION 🚩 Poco Compendium data may be inconsistent**

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## 📄 License
This project uses data from [Paco Compendium](https://pacompendium.com/).