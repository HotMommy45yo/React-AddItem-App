import '../App.css';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

function AddItem() {
  const [state, setState] = useState({ category: "", title: "", price: "", image: ""});
  const [imageName, setImageName] = useState("");
  const [validationError, setValidationError] =  useState(
    {category: {
      empty: "",
      signs: ""
    },
    title: {
      empty: "",
      signs: "",
      length: ""
    },
    price: {
      size:""
    }
    });
  const [validationSuccess, setValidationSuccess] = useState(false);

  const Validation = ()=>{
  
    if(state.category===""){
      setValidationError(current => ({
        ...current,
        category: {
          ...current.category,
          empty:"Category input can not be empty!"
        }
      }))
      return false;
    }
    else if (state.category.match(/^[a-zA-Z]+$/) ==null){
      setValidationError(current => ({
        ...current,
        category: {
          ...current.category,
          signs:"Wrong signs in category input!"
        }
      }))
      return false;
    } 

    else if(state.title===""){
      setValidationError(current => ({
        ...current,
        title: {
          ...current.title,
          empty: "Title input can not be empty!"
        }
      }))
      return false;  
    }
    else if(state.title.match(/^[a-zA-Z]+$/) ==null){
      setValidationError(current => ({
        ...current,
        title: {
          ...current.title,
          signs: "Wrong signs in title input!"
        }
      }))
      return false;  
    }
    else if(state.title.length > 15){
      setValidationError(current => ({
        ...current,
        title: {
          ...current.title,
          length: "Title can not be longer than 15!"
        }
      }))
      return false;  
    }
    else if(state.price <=0 || state.price >2000){
      setValidationError(current => ({
        ...current,
        price: {
          ...current.price,
          size: "Price must be bigger than null and smaller than 2000!"
        }
      }))
      return false;
    }
    else{
      return true;
    }
  }

  const handleChange = e => {
      const { name, value } = e.target;
      setState(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  const handleChangeImage = (event) =>{
    const reader = new FileReader();
    reader.readAsDataURL(event.target?.files?.[0]);
    reader.onload = function () {
      console.log(reader.result);
      setImageName(event.target?.files?.[0].name);
      setState(current => ({
        ...current,
        image: reader.result
      }))
    };
  }

  console.log('state', state)

  const OnSubmit = ()=>{

    if(Validation()){
      const values = state;
      console.log(values);
      const id = uuidv4()
      console.log(id);
      window.localStorage.setItem( `item-${id}` , JSON.stringify(values));
      setValidationError({category:{empty: "",signs: ""},title: {empty: "",signs: "",length: ""},price: {size:""}});
      setValidationSuccess(true);
      setTimeout(()=>{setValidationSuccess(false)},4000);
    }
    else{
      setTimeout(()=>{setValidationError({category:{empty: "",signs: ""},title: {empty: "",signs: "",length: ""},price: {size:""}})}, 4000);
    }
    
  }

  const DeleteImage = ()=>{
    console.log("huj");
    setImageName("");
    setState(current => ({
      ...current,
      image: ""
    }))
  }


 return(
  <div>
    <div id="divForAlert">
      {validationError.category.empty && <Alert severity="error">{validationError.category.empty}</Alert>}
      {validationError.category.signs && <Alert severity="error">{validationError.category.signs}</Alert>}
      {validationError.title.empty &&  <Alert severity="error">{validationError.title.empty}</Alert>}
      {validationError.title.signs &&  <Alert severity="error">{validationError.title.signs}</Alert>}
      {validationError.title.length &&  <Alert severity="error">{validationError.title.length}</Alert>}
      {validationError.price.size &&  <Alert severity="error">{validationError.price.size}</Alert>}
      {validationSuccess && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Item has been added!</Alert>}
      </div>

  <h2>Add Your Item!</h2>
    <form style={{ height:'50vh', width:'40vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'space-around', marginLeft:'auto', marginRight:'auto' }}>
    <TextField sx={{ input: { color: 'white' } }} name="category" label="Category" color="secondary" fullWidth focused value={state.fName} onChange={handleChange}/>
    <TextField sx={{ input: { color: 'white' } }} name="title" label="Title" color="secondary" fullWidth focused value={state.title} onChange={handleChange} />
    <TextField sx={{ input: { color: 'white' } }} name="price" type="number" label="Price" color="secondary" fullWidth focused value={state.price} onChange={handleChange} />

    <div style={{position:'relative'}}>
      <Button id="uploadFile" variant="outlined" component="label" color="secondary">Upload File
        <input name="image" type="file" accept="image/png, image/jpg"  hidden onClick={e => e.target.value = ''} onInput={(event)=>handleChangeImage(event)} />
      </Button>

      <div id="deleteIcon">
      <IconButton aria-label="delete" size="small" onClick={()=>DeleteImage()}>
        <DeleteIcon fontSize="medium" color="primary" />
      </IconButton>
      </div>

      <div id="imageLabel">{imageName}</div>
    </div>

    <Button variant="outlined" size="large" onClick={()=>OnSubmit()}>Add Item</Button>
    </form>
  </div>
 )
}


export default AddItem;
