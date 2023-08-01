import { useEffect, useState } from 'react';
import './App.css';
import Modal from 'react-modal';
import styled from "styled-components";

Modal.setAppElement("#root")

function App() {

  const [countries, setCountries] = useState([])
  useEffect(() => {
  
    const fetchData = async () => {
    const restApi = await fetch("https://restcountries.com/v3.1/all");
    const data = await restApi.json();
    setCountries(data)
  }
  fetchData();
}, [])

const [modalContent,SetModalContent] = useState({})
const [modalIsOpen, setIsOpen] = useState(false);
function openModal(index) {
  SetModalContent(countries[index]);
  
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
          <ul className='facts-list'>
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
            {/* {modalContent?.coatOfArms?.png === undefined ? <li>Coat of arms: None</li>: <img className='coatArmsImg' src={modalContent?.coatOfArms?.png} alt="coat of arms" /> } */}
          </ul>
          <button className='closeModalBtn' onClick={closeModal}>close</button>
        </ModalWrap>
      </Modal>
      <h1>COUNTRIES</h1>
      <EntireArrayWrap>
      {countries.map((country, index) => {
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


