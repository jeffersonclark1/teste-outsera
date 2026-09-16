import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import { ChevronRight, ChevronLeft } from "lucide-react";

function List() {
  const URL_API = "https://challenge.outsera.tech/api/movies";
  const [listMovies, setListMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [year, setYear] = useState("");
  const [winner, setWinner] = useState("");

  const getListAll = async () => {
    try {
      Axios.get(
        URL_API +
          `?page=${page}&size=10${winner ? `&winner=${winner}` : ""}${year ? `&year=${year}` : ""}`,
      )
        .then((response) => {
          setListMovies(response.data ?? []);
        })
        .catch((error) => {
          console.error("Erro na requisição:", error);
        });
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleWinner = (event) => {
    setWinner(event.target.value);
  };

  const handleYear = (event) => {
    setYear(event.target.value);
  };

  useEffect(() => {
    getListAll();
  }, [page, winner, year]);

  return (
    <>
      <section id="next-steps">
        <div id="docs">
          <div className="table-panel">
            <label>List movies</label>
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">
                    Year
                    <br></br>
                    <input
                      placeholder="Filter by year"
                      value={year}
                      onChange={handleYear}
                    ></input>
                  </th>
                  <th scope="col">Title</th>
                  <th scope="col">
                    Winner?
                    <br></br>
                    <select onChange={handleWinner}>
                      <option disabled>Yes/No</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listMovies?.content?.map((mW) => {
                  return (
                    <tr key={mW.id + mW.year}>
                      <td>{mW.id}</td>
                      <td>{mW.year}</td>
                      <td>{mW.title}</td>
                      <td>{mW.winner ? "Yes" : "No"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="pagination-bar">
              <div>
                <button
                  className="icon-button bordered"
                  disabled={page === 0}
                  onClick={() => setPage((current) => current - 1)}
                >
                  <ChevronLeft size={18} />
                </button>
                {[...Array(listMovies.totalPages)].map((x, i) => (
                  <button
                    className="icon-button bordered"
                    key={i}
                    // disabled={!pagination.hasPreviousPage || loading}
                    onClick={() => setPage(i)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className="icon-button bordered"
                  disabled={listMovies.totalPages === page}
                  onClick={() => setPage((current) => current + 1)}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default List;
