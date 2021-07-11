import React from 'react'
import { Link } from 'react-router-dom';

const Nav = ({ searchActive }) => {
    const singleProductPage = localStorage.getItem('single-product');
    const searched = localStorage.getItem('searched');

    

    const resetScrollData = () => {
        localStorage.setItem('scroll-pos', JSON.stringify(0));

        localStorage.setItem('re-rendered',true);
    }

    const resetCategory = () => {
        localStorage.setItem('cate','');
    }

    const getNav = () => {
        let nav;

        console.log(`searched: ${searched}`);

        console.log(`singleProductPage: ${singleProductPage}`);
        
        if(singleProductPage === 'true') {
            searched === 'true' ? nav = <nav className={'nav'}>
            <Link to="../Results" className={'link'} id={'back-link'}>back</Link><br /><br />
            <Link to="../" className={'link'} id={'home-link'} onClick={() => {
                resetScrollData();
                resetCategory();
                }}>home</Link>
            </nav>
                :
                nav = <nav className={'nav'}>
            <Link to="../Products" className={'link'} id={'back-link'}>back</Link><br /><br />
            <Link to="../" className={'link'} id={'home-link'} onClick={() => {
                resetScrollData();
                resetCategory();
                }}>home</Link>
            </nav>
        } else {
            console.log('false');

            nav = <nav className={'nav-full'}>
            <Link to="../" className={'link'} id={'home-link-full'} onClick={() => {
                resetScrollData();
                resetCategory();
                }}>home</Link>
        </nav>
        }

        return nav;
    }

    return (
        <div>
            {getNav()}
        </div>
    )
}

export default Nav;