# WEB103 Project 3 - *Cloud ID Community*

Submitted by: **Brian Brown**

About this web app: **Cloud ID Community is a virtual gathering place for cloud watchers of every kind: backyard skygazers, storm spotters, meteorologists, and atmospheric scientists. An interactive world map marks five of the planet's great cloud-watching spots: Tornado Alley, Burketown (home of the Morning Glory roll cloud), Mount Fuji, Tromsø, and Table Mountain. Click a spot to see the community's events there, from beginner dawn watches to research seminars, each with a live countdown.**

Time spent: **6** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured Events table**
  - [x]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **The web app displays a title.**
- [x] **Website includes a visual interface that allows users to select a location they would like to view.**
  - [x] *Note: A non-visual list of links to different locations is insufficient.* 
- [x] **Each location has a detail page with its own unique URL.**
- [x] **Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location.**

The following **optional** features are implemented:

- [x] An additional page shows all possible events
  - [x] Users can sort *or* filter events by location.
- [x] Events display a countdown showing the time remaining before that event
  - [x] Events appear with different formatting when the event has passed (ex. negative time, indication the event has passed, crossed out, etc.).

The following **additional** features are implemented:

- [x] **Data-driven world map:** coastlines are drawn with `d3-geo`, and each marker is placed from the location's `latitude`/`longitude` in the database using the same projection. Adding a location is a single seed row, with no new routes or hand-placed hotspots.
- [x] Hovering or focusing a map marker highlights its location card (and vice versa). Markers are keyboard-accessible links.
- [x] Event times are shown in **each location's local time zone** (e.g. a 5:30 AM Burketown dawn watch reads 5:30 AM GMT+10 for every visitor).
- [x] **Audience badges** (All levels / Amateur / Professional) so beginners and scientists can find the right events.
- [x] The Events page can **sort by date** (earliest/latest first) and **hide past events**. It also filters by location, and all filters live in the URL (e.g. `/events?location=burketown&upcoming=true`), so filtered views can be bookmarked and shared.
- [x] The live countdown ticks every second from one shared clock. Past events are greyed out, struck through, and marked "Passed", with a "Happened N days ago" label.
- [x] Loading, error, and 404 states on every page (unknown location, unknown URL, server unavailable), so no page ever renders blank.
- [x] Responsive layout from phones to desktops.

## Video Walkthrough

Here's a walkthrough of implemented required features:
<a href="https://vimeo.com/1232914237">Video Walkthrough</a>

<img src='client\public\images\walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ezGIF

## Running Locally

