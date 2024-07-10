import React from 'react'
import Navbar from '../Navbar/Navbar'

import dressimg from '../images/Dress.png'
import Veilsimg from '../images/Veils.png'
import Shoesimg from '../images/Shoes.png'
import Jewelryimg from '../images/jewelry-icon.png'
import Accessoriesimg from '../images/bag.png'
import Flowersimg from '../images/Flowers.png'
import Footer from '../Footer/Footer.js'
import '../../style.css'
import ItemCard from '../ItemCard/ItemCard.js'

import contents from '../Content/Content.js'
// import SearchBar from '../Searchbar/Searchbar.js'

function Home() {
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


<div class="button-container">
  <div class="custom-button">
    <img src={dressimg} alt="Wedding Dress"/>
    <span>Wedding Dress</span>
  </div>
  <div class="custom-button">
    <img src={Accessoriesimg} alt="Accessories"/>
    <span>Accessories</span>
  </div>
  <div class="custom-button">
    <img src={Shoesimg} alt="Shoes"/>
    <span>Shoes</span>
  </div>
  <div class="custom-button">
    <img src={Jewelryimg} alt="Jewerly"/>
    <span>Jewerly</span>
  </div>
  <div class="custom-button">
    <img src={Flowersimg} alt="Flower"/>
    <span>Flower</span>
  </div>
  <div class="custom-button">
    <img src={Veilsimg} alt="Veils"/>
    <span>Veils</span>
  </div>
  
</div>
<hr/>

<h2 className='HomeItemFilter-text'>The Most Wanted</h2>
<hr/>

    <div className="card-container">

    {contents.map(contents => (
                    <ItemCard 
                        key={contents.id}
                        image={contents.image}
                        name={contents.name}
                        price={contents.price}
                        size={contents.size}
                        collection={contents.collection}
                        rating={contents.rating}
                    />
                ))}
                
            </div>
<hr/>
            
<h2 className='HomeItemFilter-text'>New collection</h2>
<hr/>

<div className="card-container">

{contents.map(contents => (
                <ItemCard 
                    key={contents.id}
                    image={contents.image}
                    name={contents.name}
                    price={contents.price}
                    size={contents.size}
                    collection={contents.collection}
                    rating={contents.rating}
                />
            ))}
            
        </div>
<hr/>
        
<h2 className='HomeItemFilter-text'>Suggestions </h2>
<hr/>

<div className="card-container">

{contents.map(contents => (
                <ItemCard 
                    key={contents.id}
                    image={contents.image}
                    name={contents.name}
                    price={contents.price}
                    size={contents.size}
                    collection={contents.collection}
                    rating={contents.rating}
                />
            ))}
            
        </div>
    <Footer/>
    </div>
    
  )
}

export default Home