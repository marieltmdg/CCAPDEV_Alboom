const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/userModel");
const Artist = require("../models/artistModel");
const Album = require("../models/albumModel");
const Review = require("../models/reviewModel");
const path = require("path");

const sampleUsers = [
    { 
        username: "Carlegendelosreyes", 
        email: "martin_carlos_r_delosreyes@dlsu.edu.ph", 
        password: "iLoveAldrin",
        picture: path.join("uploads", "martin_carlos_r_delosreyes@dlsu.edu.ph", "1741164454701-carlosdelosreyes.jpg"), 
        bio: "i love aldrin!" ,
        country: "Philippines",
        link: "https://example.com/carlos"
    },
    { 
        username: "MarkGok-San", 
        email: "mark_gokan@dlsu.edu.ph", 
        password: "iamJapanese", 
        picture: path.join("uploads", "mark_gokan@dlsu.edu.ph", "1741173888519-markgokan.jpg"),
        bio: "i love golf!" ,
        country: "Philippines",
        link: "https://example.com/carlos"
    },
    { 
        username: "ZappoTheDragon", 
        email: "izac_manikan@dlsu.edu.ph", 
        password: "Zaragoza", 
        picture: path.join("uploads", "izac_manikan@dlsu.edu.ph", "1741173920904-izacmanikan.jpg"), 
        bio: "i love football!",
        country: "Singapore",
        link: "https://example.com/ZAPPO" 
    },
    { 
        username: "JcTheKid", 
        email: "john_christian_llamas@dlsu.edu.ph", 
        password: "ark_dawn", 
        picture: path.join("uploads", "john_christian_llamas@dlsu.edu.ph", "1741173920904-johnchristianllamas.jpg"),
        bio: "i love carlos!" ,
        country: "USA",
        link: "https://example.com/JC"
    },
    { 
        username: "ItzVolkMC", 
        email: "aldrin_lorenz_g_tigulo@dlsu.edu.ph", 
        password: "iloveIzac", 
        picture: path.join("uploads", "aldrin_lorenz_g_tigulo@dlsu.edu.ph", "1741173920904-aldrinlorenzgtigulo.png"),
        bio: "i love carlos!" ,
        country: "Philippines",
        link: "https://example.com/volk"
    },
];

const sampleArtists = [
    { 
        artistname: "Kendrick Lamar", 
        picture: path.join("uploads", "Kendrick-Lamar", "1741173920904-kendricklamar.jpg"),
        bio: "Visionary rapper and lyricist redefining hip-hop with poetic storytelling and social consciousness.",
        country: "USA", 
        link: "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg",
        email: "kendrick.lamar@musicworld.com",
        password: "HUMBLE_2024!"
    },
    { 
        artistname: "Doechii", 
        picture: path.join("uploads", "Doechii", "1741173920904-doechii.jpg"),
        bio: "Genre-blending artist bringing fierce energy, innovative flows, and a bold artistic vision.",
        country: "USA", 
        link: "https://open.spotify.com/artist/4E2rKHVDssGJm2SCDOMMJB",
        email: "doechii@gmail.com",
        password: "SWAMPQUEEN#99"
    },
    { 
        artistname: "Tyler, The Creator", 
        picture: path.join("uploads", "Tyler,-The-Creator", "1741173920904-tylerthecreator.jpg"),
        bio: "Creative mastermind fusing rap, jazz, and alternative sounds into a world of colorful chaos.",
        country: "USA", 
        link: "https://open.spotify.com/artist/4V8LLVI7PbaPR0K2TGSxFF",
        email: "tyler.creator@gmail.com",
        password: "IGOR_wolfGang42"
    },
    { 
        artistname: "Frank Ocean", 
        picture: path.join("uploads", "Frank-Ocean", "1741173920904-frankocean.png"),
        bio: "Soulful storyteller crafting deep emotional ballads with dreamlike melodies and raw lyricism.",
        country: "USA", 
        link: "https://open.spotify.com/artist/2h93pZq0e7k5yf4dywlkpM",
        email: "frank.ocean@gmail.com",
        password: "NostalgiaUltra_88"
    },
    { 
        artistname: "Billie Eilish", 
        picture: path.join("uploads", "Billie-Eilish", "1741173920904-billieeilish.png"),
        bio: "Whispery vocals, haunting beats, and boundary-pushing pop artistry define her unique sound.",
        country: "USA", 
        link: "https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH",
        email: "billie.eilish@yahoo.com",
        password: "BadGuy$2025!"
    },
];

