import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/actions/productActions';
import { Link } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import Nav from './Nav';
import Footer from './Footer'


window.onunload = () => {
    localStorage.setItem("re-rendered",false);
}


export const setProduct = (someTitle, someDesc, someImg) => {
    let currTitle, currDesc, currImg;

    currTitle = someTitle;
    currDesc = someDesc;
    currImg = someImg;

    let currProduct = {
        title: currTitle,
        description: currDesc,
        image: currImg
    };

    return currProduct;
}

export const setID = someId => {
    let currID = someId;

    return currID;
}

const Products = () => {
    const [currentProduct, setCurrentProduct] = useState({});
    const [reRendered, setReRendered] = useState(false);
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.productList);

    // const [scrollPos, setScrollPos] = useState(0);

    let scrollPos, tempReRendered;

    localStorage.setItem('single-product',JSON.stringify(false));

    localStorage.setItem('home',JSON.stringify(false));

    // console.log(reRendered);

    const saveScrollData = () => {

        console.log(`scrollPos on unload: ${scrollPos}`);
        console.log(`window.pageYOffset on unload: ${window.pageYOffset}`);

        localStorage.setItem('scroll-pos', JSON.stringify(window.pageYOffset));

        localStorage.setItem('re-rendered',true);
    }



    const resetScrollData = () => {
        localStorage.setItem('scroll-pos', JSON.stringify(0));

        localStorage.setItem('re-rendered',true);
    }

    const resetCategory = () => {
        localStorage.setItem('cate','');
    }

    const getDesc = (description) => {
        //console.log(`index: ${description.indexOf('. ')}`);
        let index = description.indexOf('. ');
        let scIndex = description.indexOf(';');

        console.log(`index: ${index}`);

        if(index > 70 && index !== -1) {
            description = description.substr(0,description.indexOf('.') + 1);

            description = `${description.charAt(0).toUpperCase()}${description.substr(1,description.length)}`;
        } else if(index <= 70 && index !== -1) {
            let description2;
            
            description2 = description.substr(description.indexOf('. ') + 1, description.length);

            console.log(`description2 bef = ${description2}`);

            console.log(`period index: ${index}`)
            
            description = description.substr(0,description.indexOf('. ') + 1);

            description2 = description2.substr(0,description2.indexOf('. ') + 1);

            console.log(`description2 aft = ${description2}`);
            
            description = `${description.charAt(0).toUpperCase()}${description.substr(1,description.length)}  ${description2}`;
        } else  if(scIndex !== -1) {
            description = description.substr(0,description.indexOf('; ') + 1);
        } else if(index === -1 && scIndex === -1 && description.length > 70) {
                let description2;

                description2 = description.substr(70,description.length);

                description = description.substr(0,70);

                description2 = description2.substr(0, description2.indexOf(','));

                description += `${description2} . . .`;
        }

        return <p className={"p-desc"}>{description}</p>
    }

   /*const [scrollPos, setScrollPos] = useLocalStorage("scroll-pos", JSON.stringify(scrollPos));

    console.log(`scrollPos: ${scrollPos}`);

    useEffect(() => {
        localStorage.setItem('scroll-pos',JSON.stringify(window.pageYOffset));

        console.log(`scrollPos: ${scrollPos}`);
    },scrollPos)*/

    /*
    const [scrollPos, setScrollPos] = useState(() => {
        let value;
        try {
            value = JSON.parse(window.localStorage.getItem(window.pageYOffset) || '0');
        } catch (e) {
            value = 0
        }

        return value;
    })

    useEffect(
        () => {
            window.localStorage.setItem(window.pageYOffset,scrollPos);
        }, [scrollPos]
    )
*/
/*
    // Hook
function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }*/

    const fetchAllProducts = async () => {
        const res = await axios.get('https://fakestoreapi.com/products')
        .catch((err) => console.log(err));

        dispatch(setProducts(res.data));

    }



    useEffect(() => {
        fetchAllProducts();
    }, []);


    return (
        <div onLoad={!reRendered ? 
        () => {
            window.scrollTo(0,0)
            tempReRendered = JSON.parse(localStorage.getItem("re-rendered"));

            setReRendered(tempReRendered);
        }
         :
        () => {
            scrollPos = JSON.parse(localStorage.getItem("scroll-pos"));
            window.scrollTo(0,scrollPos);
        }
        }>
            <h1 className="pg-head">OUR PRODUCTS</h1>
            <Nav />
            
            {products.length > 0 ? products.map((product,index) => {
                // onLoad={window.scrollTo(0,scrollPos)}
                
                return (
                    <div className="product-section">
                        <img src={product.image} className={`image`} id={`img-${product.id}`} />
                        <h3 className={"p-title"}>{product.title}</h3>
                        {getDesc(product.description)}
                        <Link to={`/products/${product.id}`} id={'more-link'} onClick={() => {
                            setProduct(product.title, product.description, product.image);

                            saveScrollData();

                            console.log(`scrollPos: ${window.pageYOffset}`);

                            }}>MORE</Link>
                    </div>
                )
            }) :
            <h3 className={"no-results"}>loading . . .</h3>
            }

            
            {/*<Link to="/" onClick={() => {
                resetScrollData();
                resetCategory();
            }}>Home</Link><br /><br />*/}

            <Footer />
            
        </div>
    )
}

export default Products;