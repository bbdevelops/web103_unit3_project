// Real-world cloud-watching destinations. `slug` is the single source of truth
// for each location's URL — the client never builds slugs itself.
const locationData = [
    {
        slug: 'tornado-alley',
        name: 'Tornado Alley',
        region: 'Norman, Oklahoma, USA',
        description: 'The southern Great Plains, where warm Gulf moisture meets dry desert air and the jet stream, build some of the most photogenic thunderstorms on Earth. Spring evenings bring rotating supercells, wall clouds, and sunsets glowing through mammatus.',
        signature_clouds: 'Supercells, wall clouds, mammatus, shelf clouds',
        image_url: '/images/tornado-alley.jpg',
        latitude: 35.22,
        longitude: -97.44,
        timezone: 'America/Chicago'
    },
    {
        slug: 'burketown',
        name: 'Burketown',
        region: 'Gulf of Carpentaria, Queensland, Australia',
        description: 'Each spring, colliding sea breezes over Cape York send the Morning Glory rolling across the Gulf country at dawn. It is a single tube of cloud that can stretch for 1,000 km, and glider pilots fly out to ride it.',
        signature_clouds: 'Morning Glory roll clouds',
        image_url: '/images/burketown.jpg',
        latitude: -17.74,
        longitude: 139.55,
        timezone: 'Australia/Brisbane'
    },
    {
        slug: 'mount-fuji',
        name: 'Mount Fuji',
        region: 'Honshū, Japan',
        description: 'Moist winds forced over Japan\'s tallest peak form stacked lenticular clouds and the famous kasa-gumo ("umbrella cloud") cap. From nearby summits at dawn, Fuji often rises above a sea of clouds (unkai).',
        signature_clouds: 'Lenticular clouds, kasa-gumo cap clouds, unkai',
        image_url: '/images/mount-fuji.jpg',
        latitude: 35.36,
        longitude: 138.73,
        timezone: 'Asia/Tokyo'
    },
    {
        slug: 'tromso',
        name: 'Tromsø',
        region: 'Troms, Norway',
        description: 'Far above the Arctic Circle, Tromsø sees both of the atmosphere\'s rarest clouds. Iridescent nacreous (polar stratospheric) clouds appear in the deep-winter twilight, and electric-blue noctilucent clouds glow on summer nights.',
        signature_clouds: 'Nacreous (polar stratospheric) clouds, noctilucent clouds',
        image_url: '/images/tromso.jpg',
        latitude: 69.65,
        longitude: 18.96,
        timezone: 'Europe/Oslo'
    },
    {
        slug: 'table-mountain',
        name: 'Table Mountain',
        region: 'Cape Town, South Africa',
        description: 'When the summer south-easter, the "Cape Doctor", pushes moist air up and over the flat summit, an orographic cloud pours down the city-facing cliffs. Locals call it the tablecloth.',
        signature_clouds: 'Orographic "tablecloth" cloud, marine stratocumulus',
        image_url: '/images/table-mountain.jpg',
        latitude: -33.96,
        longitude: 18.40,
        timezone: 'Africa/Johannesburg'
    }
]

export default locationData
