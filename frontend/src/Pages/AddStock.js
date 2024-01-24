import { React, useState, useEffect } from "react";
import axios from "axios";

export default function AddStock() {
  const [selectedValue, setSelectedValue] = useState("");

  const [formDataPc, setformData] = useState({
    groupe: "pc",
    type: "",
    model: "",
    s_n: "",
    n_i: "",
    ram: {
      stockageRam: "",
      typeRam: "",
    },
    stockage1: {
      typestk1: "",
      stockage1: "",
    },
    stockage2: {
      typestk2: "",
      stockage2: "",
    },
    processeur: "",
    carte_graphique: "",
  });

  const handleChangeSelectedValue = (event) => {
    setSelectedValue(event.target.value);
  };

  const [formDataEcran, setformDataEcran] = useState({
    groupe: "ecran",
    mark: "",
    model: "",
    s_n: "",
    n_i: "",
    size: "",
  });
  const [formDataCable, setformDataCable] = useState({
    groupe: "cable",
    type: "",
    height: "1.5",
    quantity: "",
  });
  const [formDataAdaptateur, setformDataAdaptateur] = useState({
    groupe: "adaptateur",
    type: "",
    quantity: "",
  });
  const [formDataAccessoires, setformDataAccessoires] = useState({
    groupe: "accessoires",
    type: "",
    quantity: "",
  });
  const handleSubmitPc = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Matriel/add/pc",

        formDataPc
      );
      console.log(formDataPc);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitEcran = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Matriel/add/ecran",

        formDataEcran
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitcable = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Matriel/add/cable",

        formDataCable
      );

      console.log(formDataCable);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitaccessoires = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Matriel/add/accessoires",

        formDataAccessoires
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddaptateur = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Matriel/add/adap",

        formDataAdaptateur
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleNestedObj = (event, property) => {
    const { name, value } = event.target;
    setformData((prevData) => ({
      ...prevData,
      [property]: {
        ...prevData[property],
        [name]: value,
      },
    }));
  };
  function HandleChange(event) {
    const { name, value } = event.target;
    setformData((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
    setformDataEcran((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
    setformDataCable((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
    setformDataAccessoires((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
    setformDataAdaptateur((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }

  return (
    <div defaultactivekey="home" id="stock" className="mb-3 ">
      <div eventkey="home" title="Add Items To Storage">
        <div className="flex">
          <select
            className="round mx-auto my-8  round border-slate-400 outline-slate-400"
            aria-label=".round-lg example"
            value={selectedValue}
            onChange={handleChangeSelectedValue}>
            <option>Select Items Type</option>
            <option value="Pc" name="pc">
              Pc
            </option>
            ange
            <option value="Ecran" name="ecran">
              Ecran
            </option>
            <option value="Cable" name="Cabel">
              Cable
            </option>
            <option value="Accessoires" name="accessoires">
              Accessoires
            </option>
            <option value="Adaptateur" name="Adaptateur">
              Adaptateur
            </option>
          </select>
        </div>
        {selectedValue === "Pc" && (
          <div>
            <h2 className="text-center">Add New Pc To Storage</h2>
            <form
              onSubmit={handleSubmitPc}
              className="d-grid gap-4 mx-3 my-5 text-start ">
              <div className="me-auto">
                <div className="mx-3">
                  <label>Type</label>
                  <select
                    className="round "
                    name="type"
                    value={formDataPc.type}
                    onChange={HandleChange}
                    aria-label=".round-sm example">
                    <option>Type</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Laptop">Laptop</option>
                  </select>
                </div>

                <div className="mx-3">
                  <label>Model</label>
                  <input
                    type="text"
                    name="model"
                    value={formDataPc.model}
                    onChange={HandleChange}
                    className="form-control"
                    required></input>
                </div>
                <div className="mx-3">
                  <label>S/N</label>
                  <input
                    type="text"
                    name="s_n"
                    value={formDataPc.s_n}
                    onChange={HandleChange}
                    className="form-control"
                    required></input>
                </div>
                <div className="my-4">
                  <label>N/Inventaire</label>
                  <input
                    type="text"
                    name="n_i"
                    value={formDataPc.n_i}
                    onChange={HandleChange}
                    className="form-control"></input>
                </div>
              </div>
              <h2 className="my-3 text-center">Caracteristique</h2>
              <div className="d-flex flex-column flex-lg-row gap-4  me-auto">
                <div className="row gap-4  my-5 text-start">
                  <div className="col-lg-2 col-8">
                    <div className="input-group mb-3">
                      <label className="w-100">Ram</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="GB"
                        name="stockageRam"
                        onChange={(e) => handleNestedObj(e, "ram")}
                        value={formDataPc.ram.stockageRam}
                      />
                      <span className="input-group-text">GB</span>
                      <select
                        className="round mx-2"
                        name="typeRam"
                        type="text"
                        value={formDataPc.ram.typeRam}
                        onChange={(e) => handleNestedObj(e, "ram")}
                        aria-label=".round-sm example">
                        <option>Type</option>
                        <option value="DDR3">DDR3</option>
                        <option value="DDR4">DDR4</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-2 col-8">
                    <div className="input-group mb-3">
                      <label className="w-100">Stockage</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="GB"
                        name="stockage1"
                        aria-describedby="basic-addon2"
                        onChange={(e) => handleNestedObj(e, "stockage1")}
                        value={formDataPc.stockage1.stockage1}
                      />
                      <span className="input-group-text" id="basic-addon2">
                        GB
                      </span>
                      <select
                        className="round mx-2"
                        onChange={(e) => handleNestedObj(e, "stockage1")}
                        type="text"
                        name="typestk1"
                        value={formDataPc.stockage1.typestk1}
                        aria-label=".round-sm example">
                        <option>Type</option>
                        <option value="SSD">SSD</option>
                        <option value="HDD">HDD</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-2 col-8">
                    <div className="input-group mb-3">
                      <label className="w-100">Stockage</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="GB"
                        name="stockage2"
                        onChange={(e) => handleNestedObj(e, "stockage2")}
                        value={formDataPc.stockage2.stockage2}
                      />
                      <span className="input-group-text" id="basic-addon2">
                        GB
                      </span>
                      <select
                        className="round mx-2"
                        name="typestk2"
                        onChange={(e) => handleNestedObj(e, "stockage2")}
                        value={formDataPc.stockage2.typestk2}
                        aria-label=".round-sm example">
                        <option>Type</option>
                        <option value="SSD">SSD</option>
                        <option value="HDD">HDD</option>
                      </select>
                    </div>
                  </div>
                  <br />

                  <div className="columns-12">
                    <label>Processeur</label>
                    <input
                      type="text"
                      name="processeur"
                      className="form-control"
                      onChange={HandleChange}
                      value={formDataPc.processeur}></input>
                  </div>
                  <div className="me-auto ">
                    <label>Carte Graphique</label>
                    <input
                      type="text"
                      name="carte_graphique"
                      className="form-control"
                      onChange={HandleChange}
                      value={formDataPc.carte_graphique}></input>
                  </div>
                  <div className=" me-auto">
                    <button type="submit" className="btn-green ms-3 w-24 ">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {selectedValue === "Ecran" && (
          <div>
            <h2 className="text-center">Add New Ecran To Storage</h2>
            <form
              onSubmit={handleSubmitEcran}
              className="d-grid gap-4 mx-3 my-5 text-start">
              <div className="d-flex flex-column flex-lg-row gap-4">
                <div className="col-lg-2 col-6">
                  <label>Mark</label>
                  <select
                    className="round "
                    aria-label=".round-sm example"
                    name="mark"
                    value={formDataEcran.mark}
                    onChange={HandleChange}>
                    <option>Mark</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Dell">Dell</option>
                    <option value="Tcl">Tcl</option>
                  </select>
                </div>

                <div className="col-lg-2 col-8">
                  <label>Model</label>
                  <input
                    type="text"
                    name="model"
                    value={formDataEcran.model}
                    onChange={HandleChange}
                    className="form-control"></input>
                </div>
                <div className="col-lg-2 col-8">
                  <label>S/N</label>
                  <input
                    type="text"
                    name="s_n"
                    value={formDataEcran.s_n}
                    onChange={HandleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-1 col-6">
                  <label>N/Inventaire</label>
                  <input
                    type="text"
                    name="n_i"
                    value={formDataEcran.n_i}
                    onChange={HandleChange}
                    className="form-control"></input>
                </div>

                <div className="col-lg-1 col-6">
                  <label>Size</label>
                  <select
                    className="round "
                    name="size"
                    value={formDataEcran.size}
                    onChange={HandleChange}
                    aria-label=".round-sm example">
                    <option>Select Size</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="22">22</option>
                    <option value="24">24</option>
                    <option value="27">27</option>
                  </select>
                </div>
                <div className="col-lg-1 col-6">
                  <button type="submit" className="btn-green">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {selectedValue === "Cable" && (
          <div>
            <h2 className="text-center">Add New Cable To Storage</h2>
            <form
              className="d-grid gap-4 mx-3 my-5 text-start"
              onSubmit={handleSubmitcable}>
              <div className="d-flex flex-column flex-lg-row gap-4">
                <div className="col-lg-2 col-8">
                  <label>Type Cabel</label>
                  <select
                    className="round"
                    name="type"
                    value={formDataCable.type}
                    onChange={HandleChange}>
                    <option>Select Cabel Type</option>
                    <option value="Alimentation">Alimentation</option>
                    <option value="Display">Display</option>

                    <option value="Hdmi">Hdmi</option>
                    <option value="Vga">Vga</option>
                    <option value="Dvi">Dvi</option>
                    <option value="Rj11">Rj11</option>
                    <option value="Rj45">Rj45</option>
                    <option value="C">C</option>
                    <option value="Micro Usb">Micro Usb</option>
                  </select>
                </div>

                <div className="col-lg-1 col-6">
                  <label>Height</label>
                  <input
                    type="text"
                    name="height"
                    placeholder="Default 1.5 M"
                    value={formDataCable.height}
                    onChange={HandleChange}
                    className="form-control"></input>
                </div>
                <div className="col-lg-1 col-6">
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    onChange={HandleChange}
                    value={formDataCable.quantity}
                    className="form-control"></input>
                </div>

                <div className="col-lg-1 col-6">
                  <button type="submit" className="btn-green">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        {selectedValue === "Adaptateur" && (
          <div>
            <h2 className="text-center">Add New Adaptateur To Storage</h2>
            <form
              className="d-grid gap-4 mx-3 my-5 text-start"
              onSubmit={handleAddaptateur}>
              <div className="d-flex flex-column flex-lg-row gap-4">
                <div className="col-lg-2 col-8">
                  <label>Adaptateur Type</label>
                  <select
                    name="type"
                    value={formDataAdaptateur.type}
                    onChange={HandleChange}
                    className="round text-capitalize">
                    <option>Select Adaptateur Type</option>
                    <option value="Hdmi to display">hdmi to display</option>
                    <option value="Hdmi to vga">Hdmi to vga</option>
                    <option value="vga to hdmi">vga to hdmi</option>
                    <option value="vga to display">vga to display</option>
                    <option value="hdmi to miniHdmi">hdmi to miniHdmi</option>
                    <option value="display to minihdmi">
                      display to minihdmi
                    </option>
                    <option value="minihdmi to Hdmi vga display">
                      minihdmi to Hdmi vga display
                    </option>
                  </select>
                </div>

                <div className="col-lg-1 col-6 ">
                  <label>Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    onChange={HandleChange}
                    value={formDataAdaptateur.quantity}
                    className="form-control"></input>
                </div>

                <div className="col-lg-1 col-6">
                  <button type="submit" className="btn-green">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        {selectedValue === "Accessoires" && (
          <div>
            <h2 className="text-center">Add New Adaptateur To Storage</h2>
            <form
              className="d-grid gap-4 mx-3 my-5 text-start"
              onSubmit={handleSubmitaccessoires}>
              <div className="d-flex flex-column flex-lg-row gap-4">
                <div className="col-lg-2 col-8">
                  <label>Accessoires Name</label>
                  <select
                    name="type"
                    value={formDataAccessoires.type}
                    onChange={HandleChange}
                    className="round text-capitalize">
                    <option>Select Accessoires Name</option>
                    <option value="Souris">Souris</option>
                    <option value="Clavier">Clavier</option>
                    <option value="Casque">Casque</option>
                  </select>
                </div>

                <div className="col-lg-1 col-6 ">
                  <label>Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    onChange={HandleChange}
                    value={formDataAccessoires.quantity}
                    className="form-control"></input>
                </div>

                <div className="col-lg-1 col-6">
                  <button type="submit" className="btn-green">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
