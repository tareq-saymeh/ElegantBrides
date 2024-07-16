import React from 'react';

export function Filter({ filters, onFilterChange }) {
    return (
        <div className="filter">
            <div className="filter__item">
                <label>Size:</label>
                <div>
                    <label>
                        <input 
                            type="checkbox" name="checkboxes" 
                            value="" 
                            checked={filters.size === ''} 
                            onChange={(e) => onFilterChange('size', e.target.value)} 
                        />
                        All
                    </label>
                    <label>
                        <input 
                            type="checkbox" name="checkboxes" 
                            value="S" 
                            checked={filters.size === 'S'} 
                            onChange={(e) => onFilterChange('size', e.target.value)} 
                        />
                        S
                    </label>
                    <label>
                        <input 
                            type="checkbox" name="checkboxes" 
                            value="M" 
                            checked={filters.size === 'M'} 
                            onChange={(e) => onFilterChange('size', e.target.value)} 
                        />
                        M
                    </label>
                    <label>
                        <input 
                            type="checkbox" name="checkboxes" 
                            value="L" 
                            checked={filters.size === 'L'} 
                            onChange={(e) => onFilterChange('size', e.target.value)} 
                        />
                        L
                    </label>
                    <label>
                        <input 
                            type="checkbox" name="checkboxes" 
                            value="XL" 
                            checked={filters.size === 'XL'} 
                            onChange={(e) => onFilterChange('size', e.target.value)} 
                        />
                        XL
                    </label>
                </div>
            </div>
            <div className="filter__item">
                <label>Collection:</label>
                <div>
                    <label>
                        <input 
                            type="checkbox" name="checkboxes" 
                            value="" 
                            checked={filters.collection === ''} 
                            onChange={(e) => onFilterChange('collection', e.target.value)} 
                        />
                        All
                    </label>
                    <label>
                        <input 
                            type="checkbox" name="checkboxes" 
                            value="chat" 
                            checked={filters.collection === 'chat'} 
                            onChange={(e) => onFilterChange('collection', e.target.value)} 
                        />
                        chat
                    </label>
                    <label>
                        <input 
                            type="checkbox" name="checkboxes" 
                            value="zara" 
                            checked={filters.collection === 'zara'} 
                            onChange={(e) => onFilterChange('collection', e.target.value)} 
                        />
                        zara
                    </label>
                    <label>
                        <input 
                            type="checkbox" name="checkboxes" 
                            value="Spring" 
                            checked={filters.collection === 'Spring'} 
                            onChange={(e) => onFilterChange('collection', e.target.value)} 
                        />
                        Spring
                    </label>
                    <label>
                        <input 
                            type="checkbox" name="checkboxes" 
                            value="Fall" 
                            checked={filters.collection === 'Fall'} 
                            onChange={(e) => onFilterChange('collection', e.target.value)} 
                        />
                        Fall
                    </label>
                </div>
            </div>
            <div className="filter__item">
                <label>Rating:</label>
                <div>
                    <label>
                        <input 
                            type="checkbox" name="checkboxes" 
                            value="" 
                            checked={filters.rating === ''} 
                            onChange={(e) => onFilterChange('rating', e.target.value)} 
                        />
                        All
                    </label>
                    <label>
                        <input 
                            type="checkbox" name="checkboxes" 
                            value="1" 
                            checked={filters.rating === '1'} 
                            onChange={(e) => onFilterChange('rating', e.target.value)} 
                        />
                        1
                    </label>
                    <label>
                        <input 
                            type="checkbox" name="checkboxes" 
                            value="2" 
                            checked={filters.rating === '2'} 
                            onChange={(e) => onFilterChange('rating', e.target.value)} 
                        />
                        2
                    </label>
                    <label>
                        <input 
                            type="checkbox" name="checkboxes" 
                            value="3" 
                            checked={filters.rating === '3'} 
                            onChange={(e) => onFilterChange('rating', e.target.value)} 
                        />
                        3
                    </label>
                    <label>
                        <input 
                            type="checkbox" name="checkboxes" 
                            value="4" 
                            checked={filters.rating === '4'} 
                            onChange={(e) => onFilterChange('rating', e.target.value)} 
                        />
                        4
                    </label>
                    <label>
                        <input 
                            type="checkbox" name="checkboxes" 
                            value="5" 
                            checked={filters.rating === '5'} 
                            onChange={(e) => onFilterChange('rating', e.target.value)} 
                        />
                        5
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Filter;
