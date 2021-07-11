import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/actions/productActions';
import { setSelectedProduct } from '../redux/actions/productActions';
import { Link } from 'react-router-dom'
import { currProduct, setID } from './Products';
import { useParams } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer'

import Products from './Products';


const SingleProduct = ({ currentID }) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product.selectedProduct);
    const [pageExited, setPageExited] = useState(false);


    const { productID } = useParams();

    const goBack = `../products/#img-${productID}`;

    const searchActive = localStorage.getItem('searched');

    localStorage.setItem('home',JSON.stringify(false));

    let stringPrice;

    localStorage.setItem('single-product',JSON.stringify(true));

    const fetchProductDetails = async () => {
        const res = await axios.get(`https://fakestoreapi.com/products/${productID}`)
        .catch((err) => console.log(err));

        console.log(res);

        console.log(`product price: ${product.price}`);

        stringPrice = res.data.price.toString();
        
        console.log(stringPrice);

        dispatch(setSelectedProduct(res.data));
    }

    useEffect(() => {
        if(productID && productID !== '') {
            fetchProductDetails();
        }
    }, [productID]);

    console.log(`currentID here: ${currentID}`);

   /* console.log(currentProduct);

    const currentID = setID(currentProduct.id);
*/

    const formatPrice = (price) => {
        console.log(`original price: ${price}`);
        if(price[price.length-2] === '.') {
            price += '0';
        } else if(price[price.length-3] !== '.' ) {
            price += '.00';
        } else {
            price = price;
        }

        console.log(`formatted price: ${price}`);

        return price;
    }



    const resetScrollData = () => {
        localStorage.setItem('scroll-pos', JSON.stringify(0));

        localStorage.setItem('re-rendered',true);
    }

    const resetCategory = () => {
        localStorage.setItem('cate','');
    }

    const returnSingleHeader = (product) => {
        let singleHeader;
        const mw299 = window.matchMedia("(max-width: 299px)");
        const mw599 = window.matchMedia("(max-width: 599px)");
        const mw899 = window.matchMedia("(max-width: 899px)");

        if(mw299.matches) {
            product.title.length < 70 ?
            singleHeader = <h3 className="pg-head-item">{product.title}</h3>
            :
            singleHeader = <h4 className="pg-head-item">{product.title}</h4>
        } else if(mw599.matches) {
            product.title.length < 70 ?
            singleHeader = <h2 className="pg-head-item">{product.title}</h2>
            :
            singleHeader = <h3 className="pg-head-item">{product.title}</h3>
        } else if(mw899.matches) {
            product.title.length < 70 ?
            singleHeader = <h1 className="pg-head-item">{product.title}</h1>
            :
            singleHeader = <h2 className="pg-head-item">{product.title}</h2>
        } else {
            console.log(product.title.length);

            singleHeader = <h1 className="pg-head-item">{product.title}</h1>
        }

        return singleHeader;
    }

    let newPrice;

    return (
        <div onLoad={
            () => {
                window.scrollTo(0,0);

                document.body.style.cssText = 'opacity: 0;';

                setTimeout(() => {
                document.body.style.cssText = 'animation: appear 524ms 1 ease-in; opacity: 1;';
                
                
            },472);
            }
        }>
            { product && product.id && !pageExited
            ? 
            <div>
                {
                    returnSingleHeader(product)
                }
                {/*<p>({product.category})</p>*/}
                <Nav searchActive={searchActive} />
                <img src={product.image} className={`image-full`} />
                <p className={"sp-desc"}>{product.description}</p>
                <p className={'price'}>${formatPrice(product.price.toString())}</p>
            </div> 

            : 
            <div>loading . . .</div>}
                        
                    
            {/*<br /> <br />
            <Link to="../Products" >BACK</Link><br /><br />
            <Link to="../" onClick={() => {
                resetScrollData();
                resetCategory();
                }}>Home</Link>*/}

                <Footer />
        </div>
    )
}

export default SingleProduct;