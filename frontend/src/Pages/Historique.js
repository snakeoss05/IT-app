import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Historique() {
  const [historique, sethistorique] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [posteperpage, setposteperpage] = useState(16);
  const [query, setquery] = useState("");
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const fetchItems = async (page, limit) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/Matriel/get/history?page=${page}&limit=${limit}`
      );
      const { results, totalPages } = response.data.history;

      sethistorique(results.results);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error retrieving history:", error);
    }
  };
  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/Matriel/get/historyTicket?id=${query}`
      );
      sethistorique(response.data.results);
    } catch (error) {
      console.error("Error retrieving history:", error);
    }
  };
  useEffect(() => {
    fetchItems(currentPage, posteperpage);
  }, [currentPage]);
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    return formattedDate;
  }
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchHistory();
    }
  };
  const generatePaginationNavigation = () => {
    const navigation = [];
    for (let i = 1; i <= totalPages; i++) {
      navigation.push(
        <li
          key={i}
          onClick={() => handlePageClick(i)}
          className={i === currentPage ? "page-item active" : "page-item"}>
          <a href="#qd" className="page-link ">
            {i}
          </a>
        </li>
      );
    }
    return navigation;
  };
  return (
    <div className="projects p-10 bg-white rounded-xl m-20">
      <div className="w-full flex justify-center flex-col">
        <h2 class="mt-0 mb-5 text-center">Stock History</h2>
        <div id="Search-Bar" className="mx-auto my-5">
          <i className="fa fa-search"></i>
          <input
            type="text"
            name="query"
            onChange={(e) => setquery(e.target.value)}
            value={query}
            onKeyPress={handleKeyPress}
            className=" transition-all  h-14 py-3 px-12 rounded-xl border border-gray-300   focus:outline-stone-300"
            placeholder="Search anything..."
          />

          <i
            className="fa-solid fa-filter rightpen"
            onClick={() => {
              fetchItems(currentPage, posteperpage);
            }}></i>
        </div>
      </div>
      <div className="responsive-table">
        <table className="fs-15 w-full">
          <thead>
            <tr className="bg-gray-200 ">
              <th className="p-3">Ticket</th>
              <th>Item</th>
              <th>S/N Item</th>
              <th>For Who</th>
              <th>Technician Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {historique.map((ele) => {
              return (
                <tr>
                  <td>{ele.ticket}</td>
                  <td className=" capitalize">
                    {ele.item.type} &nbsp;
                    {ele.item.model}
                    &nbsp; x {ele.quantity || "1"}
                  </td>
                  <td>{ele.item.s_n}</td>
                  <td>Ahmed Kanoun</td>
                  <td>
                    {ele.technicien[0]}
                    &nbsp;
                    {ele.technicien[1]}
                  </td>
                  <td>{formatDate(ele.date)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="text-center my-8">
          <ul className="pagination flex justify-center">
            <li className="page-item disabled">
              <a
                href="#qsd"
                onClick={() => {
                  handlePageClick(currentPage - 1);
                }}
                disabled={currentPage === 1}>
                <i className="fa fa-long-arrow-left" /> Previous
              </a>
            </li>
            {generatePaginationNavigation()}
            <li className="page-item">
              <a
                href="#qsd"
                className="page-link"
                onClick={() => {
                  handlePageClick(currentPage + 1);
                }}
                disabled={currentPage === totalPages}>
                Next <i className="fa fa-long-arrow-right" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
