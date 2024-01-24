import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export default function UpdateStock() {
  const [query, setquery] = useState("");
  const [pcTable, setPctable] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [posteperpage, setposteperpage] = useState(12);
  const [userData, setUserData] = useState();
  const [count, setCount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pcUpdate, setUpdate] = useState({
    ram: { typeram: "", stockageram: "", isEditing: true },
    stockage1: { stockage1: "", typestk1: "", isEditing: true },
    stockage2: { stockage2: "", typestk2: "", isEditing: true },
  });
  const determineTableHeaders = (data) => {
    const headers = [];
    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (!headers.includes(key)) {
          headers.push(key);
        }
      });
    });
    return headers;
  };
  useEffect(() => {
    const getUserById = async () => {
      var token = Cookies.get("token");

      try {
        const response = await axios.get(`http://localhost:8000/api/ath/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (!userData) getUserById();
  });
  const GetPcTable = async () => {
    axios
      .get(
        `http://localhost:8000/api/Matriel/get/filter?groupe=${selectedCategory}&query=${query}&page=${currentPage}&limit=${posteperpage}`
      )
      .then((res) => {
        const { results, totalPages } = res.data.pc;
        setTotalPages(totalPages);

        setPctable(results.results);
        setHeaders(determineTableHeaders(results.results));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const UpdatePc = async (id) => {
    axios
      .put(`http://localhost:8000/api/Matriel/updatePc/${id}`, pcUpdate)
      .then((res) => {
        console.log(pcUpdate);
        setPctable((entry) =>
          entry.map((data) =>
            data._id === id
              ? {
                  ...data,
                  isEditing: !data.isEditing,
                }
              : data
          )
        );
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const UpdateQuantity = async (id, count) => {
    axios
      .put(`http://localhost:8000/api/Matriel/updateQuantity/${id}`, { count })
      .then((res) => {
        setPctable((entry) =>
          entry.map((data) =>
            data._id === id
              ? {
                  ...data,
                  isEditing: !data.isEditing,
                  quantity: count,
                }
              : data
          )
        );
        console.log(res.data);
      })

      .catch((e) => {
        console.log(e);
      });
  };
  const deletItem = async (id) => {
    axios
      .delete(`http://localhost:8000/api/Matriel/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        setPctable((prevstate) => prevstate.filter((item) => item._id !== id));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEdit = (property, id) => {
    setPctable((entry) =>
      entry.map((data) =>
        data._id === id
          ? {
              ...data,
              [property]: {
                ...data[property],
                isEditing: !data[property].isEditing,
              },
            }
          : data
      )
    );
  };
  const handleEditQuantity = (id) => {
    setPctable((entry) =>
      entry.map((data) =>
        data._id === id
          ? {
              ...data,
              isEditing: !data.isEditing,
            }
          : data
      )
    );
  };

  const handleValueChange = (event, property, name) => {
    const value = event.target.value;

    setUpdate((prevProduct) => ({
      ...prevProduct,
      [property]: {
        ...prevProduct[property],
        [name]: value,
      },
    }));
  };
  const renderRam = (ram, id) => {
    return (
      <div className="flex flex-row justify-between gap-2 items-center w-48">
        {ram.isEditing ? (
          <div className="flex flex-row">
            <select
              className="round mx-2"
              name="typeram"
              value={ram.typeram}
              onChange={(e) => handleValueChange(e, "ram", "typeram")}
              aria-label=".round-sm example"
              required>
              <option>Type</option>
              <option value="DDR3">DDR3</option>
              <option value="DDR4">DDR4</option>
            </select>
            <input
              type="text"
              className="form-control w-8 border rounded-md p-1"
              placeholder="GB"
              value={ram.stockageram}
              onChange={(e) => handleValueChange(e, "ram", "stockageram")}
              name="ram"
            />
          </div>
        ) : (
          <div className="flex flex-row justify-between items-center gap-4">
            <p>{ram.typeram}</p>
            <p>{ram.stockageram}</p>
          </div>
        )}
        <i class="fa-solid fa-pen" onClick={() => handleEdit("ram", id)}></i>
      </div>
    );
  };
  const renderStockage2 = (stockage2, id) => {
    return (
      <div className="flex flex-row justify-between gap-2 items-center  w-48">
        {stockage2.isEditing ? (
          <div className="flex flex-row">
            <select
              className="round mx-2"
              name="typeskt2"
              value={stockage2.typestk2}
              onChange={(e) => handleValueChange(e, "stockage2", "typestk2")}
              aria-label=".round-sm example">
              <option>Type</option>
              <option value="SSD">SSD</option>
              <option value="HDD">HDD</option>
            </select>
            <input
              type="text"
              className="form-control w-12 border rounded-md p-1"
              placeholder="GB"
              value={stockage2.stockage2}
              onChange={(e) => handleValueChange(e, "stockage2", "stockage2")}
              name="stockage2"
            />
          </div>
        ) : (
          <div className="flex flex-row justify-between gap-4">
            <p>{stockage2.typestk2}</p>
            <p>{stockage2.stockage2}</p>
          </div>
        )}
        <i
          class="fa-solid fa-pen"
          onClick={() => handleEdit("stockage2", id)}></i>
      </div>
    );
  };
  const renderStockage1 = (stockage1, id) => {
    return (
      <div className="flex flex-row justify-between gap-2 items-center w-48">
        {stockage1.isEditing ? (
          <div className="flex flex-row">
            <select
              className="round mx-2"
              name="typeskt1"
              value={stockage1.typestk1}
              onChange={(e) => handleValueChange(e, "stockage1", "typestk1")}
              aria-label=".round-sm example">
              <option>Type</option>
              <option value="SSD">SSD</option>
              <option value="HDD">HDD</option>
            </select>
            <input
              type="text"
              className="form-control w-12 border rounded-md p-1"
              placeholder="GB"
              value={stockage1.stockage1}
              onChange={(e) => handleValueChange(e, "stockage1", "stockage1")}
              name="stockage1"
            />
          </div>
        ) : (
          <div className="flex flex-row justify-between gap-4">
            <span>{stockage1.typestk1}</span>
            <span>{stockage1.stockage1}</span>
          </div>
        )}

        <i
          class="fa-solid fa-pen"
          onClick={() => handleEdit("stockage1", id)}></i>
      </div>
    );
  };
  const renderQuantity = (quantity, id, isEditing) => {
    return (
      <div className="flex flex-row justify-around items-center w-full">
        {isEditing ? (
          <input
            type="text"
            className="form-control w-16 border rounded-md p-1"
            placeholder={quantity}
            value={count}
            name={count}
            onChange={(e) => setCount(e.target.value)}
          />
        ) : (
          <p>{quantity}</p>
        )}

        <i class="fa-solid fa-pen" onClick={() => handleEditQuantity(id)}></i>
      </div>
    );
  };
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
      GetPcTable();
    }
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
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
    <>
      <div>
        <h2>Search For The Item By Name Or Model Or Serial Number</h2>
      </div>
      <div className="flex flex-row ">
        <div className="my-5 togller relative">
          <button className="border border-gray-300 p-3 rounded-xl rounded-e-none border-e-0 h-14 font-semibold w-32 capitalize">
            {selectedCategory ? selectedCategory : "Categorys"}
            <i class="fa-solid fa-caret-down ms-3 "></i>
          </button>
          <ul className="bg-gray-100  w-11/12 mx-auto rounded-b-xl ms-2 menu ">
            <li
              onClick={() => {
                setSelectedCategory("adaptateur");
              }}>
              Adaptateur
            </li>
            <li
              onClick={() => {
                setSelectedCategory("pc");
              }}>
              Pc
            </li>
            <li
              onClick={() => {
                setSelectedCategory("cable");
              }}>
              Cable
            </li>
            <li
              onClick={() => {
                setSelectedCategory("accessoires");
              }}>
              Accessoires
            </li>
            <li
              onClick={() => {
                setSelectedCategory("ecran");
              }}>
              Ecran
            </li>
          </ul>
        </div>
        <div id="Search-Bar" className="my-5">
          <i className="fa fa-search"></i>
          <input
            type="text"
            name="query"
            onChange={(e) => setquery(e.target.value)}
            value={query}
            onKeyPress={handleKeyPress}
            className=" transition-all  h-14 py-3 px-12 rounded-xl border border-gray-300  rounded-s-none  focus:outline-stone-300"
            placeholder="Search anything..."
          />

          <i className="fa-solid fa-filter rightpen" onClick={GetPcTable}></i>
        </div>
      </div>
      <div
        className="responsive-table overflow-x-scroll"
        style={{ width: "70vw" }}>
        <table className="fs-15 " style={{ width: "65vw" }}>
          <thead>
            {headers?.map((header) => (
              <th key={header} className="tablehead HideCh">
                {header}
              </th>
            ))}
            {headers.length > 0 && (
              <>
                <th className="tablehead">Update</th>
                <th className="tablehead">Delete</th>
              </>
            )}
          </thead>
          <tbody>
            {pcTable.map((item, index) => (
              <>
                <tr key={index}>
                  {headers.map((header) => (
                    <td key={header} className="tabledata  HideCh capitalize">
                      {header === "date"
                        ? formatDate(item.date)
                        : header === "quantity"
                        ? renderQuantity(
                            item.quantity,
                            item._id,
                            item.isEditing
                          )
                        : header === "ram" && typeof item.ram === "object"
                        ? renderRam(item.ram, item._id)
                        : header === "stockage1" &&
                          typeof item.stockage1 === "object"
                        ? renderStockage1(item.stockage1, item._id)
                        : header === "stockage2" &&
                          typeof item.stockage2 === "object"
                        ? renderStockage2(item.stockage2, item._id)
                        : typeof item[header] === "object"
                        ? Object.values(item[header]).join(" ")
                        : item[header]}
                    </td>
                  ))}
                  <td className="tabledata relative">
                    {" "}
                    <button
                      type="submit"
                      onClick={
                        item.groupe !== "pc"
                          ? () => UpdateQuantity(item._id, count)
                          : () => UpdatePc(item._id)
                      }
                      className=" rounded-full p-2  text-white font-semibold">
                      <i class="fa-solid fa-circle-chevron-up  text-green-600  text-2xl"></i>
                    </button>
                  </td>
                  <td className="tabledata relative">
                    {" "}
                    <button
                      type="submit"
                      onClick={() => deletItem(item._id)}
                      className="rounded-xl p-2  text-white font-semibold ">
                      <i class="fa-solid fa-trash text-red-600 text-2xl"></i>
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        {headers.length > 0 && (
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
        )}
      </div>
    </>
  );
}
