const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/userModel");
const Artist = require("../models/artistModel");
const Album = require("../models/albumModel");
const Review = require("../models/reviewModel");
const VoteTransaction = require("../models/voteTransactionModel");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const sampleUsers = [
    { 
        username: "carlegendelosreyes", 
        email: "martin_carlos_r_delosreyes@dlsu.edu.ph", 
        password: "iLoveAldrin",
        picture: path.join("uploads", "martin_carlos_r_delosreyes@dlsu.edu.ph", "1741164454701-carlosdelosreyes.jpg"), 
        bio: "i love aldrin!" ,
        country: "Philippines",
        link: "https://example.com/carlos"
    },
    { 
        username: "paolocruzado", 
        email: "jose_paolo_cruzado@dlsu.edu.ph", 
        password: "iamJapanese", 
        picture: path.join("uploads", "jose_paolo_cruzado@dlsu.edu.ph", "1741173888519-paolocruzado.jpg"),
        bio: "i love golf!" ,
        country: "Philippines",
        link: "https://example.com/paolo"
    },
    { 
        username: "notlorenzo", 
        email: "lorenzo_alfred_b_nery@dlsu.edu.ph", 
        password: "Zaragoza", 
        picture: path.join("uploads", "lorenzo_alfred_b_nery@dlsu.edu.ph", "1741173920904-lorenzonery.jpg"), 
        bio: "i love football!",
        country: "Singapore",
        link: "https://example.com/no" 
    },
    { 
        username: "ronalddaws", 
        email: "Dawson_catignas@dlsu.edu.ph", 
        password: "ark_dawn", 
        picture: path.join("uploads", "Dawson_catignas@dlsu.edu.ph", "1741173920904-dawsoncatignas.jpg"),
        bio: "i love carlos!" ,
        country: "USA",
        link: "https://example.com/daws"
    },
    { 
        username: "marieltamondong", 
        email: "mariel_tamondong_a@dlsu.edu.ph", 
        password: "iloveIzac", 
        picture: path.join("uploads", "mariel_tamondong_a@dlsu.edu.ph", "1741173920904-marieltamondong.jpg"),
        bio: "RAH" ,
        country: "Philippines",
        link: "https://example.com/mariel"
    },
];