1. `npm install`
2. Create `server/.env` with your Render PostgreSQL credentials: `PGUSER`, `PGPASSWORD`, `PGHOST`, `PGPORT`, `PGDATABASE`
3. `npm run reset` creates and seeds the `locations` and `events` tables
4. `npm run dev` starts Vite (http://localhost:5173) and Express (http://localhost:3000) together

### API

| Endpoint | Returns |
|---|---|
| `GET /api/locations` | All locations |
| `GET /api/locations/:slug` | One location (404 if not found) |
| `GET /api/locations/:slug/events` | Events at that location, soonest first |
| `GET /api/events?location=:slug` | All events (optionally filtered by location), with location name, slug, and time zone |

### Database schema

- **locations**: `id`, `slug` (unique), `name`, `region`, `description`, `signature_clouds`, `image_url`, `latitude`, `longitude`, `timezone`
- **events**: `id`, `location_id` → `locations(id)` (`ON DELETE CASCADE`), `title`, `description`, `host`, `audience` (checked: All levels / Amateur / Professional), `start_time` (`TIMESTAMPTZ`), `image_url`

## Notes

Design decisions, several of them in response to feedback on earlier projects:

- **One source of truth for files.** Client code and assets live only in `client/`. `npm run build` generates `server/public`, which is git-ignored, so nothing is ever hand-copied between client and server.
- **One source of truth for slugs.** Each location's URL slug is stored in the database. The client never builds slugs from names, so links and lookups can't disagree.
- **The router owns routing.** Express serves the API and, in production, sends `index.html` for every other path. React Router maps `/locations/:slug`, `/events`, and a catch-all 404 page. There's no parsing of `window.location` by hand.
- **Defensive data fetching.** A single `fetchJSON` helper checks `response.ok` and surfaces readable errors. A `useApi` hook tracks loading and error state and ignores stale responses.
- **Styling through CSS classes.** Hover highlighting and past-event styling are React state plus CSS classes rather than `element.style` writes.
- Timestamps are stored as `TIMESTAMPTZ` with each location's IANA time zone, so countdowns are exact everywhere and displayed times are local to the event.

Challenges: getting the map markers to line up exactly with the coastlines was solved by using one projection for both. Keeping labels legible on a small phone-sized map led to pins-only markers on narrow screens, with the location cards carrying the names.

### Image credits

Photos from Wikimedia Commons (cropped/resized). Cloud-type photos `cumulonimbus.jpg`, `cumulus.jpg`, `altocumulus.jpg`, and `cirrus.jpg` and the logo are reused from my Week 1 Cloud ID project.

| File | Source | Author | License |
|---|---|---|---|
| `tornado-alley.jpg` | [RaXPol scanning a severe thunderstorm in Oklahoma](https://commons.wikimedia.org/wiki/File:RaXPol_scanning_a_severe_thunderstorm_in_Oklahoma_May_18,_2013.JPG) | Ks0stm | CC BY 4.0 |
| `burketown.jpg` | [Morning Glory cloud, Burketown, from a plane](https://commons.wikimedia.org/wiki/File:MorningGloryCloudBurketownFromPlane.jpg) | Mick Petroff | CC BY-SA 3.0 |
| `mount-fuji.jpg` | [Lenticular clouds on Mount Fuji from Mount Ontake](https://commons.wikimedia.org/wiki/File:Lenticular_clouds_on_Mount_Fuji_from_Mount_Ontake.jpg) | Alpsdake | CC BY-SA 3.0 |
| `tromso.jpg` | [Aeroplane in front of polar stratospheric clouds](https://commons.wikimedia.org/wiki/File:Aeroplane_in_front_of_polar_stratospheric_clouds.jpg) | Christoffer Hjeltnes Støle | CC BY-SA 4.0 |
| `table-mountain.jpg` | [Clouds at Table Mountain](https://commons.wikimedia.org/wiki/File:Clouds_at_Table_Mountain_1.jpg) | shi zhao | CC BY-SA 2.0 |
| `mammatus.png` | [Mammatus clouds, Tulsa, 1973](https://commons.wikimedia.org/wiki/File:Mammatus-clouds-Tulsa-1973.png) | NOAA | Public domain |
| `morning-glory.jpg` | [Morning Glory cloud](https://commons.wikimedia.org/wiki/File:MorningGloryCloud.jpg) | Ulliver at German Wikipedia | Public domain |
| `fuji-sea-of-clouds.jpg` | [Mount Fuji over sea of clouds](https://commons.wikimedia.org/wiki/File:Mount_Fuji_over_Sea_of_clouds.jpg) | Alpsdake | CC BY-SA 4.0 |
| `noctilucent.jpg` | [Noctilucent clouds](https://commons.wikimedia.org/wiki/File:Noctilucent-clouds-msu-6813.jpg) | Matthias Süßen | CC BY-SA 4.0 |
| `nacreous.jpg` | [Polar stratospheric cloud](https://commons.wikimedia.org/wiki/File:Polar_stratospheric_cloud.jpg) | NiclasHohlin | CC0 |
| `tablecloth.jpg` | [Tablecloth cloud effect](https://commons.wikimedia.org/wiki/File:Tablecloth_cloud_effect.jpg) | Caragold | CC BY-SA 4.0 |
| `shelf-cloud.jpg` | [Shelf cloud over Asprovalta](https://commons.wikimedia.org/wiki/File:Shelf_cloud_over_Asprovalta.jpg) | Neptuul | CC BY-SA 4.0 |

Map data: [Natural Earth](https://www.naturalearthdata.com/) (public domain) via [`world-atlas`](https://github.com/topojson/world-atlas).

## License

Copyright [2026] [Brian Brown]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
