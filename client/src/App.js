import React, { useState, useEffect } from 'react';
import axios from 'axios'
import "./App.css";
// import videos from '../src/data';
import Header from '../src/components/Header';
import Add from '../src/components/Add';
import Card from '../src/components/Card';
import Footer from './components/Footer';



function createCard(video, delete2) {
  return (
    <Card

      clicked={delete2}
      key={video.id}
      id={video.id}
      name={video.title}
      url={video.url}
      rating={video.rating}
    />
  );
}


function App() {


  const [vid, setVid] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/videos')
      .then(res => {
        console.log(res)
        console.log(res.data.data.videos)
        setVid(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);


  //Add a video
  function addVid(newVid) {
    const url = 'http://localhost:5000/videos';

    axios.post(url, newVid)
      .then(res => {
        console.log(res)
        setVid(prevVid => {
          return [res.data, ...prevVid];
        })


      })
  }



  //delete the vid 
  const deleteVid = (id) => {
    console.log(id);
    const index = vid.findIndex(item => item.id === id)
    axios.delete('http://localhost:5000/videos/' + id)

    setVid([...vid.slice(0, index), ...vid.slice(index + 1)])
  }



  return (
    <div className="App">

      <Header handleSearch={setSearch} />

      <Add onAdd={addVid} />

      <div className="main-container">

        {vid.filter((video) => video.title.toLowerCase().includes(search)).map(item => createCard(item, deleteVid))}

      </div>

      <div className='footer'>
        <Footer />
      </div>

    </div>
  );
}

export default App;
