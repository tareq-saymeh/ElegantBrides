import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function Filter({ filters, onFilterChange, type }) {
    const [uniqueSizes, setUniqueSizes] = useState([]);
    const [uniquebrands, setUniquebrands] = useState([]);

    // Get the selected language from localStorage
    const language = localStorage.getItem('language') || 'ar'; // Default to Arabic if no language is set

    // Translation object
    const translations = {
        en: {
            size: 'Size',
            brand: 'Brand',
            all: 'All'
        },
        ar: {
            size: 'الحجم',
            brand: 'العلامة التجارية',
            all: 'الكل'
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/items?type=${type}`);
                const items = response.data;
                
                const sizes = [...new Set(items.map(item => item.size))];
                const brands = [...new Set(items.map(item => item.brand))];

                setUniqueSizes(sizes);
                setUniquebrands(brands);
            } catch (error) {
                console.error('Error fetching items', error);
            }
        };
        fetchData();
    }, [type]);

    return (
        <div className="filter">
            <div className="filter__item">
                <label>{translations[language].size}:</label>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="checkboxes"
                            value=""
                            checked={filters.size === ''}
                            onChange={(e) => onFilterChange('size', e.target.value)}
                        />
                        {translations[language].all}
                    </label>
                    {uniqueSizes.map((size) => (
                        <label key={size}>
                            <input
                                type="checkbox"
                                name="checkboxes"
                                value={size}
                                checked={filters.size === size}
                                onChange={(e) => onFilterChange('size', e.target.value)}
                            />
                            {size}
                        </label>
                    ))}
                </div>
            </div>
            <div className="filter__item">
                <label>{translations[language].brand}:</label>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="checkboxes"
                            value=""
                            checked={filters.brand === ''}
                            onChange={(e) => onFilterChange('brand', e.target.value)}
                        />
                        {translations[language].all}
                    </label>
                    {uniquebrands.map((brand) => (
                        <label key={brand}>
                            <input
                                type="checkbox"
                                name="checkboxes"
                                value={brand}
                                checked={filters.brand === brand}
                                onChange={(e) => onFilterChange('brand', e.target.value)}
                            />
                            {brand}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Filter;
