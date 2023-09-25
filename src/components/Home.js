
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './table.css';
import SearchIcon from '@mui/icons-material/Search';
import TopSongs from './TopSongs';
import TopArtists from './TopArtists';

function Home() {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    
    const apiUrl = 'http://localhost:8081/songs/getAllSongs'; 
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setSongs(data.data.songs); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = songs.filter((song) =>
      song.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredSongs(filtered);
  };

  return (
    <div>
      <div className='title'>
        <h1>HOME</h1>
        <input
          type='search'
          placeholder='Search'
          className='search-bar'
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <h2>Top 10 Songs</h2>
      <TopSongs songs={searchQuery ? filteredSongs : songs} />
      <h2>Top 10 Artists</h2>
      <TopArtists />
      <center>
        <button className="btn-btn"
          onClick={() => { navigate("/add-song") }} >+Add New Song</button>
      </center>
    </div>
  );
}

export default Home;
