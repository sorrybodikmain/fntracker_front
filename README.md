# FortniteTracker

Fortnite companion web app — player stats, daily item shop, BR map, cosmetics catalog, and in-game news.

## Stack

- **Next.js 16** (App Router)
- **UnoCSS** + custom Creative/Gaming design system
- **next-intl** (EN / RU)
- **FortniteAPI** via `fnapicom`

## Features

- Player stats lookup (Solo / Duo / Trio / Squad)
- Daily item shop with countdown timer
- Cosmetic locker details & shop history
- Interactive Battle Royale map with POI search
- Extended catalog (tracks, cars, LEGO, instruments)
- Profile banners, playlists, upcoming items
- Favorites (local storage)

## Design

Cyberpunk-inspired UI with glassmorphism, neon cyan/magenta accents, Orbitron + DM Sans typography, and responsive bento layouts.

## Development

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
bun run build
bun start
```

## Locales

| Code | Language |
| ---- | -------- |
| en   | English  |
| ru   | Russian  |

Default locale: **en**

## Environment

```env
FORTNITE_API_KEY=your_key
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## License

Fortnite is a registered trademark of Epic Games. This project is not affiliated with Epic Games.