mongoose.connect("mongodb://127.0.0.1:27017/alboom")
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
                        description: "temp",
                    },
                    { 
                        title: "IGOR", 
                        cover: path.join("uploads", "IGOR", "1741173920904-igor.jpg"),
                        artist_id: artistIds[2],
                        release_date: "May 17, 2019",
                        description: "temp",
                    },
                    { 
                        title: "Chromakopia", 
                        cover: path.join("uploads", "Chromakopia", "1741173920904-chromakopia.jpg"),
                        artist_id: artistIds[2],
                        release_date: "October 28, 2024",
                        description: "temp",
                    },
                    { 
                        title: "Alligator Bites Never Heal", 
                        cover: path.join("uploads", "Alligator-Bites-Never-Heal", "1741173920904-alligatorbitesneverheal.jpg"),
                        artist_id: artistIds[1], 
                        release_date: "August 30, 2024",
                        description: "temp",
                    },
                    { 
                        title: "To Pimp A Butterfly", 
                        cover: path.join("uploads", "To-Pimp-A-Butterfly", "1741173920904-topimpabutterfly.jpg"),
                        artist_id: artistIds[0],
                        release_date: "March 15, 2015",
                        description: "temp",
                    },
                    {
                        title: "Channel Orange",
                        cover: path.join("uploads", "Channel-Orange", "1741173920904-channelorange.jpg"),
                        artist_id: artistIds[3],
                        release_date: "July 10, 2012",
                        description: "temp",
                    },
                    {
                        title: "Hit Me Hard and Soft",
                        cover: path.join("uploads", "Hit-Me-Hard-And-Soft", "1741173920904-hitmehardandsoft.jpg"),
                        artist_id: artistIds[4],
                        release_date: "May 17, 2024",
                        description: "temp",
                    },
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
                                review_text: "I LOVE THIS ALBUM",
                                title: "TEMP",
                                rating: 5,
                                upvotes: 0,
                                downvotes: 0,
                                reply_text: "FUCK U"
                            },
                            { 
                                user_id: userIds[1], 
                                album_id: albumIds[0], 
                                review_text: "I LOVE THIS ALBUM (2)",
                                title: "TEMP",
                                rating: 3,
                                upvotes: 0,
                                downvotes: 0,
                            },
                            { 
                                user_id: userIds[1], 
                                album_id: albumIds[1], 
                                review_text: "Banger album!",
                                title: "TEMP",
                                rating: 5,
                                upvotes: 0,
                                downvotes: 0,
                            },
                            { 
                                user_id: userIds[2], 
                                album_id: albumIds[2], 
                                review_text: "Incredible production!",
                                title: "TEMP",
                                rating: 5,
                                upvotes: 0,
                                downvotes: 0,
                            },
                            { 
                                user_id: userIds[3], 
                                album_id: albumIds[3], 
                                review_text: "This changed my life.",
                                title: "TEMP",
                                rating: 5,
                                upvotes: 0,
                                downvotes: 0,
                            },
                            { 
                                user_id: userIds[4], 
                                album_id: albumIds[4], 
                                review_text: "Masterpiece of our generation.",
                                title: "TEMP",
                                rating: 5,
                                upvotes: 0,
                                downvotes: 0,
                            },
                        ];

                        return Review.deleteMany({})
                            .then(() => Review.insertMany(sampleReviews))
                            .then(reviews => {
                                console.log("Reviews inserted:", reviews.length);
                            });
                    });
            });
    })
    .catch(err => console.error(err))
    .finally(() => mongoose.connection.close());
