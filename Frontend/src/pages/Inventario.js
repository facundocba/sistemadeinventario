import React, { useState, useEffect, useContext, useCallback } from "react";
import ReactPaginate from "react-paginate";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import AuthContext from "../AuthContext";

function Inventory() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatePage, setUpdatePage] = useState(true);
  const [stores, setAllStores] = useState([]);  
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20; // Ajusta la cantidad de elementos por página según tus necesidades

  const authContext = useContext(AuthContext);

  const fetchProductsData = useCallback(() => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  }, [authContext.user]);

  const fetchSearchData = useCallback(() => {
    fetch(`http://localhost:4000/api/product/search?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  }, [searchTerm]);

  const fetchSalesData = useCallback(() => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  }, [authContext.user]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchProductsData();
      await fetchSalesData();
    };

    fetchData();
  }, [fetchProductsData, fetchSalesData, updatePage]);

  const addProductModalSetting = () => {
    setShowProductModal(!showProductModal);
  };

  const updateProductModalSetting = (selectedProductData) => {
    setUpdateProduct(selectedProductData);
    setShowUpdateModal(!showUpdateModal);
  };

  const deleteItem = (id) => {
    fetch(`http://localhost:4000/api/product/delete/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdatePage(!updatePage);
      });
  };

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchData();
  };

  const handlePageClick = (selected) => {
    setCurrentPage(selected.selected);
  };

  const visibleProducts = products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        <div className="bg-white rounded p-3">
          <span className="font-semibold px-4">Inventario General</span>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="flex flex-col p-10 w-full md:w-3/12">
              <span className="font-semibold text-blue-600 text-base">
                Total Medicamentos
              </span>
              <span className="font-semibold text-gray-600 text-base">
                {products.length}
              </span>
              <span className="font-thin text-gray-400 text-xs">
                Ultimos 7 dias
              </span>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12 sm:border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-yellow-600 text-base">
                Centros de salud
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    {stores.length}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Ultimos 7 dias
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12 sm:border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-purple-600 text-base">
                Egresos
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    -
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Ultimos 7 dias
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    
                  </span>
                  <span className="font-thin text-gray-400 text-xs"></span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12 border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-red-600 text-base">
                Stock
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    -
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Stock
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    -
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Sin stock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showProductModal && (
          <AddProduct
            addProductModalSetting={addProductModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
          <UpdateProduct
            updateProductData={updateProduct}
            updateModalSetting={updateProductModalSetting}
          />
        )}

        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Medicamento</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md ">
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="Buscar por nombre"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addProductModalSetting}
                style={{ backgroundColor: '#E91E63' }}
              >
                Agregar
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Medicamento
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Vencimiento
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Stock
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Origen
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Disponibilidad
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Opciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {visibleProducts.map((element, index) => (
                <tr key={element._id}>
                  <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                    {element.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.manufacturer}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.stock}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.description}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.stock > 0 ? "En Stock" : "Sin Stock"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <span
                      className="text-green-700 cursor-pointer"
                      onClick={() => updateProductModalSetting(element)}
                    >
                      Editar{" "}
                    </span>
                    <span
                      className="text-red-600 px-2 cursor-pointer"
                      onClick={() => deleteItem(element._id)}
                    >
                      Borrar
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
      <div className="pagination-container flex justify-center mt-4">
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Siguiente"}
          pageCount={Math.ceil(products.length / itemsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          
        />
      </div>
      </div>
    </div>
  );
}

export default Inventory;
