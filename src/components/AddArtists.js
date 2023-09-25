import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './AddArtist.css'
import axios from 'axios';


function AddArtists() {

 const navigate = useNavigate();
 const [artistData, setArtistData] = useState({
   name: '',
   dob: '',
   bio: '',

 });

 const handleInputChange = (e) => {
   const { name, value } = e.target;
   setArtistData({ ...artistData, [name]: value });
 };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append('name', artistData.name);
    formData.append('dob', artistData.dob);
    formData.append('bio', artistData.bio);

    const response = await axios.post('http://localhost:8081/artists', {
      "name":artistData.name,
      "dob":artistData.dob,
      "bio":artistData.bio
  }
  )

    console.log(response)


    if (response.ok) {
      console.log('New song added successfully');
    } else {
      console.error('Error adding song');
    }
  } catch (error) {
    console.error('Error adding song:', error);
  }
};
    console.log(artistData)

 return(
 <div className='container'>
      <h2 className='head'>Add Artist</h2><hr/>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='arrange' htmlFor="name">Artist Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className='equal'
            value={artistData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className='arrange' htmlFor="dob">Date Of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dob"
            className='equal1'
            value={artistData.dob}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className='arrange' htmlFor="bio">Bio</label>
          <input
            type="type"
            id="bio"
            name="bio"
            className='equal2'
            value={artistData.bio}
            onChange={handleInputChange}
            required
          />
        </div>


        <button className="btn3" onClick={() => {alert("saved sucessfully");{navigate("/add-artist") }}}>Done</button>

        <button  className="btn4" onClick={() => { navigate("/add-song") }} >Cancel</button>

      </form>
    </div>
 )
}

export default AddArtists;
