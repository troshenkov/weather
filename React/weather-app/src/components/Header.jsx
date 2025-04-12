import React from 'react';

const Header = ({ city, date }) => {
    return (
        <header className="header">
            <div id="city">{city}</div>
            <div id="date">{date}</div>
        </header>
    );
};

export default Header;