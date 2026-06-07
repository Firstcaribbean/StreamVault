const palette = ['1a1a2e/7C3AED', '101020/F59E0B', '0f172a/38bdf8', '1f102f/f472b6', '121212/f8fafc']

const seedTitles = [
  ['Inception', 2010, 8.8, ['Sci-Fi', 'Thriller'], 'Netflix', '4K', '2h 28m', 'A dream extraction specialist accepts one last impossible job: planting an idea inside a guarded mind.'],
  ['The Dark Knight', 2008, 9.0, ['Action', 'Drama'], 'HBO', 'TOP 10', '2h 32m', 'Gotham faces a criminal mastermind who turns order, loyalty, and heroism into dangerous games.'],
  ['Interstellar', 2014, 8.7, ['Sci-Fi', 'Drama'], 'Prime', 'HD', '2h 49m', 'Explorers cross a wormhole to find humanity a new home before Earth becomes uninhabitable.'],
  ['Black Panther', 2018, 7.3, ['Action', 'Sci-Fi'], 'Disney+', 'FREE', '2h 14m', 'A newly crowned king must defend Wakanda from a challenger with a global revolution in mind.'],
  ['Stranger Things', 2016, 8.7, ['Sci-Fi', 'Horror'], 'Netflix', 'NEW', '4 seasons', 'Kids in Hawkins uncover secret experiments, shadow dimensions, and a bond stronger than fear.'],
  ['The Boys', 2019, 8.7, ['Action', 'Comedy'], 'Prime', '4K', '4 seasons', 'A vigilante team exposes celebrity superheroes whose power has corrupted every institution around them.'],
  ['The Mandalorian', 2019, 8.6, ['Sci-Fi', 'Action'], 'Disney+', 'HD', '3 seasons', 'A lone bounty hunter protects a mysterious child while navigating the outer rim.'],
  ['Parasite', 2019, 8.5, ['Drama', 'Thriller'], 'Hulu', 'TOP 10', '2h 12m', 'Two families become entangled in a biting story of class, deception, and consequence.'],
  ['Dune', 2021, 8.0, ['Sci-Fi', 'Drama'], 'HBO', '4K', '2h 35m', 'A gifted heir enters a desert world where spice, prophecy, and empire collide.'],
  ['Everything Everywhere All at Once', 2022, 7.8, ['Comedy', 'Sci-Fi'], 'Prime', 'NEW', '2h 19m', 'A laundromat owner discovers that every version of herself may be needed to save existence.'],
  ['Coco', 2017, 8.4, ['Kids', 'Drama'], 'Disney+', 'FREE', '1h 45m', 'A young musician journeys through the Land of the Dead to uncover his family story.'],
  ['The Crown', 2016, 8.6, ['Drama', 'Documentary'], 'Netflix', 'HD', '6 seasons', 'A sweeping chronicle of duty, politics, and private cost inside a modern monarchy.'],
  ['Jack Ryan', 2018, 8.0, ['Action', 'Thriller'], 'Prime', '4K', '4 seasons', 'A CIA analyst follows suspicious money trails into high-stakes global threats.'],
  ['Loki', 2021, 8.2, ['Sci-Fi', 'Comedy'], 'Disney+', 'TOP 10', '2 seasons', 'The god of mischief confronts timelines, variants, and the burden of free will.'],
  ['The Bear', 2022, 8.6, ['Drama', 'Comedy'], 'Hulu', 'NEW', '3 seasons', 'A fine-dining chef returns home to rebuild a family sandwich shop and himself.'],
  ['House of the Dragon', 2022, 8.4, ['Drama', 'Action'], 'HBO', '4K', '2 seasons', 'A dynasty fractures as dragonriders turn succession into fire and blood.'],
  ['Narcos', 2015, 8.8, ['Drama', 'Thriller'], 'Netflix', 'HD', '3 seasons', 'Agents and cartels wage a relentless war through Colombia’s cocaine empire.'],
  ['Reacher', 2022, 8.1, ['Action', 'Thriller'], 'Prime', 'FREE', '2 seasons', 'A drifter with military instincts uncovers conspiracies in towns that underestimate him.'],
  ['Moana', 2016, 7.6, ['Kids', 'Adventure'], 'Disney+', 'HD', '1h 47m', 'A fearless voyager sails beyond the reef to restore balance to her island.'],
  ['Shōgun', 2024, 8.7, ['Drama', 'Thriller'], 'Hulu', 'TOP 10', '1 season', 'A shipwrecked pilot enters a world of strategy, honor, and looming civil war in Japan.'],
  ['Blade Runner 2049', 2017, 8.0, ['Sci-Fi', 'Thriller'], 'HBO', '4K', '2h 44m', 'A replicant officer uncovers a secret that could transform the future of humanity.'],
  ['Arcane', 2021, 9.0, ['Anime', 'Action'], 'Netflix', 'NEW', '2 seasons', 'Sisters on opposite sides of a divided city become symbols in a technological uprising.'],
  ['The Expanse', 2015, 8.5, ['Sci-Fi', 'Drama'], 'Prime', 'HD', '6 seasons', 'A crew uncovers a conspiracy that could ignite war across Earth, Mars, and the Belt.'],
  ['WandaVision', 2021, 7.9, ['Sci-Fi', 'Drama'], 'Disney+', 'FREE', '1 season', 'A suburban sitcom reality hides grief, magic, and a dangerous unraveling truth.'],
  ['Alien', 1979, 8.5, ['Horror', 'Sci-Fi'], 'Hulu', '4K', '1h 57m', 'A commercial crew answers a distress signal and brings terror aboard their ship.'],
  ['Succession', 2018, 8.9, ['Drama', 'Comedy'], 'HBO', 'TOP 10', '4 seasons', 'A media dynasty’s heirs turn family loyalty into the most brutal corporate battlefield.'],
  ['Money Heist', 2017, 8.2, ['Action', 'Thriller'], 'Netflix', 'HD', '5 seasons', 'A mastermind recruits specialists for impossible heists wrapped in ideology and red jumpsuits.'],
  ['The Tomorrow War', 2021, 6.6, ['Action', 'Sci-Fi'], 'Prime', 'FREE', '2h 18m', 'Present-day civilians are drafted into a future conflict against a devastating alien species.'],
  ['Encanto', 2021, 7.2, ['Kids', 'Comedy'], 'Disney+', 'NEW', '1h 42m', 'A magic family’s only ordinary daughter may be the key to saving their miracle.'],
  ['Nomadland', 2020, 7.3, ['Drama'], 'Hulu', 'HD', '1h 47m', 'A woman travels the American West, finding resilience and community outside conventional life.'],
  ['The Last of Us', 2023, 8.7, ['Drama', 'Horror'], 'HBO', '4K', '1 season', 'A hardened survivor escorts a teen across a broken America shaped by infection and loss.'],
  ['Wednesday', 2022, 8.1, ['Comedy', 'Horror'], 'Netflix', 'TOP 10', '1 season', 'A gothic teen detective solves murders and mysteries at a school for outcasts.'],
  ['The Marvelous Mrs. Maisel', 2017, 8.7, ['Comedy', 'Drama'], 'Prime', 'HD', '5 seasons', 'A 1950s housewife transforms heartbreak into a sharp stand-up comedy career.'],
  ['Avatar', 2009, 7.9, ['Sci-Fi', 'Action'], 'Disney+', '4K', '2h 42m', 'On Pandora, a former marine discovers belonging among the Na’vi and chooses a side.'],
  ['Prey', 2022, 7.1, ['Action', 'Horror'], 'Hulu', 'NEW', '1h 40m', 'A Comanche warrior faces a technologically advanced hunter stalking the Great Plains.'],
  ['Dunkirk', 2017, 7.8, ['Drama', 'Action'], 'HBO', 'FREE', '1h 46m', 'Soldiers, pilots, and civilians converge in a tense evacuation under relentless pressure.'],
  ['The Queen’s Gambit', 2020, 8.5, ['Drama'], 'Netflix', '4K', '1 season', 'A chess prodigy battles addiction, isolation, and masters across a male-dominated world.'],
  ['Good Omens', 2019, 8.0, ['Comedy', 'Fantasy'], 'Prime', 'TOP 10', '2 seasons', 'An angel and demon team up to prevent apocalypse because they rather like Earth.'],
  ['Toy Story', 1995, 8.3, ['Kids', 'Comedy'], 'Disney+', 'HD', '1h 21m', 'A cowboy doll and a flashy space ranger learn friendship when their world changes.'],
  ['Drive My Car', 2021, 7.5, ['Drama', 'International'], 'HBO', 'NEW', '2h 59m', 'A grieving theater director builds unexpected trust with the quiet chauffeur assigned to him.'],
  ['Attack on Titan', 2013, 9.1, ['Anime', 'Action'], 'Hulu', 'TOP 10', '4 seasons', 'Humanity fights towering monsters while uncovering devastating truths behind the walls.'],
  ['Roma', 2018, 7.7, ['Drama', 'International'], 'Netflix', 'FREE', '2h 15m', 'A domestic worker’s year unfolds against intimate family change and national unrest in Mexico City.']
]

