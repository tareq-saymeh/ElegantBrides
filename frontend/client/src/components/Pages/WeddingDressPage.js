import React from 'react'
import Navbar from '../Navbar/Navbar'

function WeddingDressPage() {
  return (
    <div className='Home-Background'>
        <Navbar/>
        <div className="home-header">
      <div className="home-header-content">
        {/* <div className="home-header-images-1">
          <img src={image1} alt="Left Dress" className="home-header-image" />
        </div> */}
        <div className="home-header-text">
          <h1>Discover the perfect <br/> dress for your special</h1>
          <div className="home-search-bar">
            <input type="text" placeholder="Search for dresses" />
            <button type="button">Search</button>
          </div>
        </div>
        {/* <div className="home-header-images-2">
          <img src={image2} alt="Right Dress" className="home-header-image" />
        </div> */}
      </div>
      
    </div>
    </div>
  )
}

export default WeddingDressPage