import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './table.css'
function TopArtists() {

  const [topArtist, setTopArtists] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8081/artists/top-artists';

    axios.get(apiUrl)
      .then((response) => {
        setTopArtists(response.data.artist);
      })
      .catch((error) => {
        console.error('Error fetching top artists:', error);
      });
  }, []);
  const topArtists = [
    {
      id: 1,
      name: 'Artist 1',
      dob: '1990-01-01',
      bio: "",
    },
  ];

  return (
    <div className="top-artists">
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Bio</th>
          </tr>
        </thead>
        <tbody>
          {topArtist.map((artist) => (
            <tr key={artist.id}>
              <td>{artist.name}</td>
              <td>{new Date(artist.dob).toDateString().slice(4)}</td>
              <td>{artist.bio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TopArtists;
