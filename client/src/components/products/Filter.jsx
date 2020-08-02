import React,{useContext,useState} from 'react'
import { AppContext } from '../../context/AppProvider'

const Filter = () => {
    const [size,setSize] = useState("ALL");
    const [sort,setSort] = useState("")
    const {products,filterProducts,sortProducts} = useContext(AppContext);
    console.log(size)

    function onFilterChange(e){
      setSize(e.target.value);
      filterProducts(e.target.value)
      
    }

    function onSortChange(e){
      setSort(e.target.value);
      sortProducts(e.target.value);
    }
    return (
        <div className="filter">
        <div className="filter-result">
          {products.length} Products
        </div>
        <div className="filter-sort">
          Order{" "}
          <select
            value={sort}       
            onChange={onSortChange}
          >
            <option value="latest">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        <div className="filter-size">
          Filter{" "}
          <select
            value={size}          
            onChange={(e)=>onFilterChange(e)}          
          >
            {}
            <option value="latest">ALL</option>
            <option value="X">X</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
    )
}

export default Filter
