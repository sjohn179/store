import { getSuggestedQuery } from '@testing-library/react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Categories from './Categories'
import Button from './Button'
import Browse from './Browse'
import Footer from './Footer'

window.addEventListener('load',localStorage.setItem('cate',''));
window.addEventListener('load',localStorage.setItem('searched',true));

const Home = () => {
    
    localStorage.setItem('home',JSON.stringify(true));

    const [query, setQuery] = useState('');
    const [searched, setSearched] = useState(true);

    const updateQueryTxt = (event) => {
        return setQuery(event.target.value);
    }

    console.log(`catcat: ${Categories.category}`);


    const inputRequired = () => {
        document.getElementById('search-txt-home').classList.add('red-bg');
        document.getElementById('categories').style.cssText = 'border: 2px solid red;';
    }

    const updateSearchStatus = (status) => {
        return setSearched(status);
    }

    return (
        <div onLoad={() => {
            window.scrollTo(0,0)
            }}>
            <h1 className="pg-head">WELCOME</h1>
            <div className="search">
                <h3 id="hcihu" className="subheader">What can I help you find today?</h3>
                <input type="text" name="search-txt-home" id="search-txt-home" className="search-txt" 
                value={query} onChange={updateQueryTxt}></input>
                <Categories />                
                <Button query={query} inputRequired={inputRequired} updateSearchStatus={updateSearchStatus}  />
                
                <Browse updateSearchStatus={updateSearchStatus} />
                <Footer />
            </div>
        </div>

    )
}

export default Home;
