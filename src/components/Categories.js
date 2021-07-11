import React, { useState } from 'react'

const Categories = () => {
    // const [category,setCategory] = useState('');

    let category;

    const updateCategory = (text) => {
        category = text;
        console.log(`blah: ${text}`)
        localStorage.setItem('cate', text);
    }

    return (
        <div>
            <select name="categories" id="categories" onChange={(e) => {
                console.log(`CATEGORY: ${e.target.value}`)
                updateCategory(e.target.value);
                
                }}>
                <option value="" id="cat-ph" selected hidden>Category (Optional)</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
                <option value="jewelery">Jewelry</option>
                <option value="electronics">Electronics</option>
                <option value="all">ALL</option>
            </select>
        </div>
    )
}

export default Categories;