import React from 'react'
import Navbar from '../Navbar/Navbar'
import image1 from '../images/img1.png'//should change it just for test 
import Footer from '../Footer/Footer.js'
import SearchBar from '../Searchbar/Searchbar.js'

function Home() {
  return (
    <>
    <Navbar/>
    <img src={image1} className="img-flui Home-header" alt="..." />
    <Footer/>
    </>
    
  )
}

export default Home