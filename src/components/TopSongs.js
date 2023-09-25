
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './table.css'

function TopSongs() {
  const [newSongs, setTopSongs] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8081/songs/getAllSongs'; 
    axios.get(apiUrl)
      .then((response) => {
        setTopSongs(response.data.songs); 
      })
      .catch((error) => {
        console.error('Error fetching top songs:', error);
      });
  }, []);
  const topSongs = [
    {
      id: 1,
      name: 'Song 1',
      releaseDate: '2023-09-23',
      artwork: 'song1.jpg',
      artists: ['Artist 1', 'Artist 2'],
      rating: 4.5,
    },
  ];

  return (
    <div className="top-songs">
      <table className='table'>
        <thead>
          <tr>
            <th>Artwork</th>
            <th>Song</th>
            <th>Date of Release</th>
            <th>Artist</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {newSongs.map((song) => (
            <tr key={song.id}>
              <td>
                <img src={song.artwork} alt={song.name} />
              </td>
              <td>{song.name}</td>
              <td> {new Date(song.releaseDate).toDateString().slice(4)}</td>
              <td>{song.artists}</td>
              <td>{song.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopSongs;
