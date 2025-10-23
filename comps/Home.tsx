"use client";
import { useState } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}

const Home = ({ products, bannerData }: HomeProps) => {
  const [sortOrder, setSortOrder] = useState<string>("lowToHigh");

  // USD to JPY conversion rate
  const USD_TO_JPY_CONVERSION_RATE = 150;

  // function to handle sorting
  const sortProducts = (order: string, products: ProductsTypes[]) => {
    const sortedProducts = [...products];
    if (order === "lowToHigh") {
      return sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === "highToLow") {
      return sortedProducts.sort((a, b) => b.price - a.price);
    }
    return sortedProducts;
  };

  // Convert USD price to JPY and format with the Yen symbol and commas
  const convertToYen = (price: number) => {
    const yenPrice = price * USD_TO_JPY_CONVERSION_RATE; // Convert USD to JPY
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(yenPrice); // Format the price as JPY
  };

  // Handle dropdown change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  return (
    <main>
      {/* === MAIN BANNER */}
      <MainBanner banner={bannerData[0]} />

      <section className="mb-4 flex items-center flex-col">
        <h1
          className="headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary
         font-sans font-extrabold sm:rounded-t-3xl"
        >
          Best Selling Headphones
        </h1>
      </section>

      {/* === SORTING DROPDOWN */}
      <section className="mb-4 flex justify-end mx-8">
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </section>

      {/* === SHOW PRODUCTS */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3
       gap-4 lg:mx-20 overflow-hidden"
      >
        {/* === MAP PRODUCTS with sorting and formatted prices */}
        {sortProducts(sortOrder, products)?.map((product: ProductsTypes) => {
          // Convert price to Yen before passing to Products component
          const convertedPrice = convertToYen(product.price);

          return (
            <Products
              key={product._id}
              products={{ ...product, price: convertedPrice }}
              gap="gap-4"
            />
          );
        })}
      </section>

      {/* ==== FOOTER BANNER */}
      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
