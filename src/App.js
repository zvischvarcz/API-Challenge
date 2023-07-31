import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [countries, setCountries] = useState([])
  useEffect(() => {
  
    const fetchData = async () => {
    const restApi = await fetch("https://restcountries.com/v3.1/all");
    const data = await restApi.json();
    setCountries(data)
    console.log(data[0])
  }
  fetchData();
}, [])


  return (
    <div >
      <h1>COUNTRIES</h1>
      <div className="entireArrayWrap">
      {countries.map((country, index) => {
        return (
          <div key={index} className='setWrap'>
            <img src={country.flags.png}/>
            <h3 className='name-text'>{country.name.common}</h3>
          </div>
        )
      })}
      </div>
    </div>
  );
}

export default App;