export const movies = seedTitles.map((movie, index) => {
  const [title, year, rating, genre, platform, badge, runtime, synopsis] = movie
  const color = palette[index % palette.length]
  return {
    id: index + 1,
    title,
    year,
    rating,
    genre,
    platform,
    badge,
    runtime,
    synopsis,
    cast: ['Maya Sterling', 'Julian Cross', 'Ari Okafor', 'Nina Vale'].slice(0, 2 + (index % 3)),
    thumbnail: `https://placehold.co/300x450/${color}.png?text=${encodeURIComponent(title)}`,
    backdrop: `https://placehold.co/1600x900/${color}.png?text=${encodeURIComponent(title)}`,
    isTrending: index % 3 === 0 || rating >= 8.7,
    isNew: year >= 2021 || badge === 'NEW',
    progress: index % 5 === 0 ? 18 + ((index * 11) % 75) : 0,
  }
})

export const featured = [movies[0], movies[8], movies[21], movies[30]].map((item, i) => ({
  ...item,
  heroTint: ['from-vault/35 via-obsidian to-molten/20', 'from-amber-700/30 via-obsidian to-violet-800/30', 'from-sky-700/25 via-obsidian to-vault/35', 'from-emerald-700/25 via-obsidian to-red-900/30'][i],
}))

export const rowDefinitions = [
  ['Continue Watching', movies.filter((item) => item.progress > 0)],
  ['🔥 Trending Now', movies.filter((item) => item.isTrending)],
  ['🎬 New Releases', movies.filter((item) => item.isNew)],
  ['⭐ Top Rated on StreamVault', [...movies].sort((a, b) => b.rating - a.rating).slice(0, 16)],
  ['🎭 From Netflix Originals', movies.filter((item) => item.platform === 'Netflix')],
  ['🚀 From Prime Video', movies.filter((item) => item.platform === 'Prime')],
  ['🏰 From Disney+ Vault', movies.filter((item) => item.platform === 'Disney+')],
  ['🎯 Recommended For You · AI-personalized', movies.filter((_, index) => index % 2 === 0).slice(0, 18)],
  ['🌍 International & Award-Winning', movies.filter((item) => item.genre.includes('International') || item.rating >= 8.5)],
]

export const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror', 'Romance', 'Thriller', 'Anime', 'Documentary', 'Kids']
export const platforms = ['All', 'Netflix', 'Prime', 'Disney+', 'Hulu', 'HBO']
