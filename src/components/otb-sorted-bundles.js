import React, { useState, useEffect } from "react";
import BundleCard from "./otb-bundles";

const TravelBundles = () => {
  const [sortOption, setSortOption] = useState("price"); // Default sorting option
  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    const fetchBundlesData = async () => {
      try {
        const response = await fetch("../json/bundles.json");
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
  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  // Function to sort bundles based on the selected sort option
  const sortBundles = () => {
    if (sortOption === "price") {
      return bundles.sort((a, b) => a.totalPrice - b.totalPrice);
    } else if (sortOption === "alphabetically") {
      return bundles.sort((a, b) => a.hotelName.localeCompare(b.hotelName));
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
        <div
          className={`sort-option ${sortOption === "price" ? "active" : ""}`}
          onClick={() => handleSortOptionChange("price")}
        >
          Sort by Price
          <i className="fa fa-tags"></i>
        </div>
        <div
          className={`sort-option ${sortOption === "alphabetically" ? "active" : ""}`}
          onClick={() => handleSortOptionChange("alphabetically")}
        >
          Sort Alphabetically
          <i className="fa fa-font"></i>
        </div>
        <div
          className={`sort-option ${sortOption === "rating" ? "active" : ""}`}
          onClick={() => handleSortOptionChange("rating")}
        >
          Sort by Star Rating
          <i className="fa fa-star"></i>
        </div>
      </div>
      <div className="bundle-list">{renderBundles()}</div>
    </div>
  );
};

export default TravelBundles;
