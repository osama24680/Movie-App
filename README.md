# CinaFlix 🎬

A movie and TV show discovery app built with React. Browse what's trending, filter movies and series by genre, search across everything, and open any title to see its trailer, cast and similar picks, or any actor to see their biography and filmography — all behind a full authentication flow.

**Live demo:** [cinaflix.pages.dev](https://cinaflix.pages.dev)

## About this project

This project helped me understand how to fetch and handle data from a real REST API, using **12 different TMDB endpoints** for trending titles, discovery, search, genres, details, trailers, cast, similar titles and actor profiles.

It also taught me how to manage a single-page application with **React Router**: keeping state in the URL (category and title routes), and protecting every page so only signed-in users can reach it.

Along the way I gained solid experience with **Joi**, writing strict, field-specific validation for every form, and with the **Context API**, which manages both the movie data and the authentication state across the whole app.

## Features

- **Authentication** — sign up, log in, log out, forgot password (email → reset code → new password), update profile and change password
- **Protected routes** — every page requires login; signed-in users are kept out of the auth pages
- **Trending, Movies and TV Shows** — each category has its own URL (`/home/trending`, `/home/movie`, `/home/tv`)
- **Genre filters** — combine several genres for movies or TV shows
- **Search** — searches movies and TV shows together
- **Title details** — poster, rating, runtime, genres, tagline, overview, YouTube trailer, top cast and similar titles
- **Actor pages** — click any cast member to see their photo, age, birthplace, biography and best-known titles
- **Pagination** across all lists
- **Responsive design** — cinematic hero, glass navbar, rating-coloured poster cards and skeleton loading, from phone to desktop

## Tech stack

| Area | Tools |
|---|---|
| UI | React 18, SCSS |
| Routing | React Router v6 |
| State | Context API |
| Data | Axios, [TMDB API](https://www.themoviedb.org/documentation/api) |
| Auth | [Route e-commerce API](https://ecommerce.routemisr.com) (auth endpoints) |
| Validation | Joi |
| Components | MUI (pagination), Mantine (loader), React Icons |

## TMDB endpoints used

| Endpoint | Used for |
|---|---|
| `/trending/all/day` | Trending list and the hero banner |
| `/discover/movie` | Popular movies, with genre filters |
| `/discover/tv` | Popular TV shows, with genre filters |
| `/search/multi` | Search across movies and TV shows |
| `/genre/movie/list` | Movie genres |
| `/genre/tv/list` | TV genres |
| `/{type}/{id}` | Title details |
| `/{type}/{id}/videos` | Trailer |
| `/{type}/{id}/credits` | Cast |
| `/{type}/{id}/similar` | Similar titles |
| `/person/{id}` | Actor profile |
| `/person/{id}/combined_credits` | Actor's movies and TV shows |

## Getting started

```bash
git clone https://github.com/osama24680/Movie-App.git
cd Movie-App
npm install
npm start
```

The app runs at `http://localhost:3000`. Create an account from the sign-up page to get in. The phone number must be a valid Egyptian mobile number (`01xxxxxxxxx`), as the auth API requires.

### Scripts

| Command | What it does |
|---|---|
| `npm start` | Start the development server |
| `npm run build` | Create a production build in `build/` |
| `npm test` | Run tests |

## Project structure

```
src/
├── Components/
│   ├── Navbar/            # Glass navbar, categories, account menu
│   ├── Header/            # Hero banner (random trending title)
│   ├── Search/            # Search box
│   ├── Generes/           # Genre filter chips
│   ├── Shows/             # Poster grid + skeleton loading
│   ├── Pagination/        # MUI pagination
│   ├── ProtectedRoute/    # Protected and guest-only routes
│   └── Footer/
├── Pages/
│   ├── Home/              # Hero, search, genres and results
│   ├── MovieDetails/      # Title details, trailer, cast, similar
│   ├── Person/            # Actor profile and filmography
│   ├── Auth/              # Shared auth layout, fields and Joi schemas
│   ├── Login/  Signup/  ForgotPassword/  Profile/
│   └── 404/
├── Store/
│   ├── ContextStore.js    # Movies context (TMDB requests)
│   └── AuthContext.js     # Auth context (session, login, profile)
├── lib/rating.js          # Rating colour + year helpers
└── index.css              # Theme tokens and shared styles
```

## Deployment

Hosted on **Cloudflare Pages**, which builds the app from this repository on every push to `main` using `npm run build`, with `build` as the output directory.

---

Movie data and images are provided by [TMDB](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.
