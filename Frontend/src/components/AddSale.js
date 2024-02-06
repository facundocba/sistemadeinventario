import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddSale({
  addSaleModalSetting,
  products,
  stores,
  handlePageUpdate,
  authContext
}) {
  const [sale, setSale] = useState({
    userID: authContext.user,
    productID: "",
    storeID: "",
    stockSold: "",
    saleDate: "",
    totalSaleAmount: "",
  });
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]); // Define filteredProducts state

  
  const handleInputChange = (key, value) => {
    setSale({ ...sale, [key]: value });
  };
  
  // Filtrar productos 
 useEffect(() => {
    if (searchTerm.trim() !== "") {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("Filtered Products:", filtered);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  // Filtrar productos por nombre
  const handleResultClick = (productId, productName) => {   
    
    setSale({ ...sale, productID: productId });
    setSearchTerm(""); 
    setShowResults(false);    
    setSearchTerm(productName);
  };

  // POST Data
  const addSale = () => {
    fetch("http://localhost:4000/api/sales/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(sale),
    })
      .then((result) => {
        //alert("Sale ADDED");
        handlePageUpdate();
        addSaleModalSetting();
      })
      .catch((err) => console.log(err));
  };

  return (
    // Modal
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg overflow-y-scroll">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PlusIcon
                        className="h-6 w-6 text-blue-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                      <Dialog.Title
                        as="h3"
                        className="text-lg  py-4 font-semibold leading-6 text-gray-900 "
                      >
                        Agregar Egresos
                      </Dialog.Title>
                      <form action="#">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="productID"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Product Name
                            </label>
                            <input
                              type="text"
                              placeholder="Buscar..."
                              value={searchTerm}
                              onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setShowResults(true);
                              }}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                            {showResults && filteredProducts.length > 0 && (
                               
                              <ul className="bg-white border border-gray-300 rounded-md mt-1 shadow-md">
                                {filteredProducts.map((result) => (
                                  <li
                                    key={result._id}
                                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => 
                                      handleResultClick(
                                        result._id,
                                        `${result.name} - ${result.manufacturer}`
                                      )
                                      
                                      
                                    }
                                  >
                                    {result.name} - {result.manufacturer}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor="stockSold"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Stock Sold
                            </label>
                            <input
                              type="number"
                              name="stockSold"
                              id="stockSold"
                              value={sale.stockSold}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="0 - 999"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="storeID"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Store Name
                            </label>
                            <select
                              id="storeID"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              name="storeID"
                              value={sale.storeID}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                            >
                              <option value="">Seleccionar</option>
                              {stores.map((element) => (
                                <option key={element._id} value={element._id}>
                                  {element.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="totalSaleAmount"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Total Sale Amount
                            </label>
                            <input
                              type="string"
                              name="totalSaleAmount"
                              id="price"
                              value={sale.totalSaleAmount}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Descripcion"
                            />
                          </div>
                          <div className="h-fit w-fit">
                            <label
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              htmlFor="salesDate"
                            >
                              Sales Date
                            </label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              type="date"
                              id="saleDate"
                              name="saleDate"
                              value={sale.saleDate}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 justify-end">
                          <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                            onClick={addSale}
                            style={{ backgroundColor: '#E91E63' }}
                          >
                            Confirmar
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={() => addSaleModalSetting()}
                            ref={cancelButtonRef}
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
