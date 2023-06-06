import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import { viewProduct, getRelatedItems } from '../services/apis.services';
import { GlobalContextmain } from '../components/globalcontext';

const Itemdetails = () => {
  const [details, setDetails] = useState({});
  const [relatedItems, setRelatedItems] = useState([]);
  const [imageData, setImageData] = useState(0);
  const { globalState, setGlobalState } = useContext(GlobalContextmain);
  const navigateData = useLocation();

  const handleClick = (data) => setImageData(data);

  const handleCart = (actionType, dataObj) => {
    setGlobalState(previousData => ({
      ...previousData,
      items: {
        ...previousData.items,
        [dataObj.item]: previousData.items[dataObj.item] ?
          actionType === "remove" ? previousData.items[dataObj.item] - dataObj.value : previousData.items[dataObj.item] + dataObj.value :
          dataObj.value
      }
    }));
  };

  useEffect(() => {
    viewProduct(navigateData.state)
      .then(response => {
        setDetails(() => ({
          ...response.data,
          images: [
            response.data.image,
            response.data.image,
            response.data.image,
            response.data.image,
            response.data.image
          ]
        }));
        return response.data;
      })
      .then(product => {
        getRelatedItems(product.category)
          .then(response => {
            setRelatedItems(response.data);
          });
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, []);

  return (
    <>
      {
        details.id ?
          <div className='details_container'>
            <div>
              <ul>
                {details.images.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a onClick={() => handleClick(itemIndex)}>
                      <img src={item} style={{ width: "50px", opacity: itemIndex === imageData ? 1 : 0.6 }} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img src={details.images[imageData]} style={{ width: "100%" }} />
            </div>
            <div>
              <h2  className='title'>{details.title}</h2>
              <h3 className='pricestyle'>{ details.price}</h3>
              <div style={{ display: "grid", gap: "10%", gridTemplateColumns: "40% 40%" , paddingLeft: "20%"}}>
                <button onClick={() => { handleCart("add", { item: details.id, value: 1 }) }}>Add to cart</button>
                <button disabled={!globalState.items[details.id] || globalState.items[details.id] === 0} onClick={() => { handleCart("remove", { item: details.id, value: 1 }) }}>Remove from cart</button>
              </div>
              <div className='flex_main'>
                <h5>Category</h5>
                <h5 style={{ color: "gray" }}>{details.category}</h5>
              </div>
              <div className='flex_main'>
                <h5>Rating</h5>
                <h5 style={{ color: "gray" }}>{details.rating.rate}</h5>
              </div>
              <div className='flex_main'>
                <h5>Description</h5>
                <h5 style={{ color: "gray" }}>{details.description}</h5>
              </div>
            </div>
            <div className='item'>
              <h3>Related Items</h3>
              <ul className='related_items'>
                {relatedItems.map((item) => (
                  <li key={item.id}>
                    <div className='related_item'>
                      <img src={item.image} alt='' className='imagedata' />
                      <h4>{item.title}</h4>
                      <h3>{item.price}</h3>
                      <button onClick={() => handleClick(item.id)}>Details</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div> :
          <h2>Loading...</h2>
      }
    </>
  );
};

export default Itemdetails;