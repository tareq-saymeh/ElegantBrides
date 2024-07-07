import React from 'react'
import Navbar from '../Navbar/Navbar'
import image1 from '../images/generate images 09fd8f15-eeb7-4cee-98b1-301aca6ed85f.png'//should change it just for test 

function Home() {
  return (
    <>
    <Navbar/>
    <img src={image1} className="img-flui Home-header" alt="..." />
    </>
  )
}

export default Home