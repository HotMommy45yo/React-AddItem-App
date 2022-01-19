import React, { useEffect, useState, } from 'react';
import './App.css';
import Skeleton from '@mui/material/Skeleton';
import { Link } from 'react-router-dom';


const myStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between'
}


function Shop() {

  const getLocalStorageItems = () => {
    const keys = Object.keys(localStorage);
    return keys.map(key => ({ ...JSON.parse(localStorage.getItem(key)), id: key.replace('item-', '') }))
  }


  useEffect(() => {
    fetchItems();
  }, [])

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loading = () => {
    return (
      <div style={myStyle}>
        <Skeleton width={710} height={118} />
        <Skeleton animation="wave" width={710} height={118} />
        <Skeleton animation={false} width={710} height={118} />
        <Skeleton width={710} height={118} />
        <Skeleton animation="wave" width={710} height={118} />
        <Skeleton animation={false} width={710} height={118} />
      </div>
    )
  }

  const fetchItems = async () => {
    setIsLoading(true);
    const data = await fetch('https://fakestoreapi.com/products');
    const items = await data.json();
    const localStorageItems = getLocalStorageItems();
    setItems([...localStorageItems, ...items]);
    setIsLoading(false);

  }


  return (
    <div className='allItems'>
      {isLoading &&
      loading()
      }
      {items.map(item => (
        <h1 key={item.id}>
          <Link style={{textDecoration:'none', color:'white'}} to={`./${item.id}`}>{item.title}</Link>
        </h1>
      ))}
    </div>
  );
}

export default Shop;





