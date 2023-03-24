import React from "react";

function Filter() {
  return (
    <div class="flex gap-8">
      <div class="relative">
        <details class="group [&_summary::-webkit-details-marker]:hidden">
          <summary class="flex items-center gap-2 pb-1 text-gray-900 transition border-b border-gray-400 cursor-pointer hover:border-gray-600">
            <span class="text-sm font-medium"> Availability </span>

            {/* <span class="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span> */}
          </summary>

          <div class="z-50 group-open:absolute group-open:top-auto group-open:left-0 group-open:mt-2">
            <div class="bg-white border border-gray-200 rounded w-96">
              <header class="flex items-center justify-between p-4">
                <span class="text-sm text-gray-700"> 0 Selected </span>

                <button
                  type="button"
                  class="text-sm text-gray-900 underline underline-offset-4"
                >
                  Reset
                </button>
              </header>

              <ul class="p-4 space-y-1 border-t border-gray-200">
                <li>
                  <label
                    for="FilterInStock"
                    class="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterInStock"
                      class="w-5 h-5 border-gray-300 rounded"
                    />

                    <span class="text-sm font-medium text-gray-700">
                      In Stock (5+)
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    for="FilterPreOrder"
                    class="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterPreOrder"
                      class="w-5 h-5 border-gray-300 rounded"
                    />

                    <span class="text-sm font-medium text-gray-700">
                      Pre Order (3+)
                    </span>
                  </label>
                </li>

                <li>
                  <label
                    for="FilterOutOfStock"
                    class="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id="FilterOutOfStock"
                      class="w-5 h-5 border-gray-300 rounded"
                    />

                    <span class="text-sm font-medium text-gray-700">
                      Out of Stock (10+)
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </details>
      </div>

      {/* <div class="relative">
        <details class="group [&_summary::-webkit-details-marker]:hidden">
          <summary class="flex items-center gap-2 pb-1 text-gray-900 transition border-b border-gray-400 cursor-pointer hover:border-gray-600">
            <span class="text-sm font-medium"> Price </span>

            <span class="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>

          <div class="z-50 group-open:absolute group-open:top-auto group-open:left-0 group-open:mt-2">
            <div class="bg-white border border-gray-200 rounded w-96">
              <header class="flex items-center justify-between p-4">
                <span class="text-sm text-gray-700">
                  The highest price is $600
                </span>

                <button
                  type="button"
                  class="text-sm text-gray-900 underline underline-offset-4"
                >
                  Reset
                </button>
              </header>

              <div class="p-4 border-t border-gray-200">
                <div class="flex justify-between gap-4">
                  <label for="FilterPriceFrom" class="flex items-center gap-2">
                    <span class="text-sm text-gray-600">$</span>

                    <input
                      type="number"
                      id="FilterPriceFrom"
                      placeholder="From"
                      class="w-full border-gray-200 rounded-md shadow-sm sm:text-sm"
                    />
                  </label>

                  <label for="FilterPriceTo" class="flex items-center gap-2">
                    <span class="text-sm text-gray-600">$</span>

                    <input
                      type="number"
                      id="FilterPriceTo"
                      placeholder="To"
                      class="w-full border-gray-200 rounded-md shadow-sm sm:text-sm"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </details>
      </div> */}
    </div>
  );
}

export default Filter;
