import { useEffect, useState } from 'react';
import './App.css';
import Modal from 'react-modal';
import styled from "styled-components";
import { Dropdown} from './dropdown';

Modal.setAppElement("#root")

function App() {
  const [filteredCountries, setFilteredCountries] = useState([])
  const [sortBy, setSortBy] = useState("a-z");
  const [countries, setCountries] = useState([]);
  const [sortedCountries, setSortedCountries] = useState(countries);
  const [search, setSearch] = useState("");
  console.log(search);
  useEffect(() => {
  
    const fetchData = async () => {
    const restApi = await fetch("https://restcountries.com/v3.1/all");
    const data = await restApi.json();
    setCountries(data)
  }
  fetchData();
}, [])

useEffect(()=>{
  
  sortBy === "a-z" ? setSortedCountries([...countries].sort((a, b) => (a.name?.common > b.name?.common) ? 1 : -1)) :
   sortBy === "z-a" ? setSortedCountries([...countries].sort((a, b) => (a.name?.common < b.name?.common) ? 1 : -1)) :
    sortBy === "populationAscending" ? setSortedCountries([...countries].sort((a, b) => (a.population > b.population) ? 1 : -1)) :
    sortBy === "populationDescending" ? setSortedCountries([...countries].sort((a, b) => (a.population < b.population) ? 1 : -1)) :
     sortBy === "sizeAscending"  ? setSortedCountries([...countries].sort((a, b) => (a.area > b.area) ? 1 : -1)) :
     sortBy === "sizeDescending"  ? setSortedCountries([...countries].sort((a, b) => (a.area < b.area) ? 1 : -1)) : setSortedCountries([...countries].sort((a, b) => (a.name?.common > b.name?.common) ? 1 : -1))
}, [sortBy, countries]);

useEffect(() => {
  setFilteredCountries(countries.filter((country) => {
    return country.name?.common.toLowerCase().includes(search.toLowerCase());
  }));
  search.length > 0 && setSortedCountries(filteredCountries);
}, [search, countries, filteredCountries]);

const [modalContent,SetModalContent] = useState({})
const [modalIsOpen, setIsOpen] = useState(false);
function openModal(index) {
  SetModalContent(sortedCountries[index]);
  
  setIsOpen(true);
}

function closeModal() {
  setIsOpen(false);
}

  return (
    <div >
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="country specific info"
        className="Modal"
        overlayClassName="Overlay"
      >
        <ModalWrap BgImg={modalContent?.coatOfArms?.png} >
          <h2>About {modalContent?.name?.common}</h2>
          <ul>
            <li>Official Name: {modalContent?.name?.official}</li>
            <li>Capital City: {modalContent?.capital}</li>
            <li>Currency: { modalContent.currencies && modalContent?.currencies[Object?.keys(modalContent?.currencies)[0]]?.name} ({modalContent.currencies && modalContent?.currencies[Object?.keys(modalContent?.currencies)[0]]?.symbol})</li>
            <li>Population: {modalContent?.population?.toLocaleString()}</li>
            <li>Size: {modalContent?.area?.toLocaleString()}km²</li>
            <li>Region: {modalContent?.region}</li>
            <li>Sub-region: {modalContent?.subregion}</li>
            <li>Continent: {modalContent?.continents}</li>
            <li>Timezone(s): {modalContent?.timezones + ","}</li>
            <li>Driving Side: {modalContent?.car?.side}</li>
            <li>{modalContent?.name?.common } {modalContent?.landlocked ? "is": "is not"} landlocked.</li>
            <li>{modalContent?.name?.common } {modalContent?.unMember ? "is": "is not"} a member of the UN.</li>
            <li>{modalContent?.name?.common } {modalContent?.independent ? "is": "is not"} an independent country.</li>
          </ul>
          <button onClick={closeModal}>close</button>
        </ModalWrap>
      </Modal>
      <Title className='title'>COUNTRIES</Title>
      <Dropdown setSort={setSortBy} setSearch={setSearch} />
      <EntireArrayWrap>
      {sortedCountries.map((country, index) => {
        return (
          <SetWrap key={index} onClick={() => openModal(index)}    >
            <img src={country.flags.png} alt={country.name.common + " Flag"} />
            <h3>{country.name.common}</h3>
          </SetWrap>
        )
      })}
      </EntireArrayWrap>
    </div>
  );
}

export default App;

const Title = styled.h1`
  text-align: center;
  font-family: 'Rubik Dirt', cursive;

`

const EntireArrayWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`

const SetWrap = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    background-color: rgb(177, 177, 177);
    width: 30vw;
    margin: 1vw;
    padding-top: 3vh;
    cursor: pointer;

    img {
      height: 25vh;
      max-width: 25vw;
    }
    
`
const ModalWrap = styled.div`
  height: 100%;
  padding: 5vw;
  display: block;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Cabin', sans-serif;

  ul {
    font-size: larger;
    list-style:square;
  }

  button {
    font-size: x-large;
    background-color: rgb(0, 174, 255);
    border: 1px dotted black;
    cursor: pointer;
    font-family: 'Cabin', sans-serif;
    border-radius: 5px;
    padding: 1vh;
  }

  &::after {
  content: "";
  background: url(${(props) => props.BgImg});
  opacity: 0.25;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;   
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
`


