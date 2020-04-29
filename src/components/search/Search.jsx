import React from 'react';
import './search.css'

const Search = ({ value, getSearch, setSearchBy, searchBy }) => {
    return (
        <div className="search-bar">
            <input value={value} onChange={getSearch} className="search" placeholder="Search..." />
            <select className="select" onChange={setSearchBy} value={searchBy}>
                <option value="fullname">Fullname</option>
                <option value="email">Email</option>
                <option value="city">City</option>
                <option value="state">State</option>
            </select>
        </div>
    )
}

export default Search