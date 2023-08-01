import { useEffect, useState } from 'react';
import './App.css';
import Modal from 'react-modal';

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
        <h2>About {modalContent?.name?.common}</h2>
        <ul className='facts-list'>
          <li>Official Name: {modalContent?.name?.official}</li>
          <li>Capital City: {modalContent?.capital}</li>
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
          {modalContent?.coatOfArms?.png === undefined ? <li>Coat of arms: None"</li>: <img className='coatArmsImg' src={modalContent?.coatOfArms?.png} alt="coat of arms" /> }
        </ul>
        <button className='closeModalBtn' onClick={closeModal}>close</button>
      </Modal>
      <h1>COUNTRIES</h1>
      <div className="entireArrayWrap">
      {countries.map((country, index) => {
        return (
          <div key={index} className='setWrap' onClick={() => openModal(index)}>
            <img src={country.flags.png} alt={country.name.common + " Flag"} />
            <h3 className='name-text'>{country.name.common}</h3>
          </div>
        )
      })}
      </div>
    </div>
  );
}

export default App;
