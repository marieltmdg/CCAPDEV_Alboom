import styles from './AlbumGrid.module.css'

import { Link } from 'react-router-dom'

import theDarkSideOfTheMoon from "../../assets/albums/the-dark-side-of-the-moon.jpg"
import skipp from "../../assets/albums/skipp.jpg"
import chromakopia from "../../assets/albums/chromakopia.jpg"
import flowerBoy from "../../assets/albums/flower-boy.jpg"
import igor from "../../assets/albums/igor.jpg"
import toPimpAButterfly from "../../assets/albums/to-pimp-a-butterfly.jpg"
import channelOrange from "../../assets/albums/channel-orange.jpg"
import letsStartHere from "../../assets/albums/lets-start-here.jpg"
import hmhas from "../../assets/albums/hmhas.jpg"
import sos from "../../assets/albums/sos.jpg"

const albums = [
    {
        title: 'The Dark Side of the Moon',
        cover: theDarkSideOfTheMoon
    },
    {
        title: 'Alligator Bites Never Heal',
        cover: skipp
    },
    {
        title: 'CHROMAKOPIA',
        cover: chromakopia
    },
    {
        title: 'Flower Boy',
        cover: flowerBoy
    },
    {
        title: 'IGOR',
        cover: igor
    },
    {
        title: 'To Pimp A Butterfly',
        cover: toPimpAButterfly
    },
    {
        title: 'channel ORANGE',
        cover: channelOrange
    },
    {
        title: 'Let\'s Start Here',
        cover: letsStartHere
    },
    {   title: 'Hit Me Hard and Soft',
        cover: hmhas
    },
    {   title: 'SOS',
        cover: sos
    }
];

import axios from "axios"
import { useEffect, useState } from "react"

function AlbumGrid() {
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/albums")
            .then(res => setAlbums(res.data))
    }, [])

    return (
        <div className={styles.container}>
            {albums.map(album => (
                <Link to={"/album/" + album.title} key={album.title} className={styles.item}><img src={"http://localhost:3000/" + album.album_cover} alt="" className={styles.cover} /></Link>
            ))}
        </div>
    )
}

export default AlbumGrid