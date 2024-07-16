import React, { useState, useEffect } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import Filter from '../Filter/Filter';
import contents from '../Content/Content.js';
import Navbar from '../Navbar/Navbar.js';
import Footer from '../Footer/Footer.js';

function JewerlyPage() {
    const [filters, setFilters] = useState({ size: '', collection: '', rating: '' });
    const [search, setSearch] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1550);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 720);

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

    const filteredProducts = contents.filter((contents) => {
        return (
            (filters.size === '' || contents.size === filters.size) &&
            (filters.collection === '' || contents.collection === filters.collection) &&
            (filters.rating === '' || contents.rating === parseInt(filters.rating)) &&
            (search === '' || contents.name.toLowerCase().includes(search.toLowerCase()))
        );
    });

    return (
        <>
            <Navbar />
            <div className="struct-page">
                <button className="toggle-button" onClick={toggleSidebar}>
                    {isSidebarOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill" viewBox="0 0 16 16">
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z"/>
                        </svg>
                    )}
                </button>
                {isSidebarOpen && (
                    <div className={`sidebar ${isSmallScreen ? 'sidebar-top' : 'sidebar-left'}`}>
                        <h1>Accessories</h1>
                        <div className="search-bar">
                            <input 
                                type="text" 
                                placeholder="Search by name" 
                                value={search} 
                                onChange={handleSearchChange} 
                            />
                        </div>
                        <Filter filters={filters} onFilterChange={handleFilterChange} />
                    </div>
                )}
                <div className="productList">
                    {filteredProducts.map((contents) => (
                        <ItemCard 
                        id={contents.id}
                            image={contents.image}
                            name={contents.name}
                            price={contents.price}
                            size={contents.size}
                            collection={contents.collection}
                            rating={contents.rating}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default JewerlyPage;
