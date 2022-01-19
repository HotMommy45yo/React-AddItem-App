import './App.css';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import SvgButton from '@mui/material/Button';

function Nav() {

    const navStyle = {
        color: 'white',
        textDecoration: 'none'
    }
  return (
    <>
    <nav>
      <Link style={navStyle} to="/">
        <h3>React App</h3>
        </Link>
        <ul className='nav-links'>
            <Link style={navStyle} to="/additem">
              <Button variant="outlined" >Add Item</Button>
            </Link>
            <Link style={navStyle} to="/shop">
              <Button variant="outlined"  color="secondary">Shop</Button>
            </Link>
        </ul>   
    </nav>
      <div className='break'></div>
    </>
  );
}

export default Nav;
