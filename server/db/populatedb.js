const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/userModel");
const Artist = require("../models/artistModel");
const Album = require("../models/albumModel");
const Review = require("../models/reviewModel");
const ArtistReply = require("../models/artistReplyModel");
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
        picture: path.join("uploads", "mark_gokan@dlsu.edu.ph", "1741173920904-izacmanikan.jpg"), 
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
        email: "aldrin_lorenz_tigulo@dlsu.edu.ph", 
        password: "iloveIzac", 
        picture: path.join("uploads", "aldrin_lorenz_tigulo@dlsu.edu.ph", "1741173920904-aldrinlorenztigulo.png"),
        bio: "i love carlos!" ,
        country: "Philippines",
        link: "https://example.com/volk"
    },
];

const sampleArtists = [
    { 
        name: "Kendrick Lamar", 
        picture: path.join(__dirname, "..", "uploads", "Kendrick-Lamar", "1741173920904-kendricklamar.jpg"),
        bio: "temp bio", 
        location: "USA", 
        link: "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg",
    },
    { 
        name: "Doechii", 
        picture: path.join(__dirname, "..", "uploads", "Doechii", "1741173920904-doechii.jpg"),
        bio: "temp bio", 
        location: "USA", 
        link: "https://open.spotify.com/artist/4E2rKHVDssGJm2SCDOMMJB" 
    },
    { 
        name: "Tyler, The Creator", 
        picture: path.join(__dirname, "..", "uploads", "Tyler,-The-Creator", "1741173920904-tylerthecreator.jpg"),
        bio: "temp bio", 
        location: "USA", 
        link: "https://open.spotify.com/artist/4V8LLVI7PbaPR0K2TGSxFF" 
    },
    { 
        name: "Frank Ocean", 
        picture: path.join(__dirname, "..", "uploads", "Frank-Ocean", "1741173920904-frankocean.png"),
        bio: "temp bio", 
        location: "USA", 
        link: "https://open.spotify.com/artist/2h93pZq0e7k5yf4dywlkpM" 
    },
    { 
        name: "Billie Eilish", 
        picture: path.join(__dirname, "..", "uploads", "Billie-Eilish", "1741173920904-billieeilish.png"),
        bio: "temp bio", 
        location: "USA", 
        link: "https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH" 
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
                        album_cover: path.join("uploads", "Flower-Boy", "1741173920904-flowerboy.jpg"), 
                        artist_id: artistIds[2] 
                    },
                    { 
                        title: "IGOR", 
                        album_cover: path.join("uploads", "IGOR", "1741173920904-igor.jpg"),
                        artist_id: artistIds[2] 
                    },
                    { 
                        title: "Chromakopia", 
                        album_cover: path.join("uploads", "Chromakopia", "1741173920904-chromakopia.jpg"),
                        artist_id: artistIds[2] 
                    },
                    { 
                        title: "Alligator Bites Never Heal", 
                        album_cover: path.join("uploads", "Alligator-Bites-Never-Heal", "1741173920904-alligatorbitesneverheal.jpg"),
                        artist_id: artistIds[1] 
                    },
                    { 
                        title: "To Pimp A Butterfly", 
                        album_cover: path.join("uploads", "To-Pimp-A-Butterfly", "1741173920904-topimpabutterfly.jpg"),
                        artist_id: artistIds[0] 
                    },
                ];

                return Album.deleteMany({})
                    .then(() => Album.insertMany(sampleAlbums))
                    .then(albums => {
                        console.log("Albums inserted:", albums.length);
                        const albumIds = albums.map(album => album._id);

                        const sampleReviews = [
                            { user_id: userIds[0], album_id: albumIds[0], review_text: "I LOVE THIS ALBUM" },
                            { user_id: userIds[1], album_id: albumIds[1], review_text: "Banger album!" },
                            { user_id: userIds[2], album_id: albumIds[2], review_text: "Incredible production!" },
                            { user_id: userIds[3], album_id: albumIds[3], review_text: "This changed my life." },
                            { user_id: userIds[4], album_id: albumIds[4], review_text: "Masterpiece of our generation." },
                        ];

                        return Review.deleteMany({})
                            .then(() => Review.insertMany(sampleReviews))
                            .then(reviews => {
                                console.log("Reviews inserted:", reviews.length);
                                const reviewIds = reviews.map(review => review._id);

                                const sampleArtistReplies = [
                                    { review_id: reviewIds[0], artist_id: artistIds[2], reply_text: "Glad you love it!" },
                                    { review_id: reviewIds[1], artist_id: artistIds[2], reply_text: "Appreciate the support!" },
                                    { review_id: reviewIds[2], artist_id: artistIds[2], reply_text: "Thank you for listening!" },
                                    { review_id: reviewIds[3], artist_id: artistIds[1], reply_text: "That's what we aim for!" },
                                    { review_id: reviewIds[4], artist_id: artistIds[0], reply_text: "Much love!" },
                                ];

                                return ArtistReply.deleteMany({})
                                    .then(() => ArtistReply.insertMany(sampleArtistReplies))
                                    .then(() => console.log("Artist replies inserted"));
                            });
                    });
            });
    })
    .catch(err => console.error(err))
    .finally(() => mongoose.connection.close());
