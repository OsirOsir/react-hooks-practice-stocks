import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";


function MainContainer() {
  const [stocks, setStocks]  = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [filterType, setFilterType] = useState("");



  useEffect(() => {
    fetchStocks()
  }, [])
  const fetchStocks = () => {
    fetch("http://localhost:3001/stocks")
    .then((res) => res.json())
    .then((data) => setStocks(data));
  };

 const buyStock = (stock) => {
    setPortfolio([...portfolio, stock]);
  };

  const sellStock = (stock) => {
    setPortfolio(portfolio.filter((item) => item.id !== stock.id));
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortType === "Alphabetically") {
      return a.name.localeCompare(b.name);
    } else if (sortType === "Price") {
      return a.price - b.price;
    }
    return 0;
  });

  const filteredStocks = sortedStocks.filter((stock) => {
    if (filterType === "") {
      return true;
    }
    return stock.type === filterType;
  });

  return (
    <div>
      <SearchBar setSortType={setSortType} setFilterType={setFilterType} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} handleStockClick={buyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} handleStockClick={sellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
