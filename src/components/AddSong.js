
import './AddSong.css'
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
function AddSong() {
    const navigate = useNavigate();
  const [songData, setSongData] = useState({
    name: '',
    releaseDate: '',
    artwork: '',
    artists: [],
    rating: 0
  });
  const [image , setImage] = useState('')

  // const HandleImage=()=>{
  //   const data = new FormData();
  //   data.append("file",images)
  //   data.append("upload_present" , "imagedata");
  //   data.append("cloud_name","dml28rdbk");
  //   fetch("https://api.cloudinary.com/v1_1/dml28rdbk/images/upload",
  //   {
  //     method:"post",
  //     body:data
  //   }
  //   )
  //   .then(res => res.json())
  //   .then((data)=>{
  //     setSongData({
  //       ...songData,
  //       images:data.url
  //     })
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // }
  const HandleImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "songdata");
    data.append("cloud_name", "drfg4tq7u");
    fetch("https://api.cloudinary.com/v1_1/drfg4tq7u/upload",
        {
            method: "post",
            body: data
        })
        .then(resp => resp.json())
        .then((data) => {
            setSongData({
            ...songData,
            image: data.url
            })
        })
        .catch((err) => {
            console.log(err)
        });
    };
 
  
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSongData({ ...songData, [name]: value });
  };
  const handleRatingChange = (rating) => {
    setSongData({ ...songData, rating });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(songData),
      });

      if (response.ok) {
        console.log('New song added successfully');

      } else {
        console.error('Error adding song');
      }
    } catch (error) {
      console.error('Error adding song:', error);
    }
  };

  return (
    <div>
      <h2 className='head'>Add a new Song</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='details' htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className='size1'
            value={songData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className='details' htmlFor="releaseDate">Release Date:</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            className='size2'
            value={songData.releaseDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
           {/* <label className='details' htmlFor="image">Artwork:</label>
          <button onClick={HandleImage}>Upload Image</button>
          <input
            type="file"
            id="image"
            name="image"
            className="image"
            onChange={(e)=>setImage(e.target.files[0])}
            
          />  */}
        <label className='details' htmlFor="artwork">Artwork:</label>
          <input
            type="file"
            id="artwork"
            name="artwork"
            accept="image/*"
            className='size3'
            onChange={handleInputChange}
            required/>
        </div>
       
           <div>
           <label className='details1' htmlFor="rating">Rating:</label>
          
            {[1, 2, 3, 4, 5].map((star) => (
              <span 
                key={star}
                className={star <= (hoveredRating || songData.rating) ? 'star-filled' : 'star'}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => handleRatingChange(star)}
              >
              ★ 
              </span>
            ))}
            
            </div>
             <div className='artist'>
          <label className='details' htmlFor="artists">Artists:</label>
          <input
            type="text"
            id="artists"
            name="artists"
            className='size3'
            value={songData.artists}
            onChange={handleInputChange}
            required
          />
       
        <button className="btn" onClick={() => { navigate("/add-artist") }} >+ Add Artist</button>
        </div>
        <button className="btn1" onClick={() => {alert("saved sucessfully");}}>Save</button>

        <button className='btn2' onClick={() => { navigate("/") }}>Cancel</button>

      </form>
    </div>
  );
}

export default AddSong;


