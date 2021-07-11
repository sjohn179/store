import { getByPlaceholderText } from '@testing-library/react';
import React from 'react'
import { Link } from 'react-router-dom';

const Button = ({ query, inputRequired, updateSearchStatus }) => {

    let category;

    const getContent = () => {
        let content; 

        console.log(`query here: ${query}`);
        console.log(`cate here: ${category}`);

        

        console.log(`category aqui: ${category}`);
        
        if(query || category) {
            content =
            <div>
            <Link to="/results" onClick={() => {
                    localStorage.setItem('query',query);
                }}><button id="search-home" className="btn">SEARCH</button></Link>
        </div>;

        } else {
            content =
            <div>
                <button id="search-home" className="btn" onClick={inputRequired}>SEARCH</button>
            </div>;            
        }

        return content;
    }

    const getCate = () => {
        let target;

        category = localStorage.getItem('cate');

        localStorage.setItem('query',query);

        if(category || query) {
            target = '/results';
        } else {
            target = '#';
        }

        return target;
        
    }

    return (

        <div>
            <Link to={getCate} onClick={() => {
                    getCate();

                    if(!category && !query) {
                        inputRequired();
                    }
                }}><button id="search-home" className="btn" onClick={() => {
                updateSearchStatus(true);

                localStorage.setItem('searched',JSON.stringify(true));
            }}>SEARCH</button></Link>
        </div>
    )
}

export default Button;