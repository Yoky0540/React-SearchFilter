import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [word, setWord] = useState("");
  const [datafilter] = useState(["name", "capital"]);

  const searchCountries = (countries) => {
    return countries.filter((item) => {
      return datafilter.some((filter) => {
        if(item[filter]){
          if (filter === "name") {
            return (
              item[filter].common
                .toString()
                .toLowerCase()
                .indexOf(word.toLowerCase()) > -1
            );
          } else {
            return (
              item[filter].toString().toLowerCase().indexOf(word.toLowerCase()) >
              -1
            );
          }
        }
        
      });
    });
  };


  const formatNumber=(num)=> {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  
  const separatedArray = (str) =>{
    if(str){
      return str.toString()
    }
    
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);
  return (
    <div className="container">
      <div className="search-container">
        <label htmlFor="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="search capital or country"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </label>
      </div>
      <ul className="row">
        {searchCountries(countries).map((item, index) => {
          return (
            <li key={index}>
              <div className="card">
                <div className="card-title">
                  <img src={item.flags.svg} alt={item.flags.alt} />
                </div>

                <div className="card-body">
                  <div className="card-description">
                    <h2>{item.name.common}</h2>
                    <ol className="card-list">
                      <li>
                        population: <span>{formatNumber(item.population)}</span>
                      </li>
                      <li>
                        region: <span>{item.region}</span>
                      </li>
                      <li>
                        capital: <span>{separatedArray(item.capital)}</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
