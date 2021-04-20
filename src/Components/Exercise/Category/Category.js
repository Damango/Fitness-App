import React from 'react';
import './Category.css'
const Category = (props) => {
    return ( <div className={"category-container " + props.category}>{props.category}</div> );
}
 
export default Category;