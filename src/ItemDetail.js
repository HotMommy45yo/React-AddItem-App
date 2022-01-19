import React, { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';


function Item() {
  const { id } = useParams();

  const [item, setItem] = useState({});

  useEffect(() => {
    fetchItem();
  }, [])

  return (
    <div className='oneItem'>
      <h1>Category:</h1>
      <h2>{item.category}</h2>
      <h1>Title:</h1>
      <h2>{item.title}</h2>
      <img className='itemImage' alt={item.title} src={item.image}/>
    </div>
  );

  async function fetchItem () {
    const item = JSON.parse(localStorage.getItem(`item-${id}`));
    if (item) {
      console.log(item);
      setItem(item);
    }
    else{

    const fetchItem = await fetch(`https://fakestoreapi.com/products/${id}`);
    const item2 = await fetchItem.json();
    console.log(item2);
    setItem(item2);}
  }
}

export default Item;