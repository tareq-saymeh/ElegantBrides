import React, { useState, useEffect } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import Filter from '../Filter/Filter';
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Footer/Footer.js';
import axios from 'axios';

function AccessoriesPage() {
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState({ size: '', brand: '' });
    const [search, setSearch] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1550);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 720);
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'ar';
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/custom/get-customization');
            const bodycolor= response.data.backgroundColor;
    
            const header = document.querySelector('.Home-Background'); 
                  if (header) {
            header.style.backgroundColor = bodycolor; 
          }
          const body = document.querySelector('.home-header'); 
          if (body) {
            body.style.backgroundColor = bodycolor; 
          }
          const pages = document.querySelector('.struct-page'); 
          if (pages) {
            pages.style.backgroundColor = bodycolor; 
          }
    
          const profileColor = document.querySelector('.profileBackground'); 
          if (profileColor) {
            profileColor.style.backgroundColor = bodycolor; 
          }
    
    
          } catch (error) {
            console.error('Error fetching the logo and customization:', error);
          }
        };
    
        fetchData();
      }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/items?type=Accessories');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth > 1550);
            setIsSmallScreen(window.innerWidth < 720);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleFilterChange = (name, value) => {
        setFilters({ ...filters, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const filteredProducts = items.filter((item) => {
        return (
            (filters.size === '' || item.size === filters.size) &&
            (filters.brand === '' || item.brand === filters.brand) &&
            (search === '' || item.name.toLowerCase().includes(search.toLowerCase()))
        );
    });

    return (
        <>
            <Navbar />
            <div className="struct-page">
                <button className="toggle-button" onClick={toggleSidebar}>
                    {isSidebarOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill" viewBox="0 0 16 16">
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
                        </svg>
                    )}
                </button>
                {isSidebarOpen && (
                    <div className={`sidebar ${isSmallScreen ? 'sidebar-top' : 'sidebar-left'}`}>
                        <h1>
                            {language === 'ar' ? 'اكسسوارات' : 'Accessorise'}
                        </h1>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <Filter filters={filters} type="Accessories" onFilterChange={handleFilterChange} />
                    </div>
                )}
                <div className="productList">
                    {filteredProducts.map((item) => (
                        <div key={item._id} className="col-lg-4 col-md-6 col-sm-6 mb-4">
                            <ItemCard
                                id={item._id}
                                image={item.image && item.image.length > 0 ? `http://localhost:3000/${item.image[0]}` : "dressimg"}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                size={item.size}
                                brand={item.brand}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AccessoriesPage;