const sampleArtists = [
    { 
        username: "kendrick_lamar", 
        picture: path.join("uploads", "Kendrick-Lamar", "1741173920904-kendricklamar.jpg"),
        bio: "Visionary rapper and lyricist redefining hip-hop with poetic storytelling and social consciousness.",
        country: "USA", 
        link: "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg",
        email: "kendrick.lamar@musicworld.com",
        password: "HUMBLE_2024!"
    },
    { 
        username: "doechii", 
        picture: path.join("uploads", "Doechii", "1741173920904-doechii.jpg"),
        bio: "Genre-blending artist bringing fierce energy, innovative flows, and a bold artistic vision.",
        country: "USA", 
        link: "https://open.spotify.com/artist/4E2rKHVDssGJm2SCDOMMJB",
        email: "doechii@gmail.com",
        password: "SWAMPQUEEN#99"
    },
    { 
        username: "tyler,_the_creator", 
        picture: path.join("uploads", "Tyler,-The-Creator", "1741173920904-tylerthecreator.jpg"),
        bio: "Creative mastermind fusing rap, jazz, and alternative sounds into a world of colorful chaos.",
        country: "USA", 
        link: "https://open.spotify.com/artist/4V8LLVI7PbaPR0K2TGSxFF",
        email: "tyler.creator@gmail.com",
        password: "IGOR_wolfGang42"
    },
    { 
        username: "frank_ocean", 
        picture: path.join("uploads", "Frank-Ocean", "1741173920904-frankocean.png"),
        bio: "Soulful storyteller crafting deep emotional ballads with dreamlike melodies and raw lyricism.",
        country: "USA", 
        link: "https://open.spotify.com/artist/2h93pZq0e7k5yf4dywlkpM",
        email: "frank.ocean@gmail.com",
        password: "NostalgiaUltra_88"
    },
    { 
        username: "billie_eilish", 
        picture: path.join("uploads", "Billie-Eilish", "1741173920904-billieeilish.png"),
        bio: "Whispery vocals, haunting beats, and boundary-pushing pop artistry define her unique sound.",
        country: "USA", 
        link: "https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH",
        email: "billie.eilish@yahoo.com",
        password: "BadGuy$2025!"
    },
];

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err))
    .then(() => User.deleteMany({}))
    .then(() => User.insertMany(sampleUsers))
    .then(users => {
        console.log("Users inserted:", users.length);
        const userIds = users.map(user => user._id);

        return Artist.deleteMany({})
            .then(() => Artist.insertMany(sampleArtists))
            .then(artists => {
                console.log("Artists inserted:", artists.length);
                const artistIds = artists.map(artist => artist._id);

                const sampleAlbums = [
                    { 
                        title: "Flower Boy", 
                        cover: path.join("uploads", "Flower-Boy", "1741173920904-flowerboy.jpg"), 
                        artist_id: artistIds[2],
                        release_date: "July 21, 2017",
                        description: "Flower Boy (alternatively titled Scum Fuck Flower Boy) is the fifth studio album by the American rapper and producer Tyler, the Creator, released on July 21, 2017, by Columbia Records. Produced entirely by Tyler, the album features guest vocals from a range of artists, including Frank Ocean, ASAP Rocky, Anna of the North, Lil Wayne, Kali Uchis, Steve Lacy, Estelle, Jaden Smith and Rex Orange County.",
                    },
                    { 
                        title: "IGOR", 
                        cover: path.join("uploads", "IGOR", "1741173920904-igor.jpg"),
                        artist_id: artistIds[2],
                        release_date: "May 17, 2019",
                        description: "Igor is the sixth studio album by American rapper and producer Tyler, the Creator, released on May 17, 2019, through Columbia Records.",
                    },
                    { 
                        title: "Chromakopia", 
                        cover: path.join("uploads", "Chromakopia", "1741173920904-chromakopia.jpg"),
                        artist_id: artistIds[2],
                        release_date: "October 28, 2024",
                        description: "Chromakopia is the eighth studio album by American rapper Tyler, the Creator. It was released through Columbia Records on October 28, 2024, serving as the follow-up to Call Me If You Get Lost (2021).",
                    },
                    { 
                        title: "Alligator Bites Never Heal", 
                        cover: path.join("uploads", "Alligator-Bites-Never-Heal", "1741173920904-alligatorbitesneverheal.jpg"),
                        artist_id: artistIds[1], 
                        release_date: "August 30, 2024",
                        description: "rawr",
                    },
                    { 
                        title: "To Pimp A Butterfly", 
                        cover: path.join("uploads", "To-Pimp-A-Butterfly", "1741173920904-topimpabutterfly.jpg"),
                        artist_id: artistIds[0],
                        release_date: "March 15, 2015",
                        description: "To Pimp a Butterfly is the third studio album by American rapper Kendrick Lamar.",
                    },
                    {
                        title: "Channel Orange",
                        cover: path.join("uploads", "Channel-Orange", "1741173920904-channelorange.jpg"),
                        artist_id: artistIds[3],
                        release_date: "July 10, 2012",
                        description: "STREAM CHANNEL ORANGE!",
                    },
                    {
                        title: "When We All Fall Asleep, Where Do We Go?",
                        cover: path.join("uploads", "When-We-Fall-Asleep", "1741173920904-whenweallfallasleepwheredowego.png"),
                        artist_id: artistIds[4],
                        release_date: "March 29, 2019",
                        description: "So where do we go?",
                    },
                    {
                        title: "Damn",
                        cover: path.join("uploads", "Damn", "1741173920904-damn.png"),
                        artist_id: artistIds[0],
                        release_date: "April 14, 2017",
                        description: "BE HUMBLE!",
                    },
                    {
                        title: "Hit Me Hard And Soft",
                        cover: path.join("uploads", "Hit-Me-Hard-And-Soft", "1741173920904-hitmehardandsoft.png"),
                        artist_id: artistIds[4],
                        release_date: "May 17, 2024",
                        description: "Hit Me Hard and Soft is the third studio album by American singer-songwriter Billie Eilish, released on May 17, 2024, through Darkroom and Interscope Records.",
                    },
                    {
                        title: "Oh The Places You'll Go",
                        cover: path.join("uploads", "Oh-The-Places-Youll-Go", "1741173920904-ohtheplacesyoullgo.jpg"),
                        artist_id: artistIds[1],
                        release_date: "November 27, 2020",
                        description: "Yucky Blucky Fruitcake!",
                    }

                ];

                return Album.deleteMany({})
                    .then(() => Album.insertMany(sampleAlbums))
                    .then(albums => {
                        console.log("Albums inserted:", albums.length);
                        const albumIds = albums.map(album => album._id);

                        const sampleReviews = [
                            { 
                                user_id: userIds[0], 
                                album_id: albumIds[0], 
                                review_text: "I absolutely LOVE this album! Every track is a masterpiece, and I can't get enough of it. The production, the lyrics, the vibe—it all comes together so perfectly. I've had it on repeat, and it just keeps getting better with every listen!",
                                title: "A Timeless Classic",
                                rating: 5,
                                picture: path.join("uploads", "review2", "review2.png"),
                                upvotes: 0,
                                downvotes: 0,
                                reply_text: "Bro, it's just music. Chill. But also… keep going. Damn, you sure you ain't off some psychedelics? Hope your neurons are doin’ alright tho. But nah, I appreciate it. That’s the kinda review that makes me wanna go back in the studio and get even weirder. Respect.",
                                date: new Date("2024-02-15T10:30:00Z")
                            },
                            { 
                                user_id: userIds[1], 
                                album_id: albumIds[0], 
                                review_text: "I LOVE THIS ALBUM (2)",
                                title: "An Underrated Gem",
                                rating: 3,
                                picture: path.join("uploads", "review1", "review1.png"),
                                upvotes: 0,
                                downvotes: 0,
                                date: new Date("2023-12-20T15:45:00Z")
                            },
                            { 
                                user_id: userIds[1], 
                                album_id: albumIds[1], 
                                review_text: "Banger album!",
                                title: "Non-Stop Hits",
                                rating: 5,
                                picture: null,
                                upvotes: 0,
                                downvotes: 0,
                                date: new Date("2024-01-05T08:20:00Z")
                            },
                            { 
                                user_id: userIds[2], 
                                album_id: albumIds[2], 
                                review_text: "Incredible production!",
                                title: "A Sonic Masterpiece",
                                rating: 5,
                                picture: null,
                                upvotes: 0,
                                downvotes: 0,
                                date: new Date("2023-11-10T18:10:00Z")
                            },
                            { 
                                user_id: userIds[3], 
                                album_id: albumIds[3], 
                                review_text: "This changed my life.",
                                title: "Music That Speaks to the Soul",
                                rating: 5,
                                picture: null,
                                upvotes: 0,
                                downvotes: 0,
                                date: new Date("2024-02-01T13:55:00Z")
                            },
                            { 
                                user_id: userIds[4], 
                                album_id: albumIds[4], 
                                review_text: "Masterpiece of our generation.",
                                title: "A Generation-Defining Album",
                                rating: 5,
                                picture: null,
                                upvotes: 0,
                                downvotes: 0,
                                date: new Date("2023-09-25T09:40:00Z")
                            }
                        ];
                        

                        return Review.deleteMany({})
                            .then(() => Review.insertMany(sampleReviews))
                            .then(reviews => {
                                console.log("Reviews inserted:", reviews.length);
                                
                                return VoteTransaction.deleteMany({})
                            });
                    });
            });
    })
    .catch(err => console.error(err))
    .finally(() => mongoose.connection.close());
