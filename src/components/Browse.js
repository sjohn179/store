import React from 'react'
import { Link } from 'react-router-dom';


const Browse = ({ updateSearchStatus }) => {
    
    return (
        <div id = {'browse'}>
            <h2 id="browsing" className="subheader">JUST BROWSING?</h2>
            <Link to="/products"><button className="btn" id="view-all-btn" onClick={() => {
                updateSearchStatus(false);

                localStorage.setItem('searched',JSON.stringify(false));
            }}>View ALL Products</button></Link><br /><br />
        </div>
    )
}

export default Browse;