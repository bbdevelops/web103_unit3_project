// Community events. `location_slug` links each event to a row in locations.js;
// the reset script resolves it to a location_id foreign key.
// start_time is ISO 8601 with the location's local UTC offset.
const eventData = [
    // Tornado Alley
    {
        location_slug: 'tornado-alley',
        title: 'Storm Spotter Basics: Reading a Supercell',
        description: 'Learn to pick out the updraft base, wall cloud, and rear-flank downdraft, and how to report what you see safely and accurately.',
        host: 'Plains Skywatch Collective',
        audience: 'All levels',
        start_time: '2026-03-14T18:30:00-05:00',
        image_url: '/images/cumulonimbus.jpg'
    },
    {
        location_slug: 'tornado-alley',
        title: 'Mammatus at Sunset Photo Walk',
        description: 'Chase the pouch-like mammatus that hang beneath a departing anvil. Bring a wide lens and a tripod. We\'ll cover exposure for golden-hour backlighting.',
        host: 'Red Dirt Cloud Photographers',
        audience: 'Amateur',
        start_time: '2026-06-06T20:00:00-05:00',
        image_url: '/images/mammatus.png'
    },
    {
        location_slug: 'tornado-alley',
        title: 'Fall Season Recap & Dual-Pol Radar Workshop',
        description: 'A hands-on session with archived dual-polarization radar data from this year\'s severe-weather season: hail signatures, debris balls, and storm-mode classification.',
        host: 'Norman Mesoscale Discussion Group',
        audience: 'Professional',
        start_time: '2026-10-17T10:00:00-05:00',
        image_url: '/images/shelf-cloud.jpg'
    },
    {
        location_slug: 'tornado-alley',
        title: 'Spring Supercell Chase Expedition',
        description: 'A guided day on the dryline with forecasting briefings at breakfast and safe positioning on the storm\'s flank. Plan on 300+ miles of driving.',
        host: 'Plains Skywatch Collective',
        audience: 'Amateur',
        start_time: '2027-05-15T13:00:00-05:00',
        image_url: '/images/tornado-alley.jpg'
    },

    // Burketown
    {
        location_slug: 'burketown',
        title: 'Roll Cloud Dynamics: Bores and Sea-Breeze Collisions',
        description: 'An evening seminar on the undular bore theory behind the Morning Glory, with soundings and satellite loops from past seasons.',
        host: 'Gulf Country Atmospheric Society',
        audience: 'Professional',
        start_time: '2026-09-19T19:00:00+10:00',
        image_url: '/images/morning-glory.jpg'
    },
    {
        location_slug: 'burketown',
        title: 'Morning Glory Dawn Watch',
        description: 'Meet at the Burketown wharf before first light. When the humidity and the evening sea breezes line up, the roll cloud arrives from the north-east just after sunrise.',
        host: 'Burketown Cloud Watchers',
        audience: 'All levels',
        start_time: '2026-10-10T05:30:00+10:00',
        image_url: '/images/burketown.jpg'
    },
    {
        location_slug: 'burketown',
        title: 'Gliding the Glory: Pilot & Passenger Briefing',
        description: 'Soaring pilots explain how to ride the lift along the cloud\'s leading edge. A few passenger seats go by lottery.',
        host: 'Gulf Country Soaring Club',
        audience: 'Amateur',
        start_time: '2026-10-24T05:00:00+10:00',
        image_url: '/images/morning-glory.jpg'
    },
    {
        location_slug: 'burketown',
        title: 'Gulf Country Cloud Festival',
        description: 'Food stalls, a kids\' cloud-in-a-jar lab, a sky photography exhibition, and a sunset talk on how to forecast tomorrow\'s Glory.',
        host: 'Burketown Cloud Watchers',
        audience: 'All levels',
        start_time: '2026-11-07T16:00:00+10:00',
        image_url: '/images/cumulus.jpg'
    },

    // Mount Fuji
    {
        location_slug: 'mount-fuji',
        title: 'Lenticular Clouds and Mountain Waves',
        description: 'A lecture on how stable, moist flow over an isolated peak produces stacked lenticular clouds. Includes wave-cloud forecasting from upper-air soundings.',
        host: 'Fuji Mountain Weather Circle',
        audience: 'Professional',
        start_time: '2026-08-22T14:00:00+09:00',
        image_url: '/images/mount-fuji.jpg'
    },
    {
        location_slug: 'mount-fuji',
        title: 'Sunrise Sea-of-Clouds (Unkai) Hike',
        description: 'A pre-dawn ascent to a neighbouring summit to watch Fuji float above a valley-filling sea of stratus. Headlamps required.',
        host: 'Kumo Hikers Tokyo',
        audience: 'All levels',
        start_time: '2026-10-03T04:30:00+09:00',
        image_url: '/images/fuji-sea-of-clouds.jpg'
    },
    {
        location_slug: 'mount-fuji',
        title: 'Kasa-gumo Cap Cloud Photography Weekend',
        description: 'Two days around Lake Kawaguchi waiting for the umbrella cloud. We\'ll talk about the moisture and wind signals that come before it forms, plus composition and long-exposure technique.',
        host: 'Fuji Mountain Weather Circle',
        audience: 'Amateur',
        start_time: '2026-11-21T06:00:00+09:00',
        image_url: '/images/altocumulus.jpg'
    },

    // Tromsø
    {
        location_slug: 'tromso',
        title: 'Noctilucent Cloud Night Watch',
        description: 'Late on a July night, look north for glowing blue-white ripples 80 km up, the highest clouds on Earth. Hot drinks provided.',
        host: 'Tromsø Sky Society',
        audience: 'All levels',
        start_time: '2026-07-18T23:30:00+02:00',
        image_url: '/images/noctilucent.jpg'
    },
    {
        location_slug: 'tromso',
        title: 'Arctic Cloud Sketching Workshop',
        description: 'Slow down and really look. Pencil and watercolour studies of the autumn sky, and no art experience is needed.',
        host: 'Tromsø Sky Society',
        audience: 'All levels',
        start_time: '2026-10-08T18:00:00+02:00',
        image_url: '/images/cirrus.jpg'
    },
    {
        location_slug: 'tromso',
        title: 'Polar Stratospheric Clouds and Ozone Chemistry',
        description: 'A research seminar on PSC types Ia, Ib and II, heterogeneous chlorine activation, and what lidar and satellite records show about Arctic ozone loss.',
        host: 'Arctic Middle Atmosphere Group',
        audience: 'Professional',
        start_time: '2027-01-14T13:00:00+01:00',
        image_url: '/images/nacreous.jpg'
    },
    {
        location_slug: 'tromso',
        title: 'Mother-of-Pearl Sky Walk',
        description: 'A guided midday walk timed for the low winter sun, the best chance to catch iridescent nacreous clouds when the stratosphere is cold enough.',
        host: 'Tromsø Sky Society',
        audience: 'Amateur',
        start_time: '2027-01-23T11:00:00+01:00',
        image_url: '/images/tromso.jpg'
    },

    // Table Mountain
    {
        location_slug: 'table-mountain',
        title: 'Orographic Clouds 101',
        description: 'A friendly introduction to how mountains make clouds: lifting, cooling, condensation, and why the tablecloth vanishes as it spills down the slope.',
        host: 'Cape Cloud Club',
        audience: 'Amateur',
        start_time: '2026-09-12T10:00:00+02:00',
        image_url: '/images/table-mountain.jpg'
    },
    {
        location_slug: 'table-mountain',
        title: 'Marine Stratocumulus Research Roundtable',
        description: 'Researchers compare notes on Benguela upwelling, low-cloud feedbacks, and aerosol–cloud interactions over the South Atlantic.',
        host: 'Southern Ocean Cloud Network',
        audience: 'Professional',
        start_time: '2026-11-14T09:30:00+02:00',
        image_url: '/images/altocumulus.jpg'
    },
    {
        location_slug: 'table-mountain',
        title: 'Tablecloth Watch at Signal Hill',
        description: 'Picnic blankets and binoculars for the first strong south-easter of summer. Watch the tablecloth form and pour over the edge in real time.',
        host: 'Cape Cloud Club',
        audience: 'All levels',
        start_time: '2026-12-05T16:00:00+02:00',
        image_url: '/images/tablecloth.jpg'
    },
    {
        location_slug: 'table-mountain',
        title: 'Cape Doctor Time-lapse Workshop',
        description: 'Set up intervalometers on Lion\'s Head and capture the tablecloth\'s flow over three hours. Includes processing tips for smooth, flicker-free time-lapses.',
        host: 'Cape Cloud Club',
        audience: 'Amateur',
        start_time: '2027-01-09T15:00:00+02:00',
        image_url: '/images/cumulus.jpg'
    }
]

export default eventData
