import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";

export function App() {
  const URL_API = "https://challenge.outsera.tech/api/movies";
  const [multipleWinners, setMultipleWinners] = useState([]);
  const [topStudios, setTopStudios] = useState([]);
  const [producersMinMax, setProducersMinMax] = useState([]);
  const [listResearched, setResearched] = useState([]);
  const [inputYear, setInputYear] = useState("");

  useEffect(() => {
    const getDataMultipleWinnersYears = async () => {
      try {
        Axios.get(URL_API + "/yearsWithMultipleWinners")
          .then((response) => {
            setMultipleWinners(response.data.years ?? []);
          })
          .catch((error) => {
            console.error("Erro na requisição:", error);
          });
      } catch (error) {
      console.error("Erro na requisição:", error);
    }
    };

    const getDataTopStudios = async () => {
      try {
        Axios.get(URL_API + "/studiosWithWinCount")
          .then((response) => {
            if (response.data.studios) {
              const topThree = response.data.studios.splice(0, 3);
              setTopStudios(topThree ?? []);
            }
          })
          .catch((error) => {
            console.error("Erro na requisição:", error);
          });
      } catch (error) {
      console.error("Erro na requisição:", error);
    }
    };

    const getProducersMinMax = async () => {
      try {
        Axios.get(URL_API + "/maxMinWinIntervalForProducers")
          .then((response) => {
            setProducersMinMax(response.data ?? []);
          })
          .catch((error) => {
            console.error("Erro na requisição:", error);
          });
      } catch (error) {
      console.error("Erro na requisição:", error);
    }
    };

    getDataMultipleWinnersYears();
    getDataTopStudios();
    getProducersMinMax();
  }, []);

  const searchMovieByYear = async () => {
    if (!inputYear) {
      alert("Necessário informar um ano para pesquisar!");
      return;
    }
    try {
      Axios.get(URL_API + "/winnersByYear?year=" + inputYear)
        .then((response) => {
          setResearched(response.data ?? []);
        })
        .catch((error) => {
          console.error("Erro na requisição:", error);
        });
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleChange = (event) => {
    setInputYear(event.target.value);
  };

  return (
    <>
      <section id="next-steps">
        <div id="docs">
          <div className="table-panel">
            <label>List years with multiple winners</label>
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Year</th>
                  <th scope="col">Win Count</th>
                </tr>
              </thead>
              <tbody>
                {multipleWinners.map((mW) => {
                  return (
                    <tr key={mW.year}>
                      <td>{mW.year}</td>
                      <td>{mW.winnerCount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div id="social">
          <div className="table-panel">
            <label>Top 3 studios with winners</label>
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Win Count</th>
                </tr>
              </thead>
              <tbody>
                {topStudios.map((tp) => {
                  return (
                    <tr key={tp.name + tp.winCount}>
                      <td>{tp.name}</td>
                      <td>{tp.winCount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="next-steps">
        <div id="docs">
          <div className="table-panel">
            <label>
              Producers with longest and shortest interval betweens wins
            </label>
            <h2>Maximum</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Producer</th>
                  <th scope="col">Interval</th>
                  <th scope="col">Previous Year</th>
                  <th scope="col">Following Year</th>
                </tr>
              </thead>
              <tbody>
                {producersMinMax?.max?.map((pMax) => {
                  return (
                    <tr key={pMax.producer + pMax.interval}>
                      <td>{pMax.producer}</td>
                      <td>{pMax.interval}</td>
                      <td>{pMax.previousWin}</td>
                      <td>{pMax.followingWin}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <h2>Minimum</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Producer</th>
                  <th scope="col">Interval</th>
                  <th scope="col">Previous Year</th>
                  <th scope="col">Following Year</th>
                </tr>
              </thead>
              <tbody>
                {producersMinMax?.min?.map((pMin) => {
                  return (
                    <tr key={pMin.producer + pMin.interval}>
                      <td>{pMin.producer}</td>
                      <td>{pMin.interval}</td>
                      <td>{pMin.previousWin}</td>
                      <td>{pMin.followingWin}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div id="social">
          <div className="table-panel">
            <label>List movie winners by year</label>

            <div>
              <input
                value={inputYear}
                onChange={handleChange}
                type="number"
              ></input>
              <img
                src="https://www.svgrepo.com/show/408330/search-finder-magnifying-glass.svg"
                onClick={() => searchMovieByYear()}
                style={{ width: 20 }}
              />
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Year</th>
                  <th scope="col">Title</th>
                </tr>
              </thead>
              <tbody>
                {listResearched?.map((pMin) => {
                  return (
                    <tr key={pMin.producer + pMin.interval}>
                      <td>{pMin.id}</td>
                      <td>{pMin.year}</td>
                      <td>{pMin.title}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
