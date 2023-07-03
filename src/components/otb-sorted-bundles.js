import React, { useState, useEffect } from "react";
import BundleCard from "./otb-bundles";

const TravelBundles = () => {
  const [sortOption, setSortOption] = useState("price"); // Default sorting option
  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    const fetchBundlesData = async () => {
      try {
        const response = await fetch("/json/bundles.json");
        if (!response.ok) {
          throw new Error("Failed to fetch bundle data.");
        }
        const data = await response.json();
        setBundles(data.bundles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBundlesData();
  }, []);

  // Function to handle sorting option change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Function to sort bundles based on the selected sort option
  const sortBundles = () => {
    if (sortOption === "price") {
      return bundles.sort((a, b) => a.totalPrice - b.totalPrice);
    } else if (sortOption === "alphabetically") {
      return bundles.sort((a, b) =>
        a.hotelName.localeCompare(b.hotelName)
      );
    } else if (sortOption === "rating") {
      return bundles.sort((a, b) => b.rating - a.rating);
    }
  };

  // Render the sorted BundleCard components
  const renderBundles = () => {
    const sortedBundles = sortBundles();

    return sortedBundles.map((bundle, index) => (
        <BundleCard key={index} {...bundle} overview={bundle.overview} />
    ));
  };

  return (
    <div id="main-container">
      <div className="sort-options">
        <label>
          Sort by:
          <select value={sortOption} onChange={handleSortChange}>
            <option value="price">Price</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="rating">Rating</option>
          </select>
        </label>
      </div>
      <div className="bundle-list">{renderBundles()}</div>
    </div>
  );
};

export default TravelBundles;
