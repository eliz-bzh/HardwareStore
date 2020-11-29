import React, {useState} from 'react';
import { Form } from 'react-bootstrap';
import './App.css';
import Products from './components/Products/Products';

function App() {
  /*const [image, setImage] = useState('');

  const [loading, setLoading] = useState(false);

  const uploadImage= async event=>{
    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'hardware-store');
    setLoading(true);
    const res = await fetch(
      `	https://api.cloudinary.com/v1_1/dzlhauo5h/image/upload`,
      {
        method: 'POST',
        body: data
      }
    );

    const file = await res.json();
    setImage(file.secure_url);
    console.log(file.secure_url);
    setLoading(false);

  }*/

  return (
    <div className="App">
      <Products/>
    </div>
  );
}

export default App;
