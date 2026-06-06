# What Should We Eat?

"What Should We Eat?" is a restaurant discovery web app. You can search for nearby restaurants by category and radius, view results on a map, and save favourites for later.

## Tech Stack

- React
- Vite
- React-Bootstrap and Bootstrap
- Google Places API and Google Maps
- localStorage for favourites and reactions

## Setup

Run the setup script for your terminal. Make sure working directory is project root (``path-to/Flerplattform``). It installs dependencies and copies `.env.example` to `.env`.

PowerShell:

```powershell
.\setup.ps1
```

Bash:

```bash
./setup.sh
```

After the script finishes, add your Google Maps API key to `.env`:

```bash
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## Troubleshooting

If your computer cannot run the setup scripts, run the commands directly instead.

PowerShell:

```powershell
npm install
copy .env.example .env
```

Bash:

```bash
npm install
cp -f .env.example .env
```

## Run

Start the development server with:

```bash
npm run dev
```
Open the localhost URL shown in your terminal, which is usually: 
```
http://localhost:5173/
```
