import React, { useState, useEffect } from "react";

const SpotifyEmbed = ({ artist, album }) => {
  const [albumId, setAlbumId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      const clientId = "3104480cf88b471fa921aec9ec53cf94";
      const clientSecret = "1d833695579547ebae4df3d2861e22f9";

      const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
        }),
      });

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      const searchResponse = await fetch(
        `https://api.spotify.com/v1/search?q=album:${encodeURIComponent(album)}%20artist:${encodeURIComponent(artist)}&type=album&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const searchData = await searchResponse.json();
      if (searchData.albums.items.length > 0) {
        setAlbumId(searchData.albums.items[0].id);
      } else {
        setError("Album not found");
      }
    };

    fetchAlbum();
  }, [artist, album]);

  return (
    <div style={{ width: "100%" }}> 
      {error ? (
        <p>{error}</p>
      ) : albumId ? (
        <iframe
          style={{ borderRadius: "12px", width: "100%", display: "block" }}
          src={`https://open.spotify.com/embed/album/${albumId}`}
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SpotifyEmbed;
