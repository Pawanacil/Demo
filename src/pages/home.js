import React, { useState, useEffect } from 'react'
import { getProducts } from '../services/apis.services';
import { useNavigate } from 'react-router';


const Home = () => {
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(true);
    const navigateData = useNavigate();
    useEffect(() => {
        getProducts()
            .then(response => {
                // console.log(response.data)
                setProducts(response.data);
            })
    },[]);
    const limitedData = products.slice(0, 10);
    const handleClick = (data) => {
        console.log(data)
      navigateData("/itemdetails", {state:data});
    };
    const handleClickProducts = (data) => {
        console.log(data)
      navigateData("/browseList", {state:data});
    };
    return (
        
        <div className='list'>
            <div style={{padding:"20px 30px"}}><img className='scroller' alt='' src='images/Capture.PNG'/></div>
            <div className='browse_products'><button className='button' onClick={handleClickProducts}>Browse products</button></div>
            {products.length === 0 ?
                <h2>Loading...</h2> :
                <ul className='products1'>
                    {limitedData.map((item, itemindex) => {
                        return (
                            
                            <li key={itemindex} className='products2'>
                                <div className='products'>
                                    <img className='imagedata' alt='' src={item.image} />
                                    <h4>{item.title}</h4>
                                    <h3>{item.price}</h3>
                                    <button onClick={() => handleClick(item.id)}>Details</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            }
        </div>
    )
}

export default Home;
