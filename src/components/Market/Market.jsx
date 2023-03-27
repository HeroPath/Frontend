import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./market.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { headers } from "../../functions/utilities";
import { get, deleteRequest } from "../../functions/requestsApi";

import ItemTooltip from "../ItemTooltip";

const Market = () => {
  let myMarketCounter = 1;
  let marketCounter = 1;

  const [myMarket, setMyMarket] = useState([]);
  const [markets, setMarkets] = useState([]);

  async function getMarket() {
    const responseMarket = await get("/api/v1/market", headers);
    if (responseMarket.status === 200) {
      setMarkets(responseMarket.data);
    }
  }

  async function getMyMarket() {
    const responseMyMarket = await get("/api/v1/market/me", headers);
    if (responseMyMarket.status === 200) {
      setMyMarket(responseMyMarket.data);
    }
  }

  async function handleBuyItemMarket(marketId) {
    const response = await get("/api/v1/market/buy/" + marketId, headers);
    if (response.status === 200) window.location.href = "/profile";
  }

  async function handleRemoveItemMarket(marketId) {
    const response = await deleteRequest("/api/v1/market/" + marketId, headers);
    if (response.status === 200) window.location.reload();
  }

  useEffect(() => {
    getMarket();
    getMyMarket();
  }, []);

  return (
    <div className="market">
      {myMarket.length >= 1 && (
        <div className="divMarket">
          <h1>My Market</h1>

          <Table className="market_table" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Gold</th>
                <th>Diamonds</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myMarket.map((myMarket, index) => (
                <tr key={myMarket.id}>
                  <td>{myMarketCounter++}</td>
                  <td>
                    <div key={index} id={myMarket.item.id} style={ItemStyle}>
                      <ItemTooltip item={myMarket.item} />
                    </div>
                  </td>
                  <td>{myMarket.goldPrice.toLocaleString()}</td>
                  <td>{myMarket.diamondPrice.toLocaleString()}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        handleRemoveItemMarket(myMarket.id);
                      }}
                    >
                      REMOVE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <div className="divMarket">
        <h1>Market</h1>

        <Table className="market_table" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Gold</th>
              <th>Diamonds</th>
              <th>User seller</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((market, index) => (
              <tr key={market.id}>
                <td>{marketCounter++}</td>
                <td>
                  <div key={index} id={market.item.id} style={ItemStyle}>
                    <ItemTooltip item={market.item} />
                  </div>
                </td>
                <td>{market.goldPrice.toLocaleString()}</td>
                <td>{market.diamondPrice.toLocaleString()}</td>
                <td>{market.usernameSeller}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      handleBuyItemMarket(market.id);
                    }}
                  >
                    BUY
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Market;

const ItemStyle = {
  display: "flex",
  maxWidth: "36px",
  maxHeight: "36px",
  justifyContent: "center",
  margin: "0 auto",
};
