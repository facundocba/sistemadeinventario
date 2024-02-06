import React, { useState, useEffect, useContext } from "react";
import ReactPaginate from "react-paginate";
import AddPurchaseDetails from "../components/AddPurchaseDetails";
import AuthContext from "../AuthContext";

function PurchaseDetails() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [purchase, setAllPurchaseData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20; // Ajusta la cantidad de elementos por página según tus necesidades

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, [updatePage]);

  // Fetching Data of All Purchase items and Products
  const fetchData = async () => {
    try {
      const purchaseResponse = await fetch(`http://localhost:4000/api/purchase/get/${authContext.user}`);
      const purchaseData = await purchaseResponse.json();
      setAllPurchaseData(purchaseData);

      const productsResponse = await fetch(`http://localhost:4000/api/product/get/${authContext.user}`);
      const productsData = await productsResponse.json();
      setAllProducts(productsData);
    } catch (err) {
      console.error(err);
    }
  };

  // Modal for Sale Add
  const addSaleModalSetting = () => {
    setPurchaseModal(!showPurchaseModal);
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  const handlePageClick = (selected) => {
    setCurrentPage(selected.selected);
  };

  const visiblePurchase = purchase.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        {showPurchaseModal && (
          <AddPurchaseDetails
            addSaleModalSetting={addSaleModalSetting}
            products={products}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Ingresos</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addSaleModalSetting}
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
                  Nombre del medicamento
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Cantidad
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Fecha
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Responsable 
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {visiblePurchase.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.ProductID?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.QuantityPurchased}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {new Date(element.PurchaseDate).toLocaleDateString() ===
                      new Date().toLocaleDateString()
                        ? "Today"
                        : element.PurchaseDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.TotalPurchaseAmount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="pagination-container flex justify-center mt-4">
          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Siguiente"}
            pageCount={Math.ceil(purchase.length / itemsPerPage)}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
}

export default PurchaseDetails;
