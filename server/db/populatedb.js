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
        picture: path.join("uploads", "martin_carlos_r_delosreyes@dlsu.edu.ph", "1741164454701-carlosdelosreyes.jpg"), 
        bio: "i love aldrin!" ,
        country: "Philippines",
        link: "https://example.com/carlos",
        hash: "0d592f9d72ca387fd54d102ef259848c94690a12b73c4b7c2a91d389409e977f283657ae264e1f2a17d39d8a19c572de6505ef22ad0b567cce45583e06e819f8",
        salt: "a5713a649361ddbcf258d81e449d30f8528adc373589b473d3f2a8f82de16384",
    },
    { 
        username: "paolocruzado", 
        email: "jose_paolo_cruzado@dlsu.edu.ph", 
        picture: path.join("uploads", "jose_paolo_cruzado@dlsu.edu.ph", "1741173888519-paolocruzado.jpg"),
        bio: "i love golf!" ,
        country: "Philippines",
        link: "https://example.com/paolo",
        hash: "02860218002133d40601e07d67e05ab6dde34a5d78f8d72b2d5b1bf5c53a21f9c914e959825c2b1d6b14b136de0b9ebad874fd27edc8eefb44bcf876b74d5e22",
        salt: "9606bcdc8dec5fd651be8eceb194c606f4e7684f3a439fa6ee1322a577fe9ead",
    },
    { 
        username: "notlorenzo", 
        email: "lorenzo_alfred_b_nery@dlsu.edu.ph", 
        picture: path.join("uploads", "lorenzo_alfred_b_nery@dlsu.edu.ph", "1741173920904-lorenzonery.jpg"), 
        bio: "i love football!",
        country: "Singapore",
        link: "https://example.com/no",
        hash: "4f3b881dde296b5f3cfb849b58672f472b6ae124d648c41b3e27bc6985bec4da10542221622936a5e753ae4e5731e81e85f1d4e49b39338ddc65cc5c73439e9c",
        salt: "f91ac3bce40f97172b0b7b257bc25595a76efac81b716714ca2e1f3c70ae63a9",
    },
    { 
        username: "ronalddaws", 
        email: "Dawson_catignas@dlsu.edu.ph", 
        picture: path.join("uploads", "Dawson_catignas@dlsu.edu.ph", "1741173920904-dawsoncatignas.jpg"),
        bio: "i love carlos!" ,
        country: "USA",
        link: "https://example.com/daws",
        hash: "412184afb8f4d0ed9b7c97d0705596e79c489598f5dfaffcb923e54660c9b71b98e7cb56c37e0c638de9e5222c48a864970755ab19042b1da9ab2dd1f448a8f1",
        salt: "9d078809488a39fc9441f3188a9b4a4652c23e4259f59f97ecdbd532a1621d85",
    },
    { 
        username: "marieltamondong", 
        email: "mariel_tamondong_a@dlsu.edu.ph", 
        picture: path.join("uploads", "mariel_tamondong_a@dlsu.edu.ph", "1741173920904-marieltamondong.jpg"),
        bio: "RAH" ,
        country: "Philippines",
        link: "https://example.com/mariel",
        hash: "9520cf08987315a260ab0d22798f873de5a96dc040eb8bc9133454d4e6a5345bb58af13242213ef263296715cc8b5a4c858232763d26371ee990fb65b86cbf4b",
        salt: "a2cf5fe857226676011ec9d75f17f5c2a50c975d011b62576942fcbcf31b49f7",
    },
];

const sampleArtists = [
    { 
        username: "kendrick_lamar", 
        stagename: "Kendrick Lamar",
        picture: path.join("uploads", "Kendrick-Lamar", "1741173920904-kendricklamar.jpg"),
        bio: "Visionary rapper and lyricist redefining hip-hop with poetic storytelling and social consciousness.",
        country: "USA", 
        link: "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg",
        email: "kendrick.lamar@musicworld.com",
        hash: "46fb20d6e8951331b9b3ee498f663c28936aa0cf022709a1aa7f2fe9d6666c112332d9be5985f630948046e1c464b9e9a0cbea951c169309fc86b772c8b79ed0",
        salt: "c5b3ce35b36c8500e468114cf5be60f1512f680f86f10d34fdcd537597f7531f",
    },
    { 
        username: "doechii", 
        stagename: "Doechii",
        picture: path.join("uploads", "Doechii", "1741173920904-doechii.jpg"),
        bio: "Genre-blending artist bringing fierce energy, innovative flows, and a bold artistic vision.",
        country: "USA", 
        link: "https://open.spotify.com/artist/4E2rKHVDssGJm2SCDOMMJB",
        email: "doechii@gmail.com",
        hash: "2107f72b580e8cbd6ddc39c7cc18a1792b2bf5dc54bffc8a90a709999bf26b208e4dcd9ec1cafc59b61dd1da318e756c473f9863ad8f9655b67093c1696e3131",
        salt: "0c55a389d148c2a237336dcad34e0abbacf1c3f7722bf0f1e67b9e13e2444dd8",
    },
    { 
        username: "tyler,_the_creator", 
        stagename: "Tyler, The Creator",
        picture: path.join("uploads", "Tyler,-The-Creator", "1741173920904-tylerthecreator.jpg"),
        bio: "Creative mastermind fusing rap, jazz, and alternative sounds into a world of colorful chaos.",
        country: "USA", 
        link: "https://open.spotify.com/artist/4V8LLVI7PbaPR0K2TGSxFF",
        email: "tyler.creator@gmail.com",
        hash: "40ddcec905a176c5f42ab9b89dff5df85307ba7337fc3711c7f74317e43368efafeeb3bae7f21a04183161a79bc4cb47bbefa6691c94610f8b2dca7296a58c6d",
        salt: "5a4da463bdc91b5cdf372cca60964a6616ddbf9585cfbb6730c86b793a9e111c",
    },
    { 
        username: "frank_ocean", 
        stagename: "Frank Ocean",  
        picture: path.join("uploads", "Frank-Ocean", "1741173920904-frankocean.png"),
        bio: "Soulful storyteller crafting deep emotional ballads with dreamlike melodies and raw lyricism.",
        country: "USA", 
        link: "https://open.spotify.com/artist/2h93pZq0e7k5yf4dywlkpM",
        email: "frank.ocean@gmail.com",
        hash: "85e08ab8a24327329e4f7a956a7f1e89cec30c38aba713325493ff5b0e2adbe9cc0ba35980e41216abb9ded6e72062559278a26490c0dcafecdc5fd587dc698c",
        salt: "44bcb76a62b7d60b4578dcdf1321d0bdc3251316f0a4b4ba96589aac374f9f55",
    },
    { 
        username: "billie_eilish", 
        stagename: "Billie Eilish",
        picture: path.join("uploads", "Billie-Eilish", "1741173920904-billieeilish.png"),
        bio: "Whispery vocals, haunting beats, and boundary-pushing pop artistry define her unique sound.",
        country: "USA", 
        link: "https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH",
        email: "billie.eilish@yahoo.com",
        hash: "5483df63820e7d33aa277b2394bae5335c9558ac886e42bfb8ccc54934a73f941ac1b65a17c9d2f26eea0b405eb47eaca6930b8bed22b05453edafb35b046ee0",
        salt: "cea3652d0bfde4d0e80425f8428fba3343713005a4fc4f21b168f0c69e850ddd",
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
