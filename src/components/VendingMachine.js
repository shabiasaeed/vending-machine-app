import React, { useReducer } from "react";
import Inventory from "./Inventory";
import PurchaseCancellation from "./PurchaseCancellation";
import ProductSelection from "./ProductSelection";
import cola from '../assets/cola.jpg';
import dietCoke from '../assets/diet-coke.png';
import limeSoda from '../assets/lime-soda.jpg';
import water from '../assets/water.png';
import vendingGif from '../assets/vending.gif';
import nickel from '../assets/nickle.jpeg';
import dime from '../assets/dime.jpg';
import quarter from '../assets/quarter.jpg';

const coinSound = new Audio('/coin-insert.wav');

// Initial state of the vending machine
const initialState = {
  balance: 0,
  inventory: {
    "Cola": { price: 25, stock: 10, imgUrl: cola },
    "Diet Cola": { price: 35, stock: 8, imgUrl: dietCoke },
    "Lime Soda": { price: 25, stock: 0, imgUrl: limeSoda },
    "Water": { price: 45, stock: 2, imgUrl: water },
  },
  coins: { nickel: 5, dime: 5, quarter: 5 },
  lastPurchased: null,
};

function vendingReducer(state, action) {
  switch (action.type) {
    case "DEPOSIT":
      return {
        ...state, balance: state.balance + action.value, coins: { ...state.coins, [action.coin]: state.coins[action.coin] + 1 },
      };
    case "CANCEL":
      return { ...state, balance: 0 };
    case "SELECT": {
      const drink = state.inventory[action.drink];
      // Check if te drink exists, is in stock, and if there is enough balance
      if (!drink || drink.stock === 0 || state.balance < drink.price) return state;
      return {
        ...state, balance: state.balance - drink.price,
        inventory: {
          ...state.inventory,
          [action.drink]: { ...drink, stock: drink.stock - 1 },
        },
        lastPurchased: action.drink,
      };
    }
    case "MONEY_BACK":
      return { ...state, balance: 0, lastPurchased: null };
    default:
      return state;
  }
}

export default function VendingMachine() {
  const [state, dispatch] = useReducer(vendingReducer, initialState);

  // Sound effect for when a coin is deposited
  const handleCoinDeposit = (coin) => {
    coinSound.play();
    dispatch({ type: "DEPOSIT", coin: coin.name, value: coin.value });
  };

  return (
    <div className="container text-center">
      <h1 className="title"><img src={vendingGif}  alt="Vending Machine Icon"  className="gif-icon" /> Vending Machine </h1>
      <ProductSelection 
        items={Object.entries(state.inventory).map(([key, value]) => ({ ...value, itemName: key }))} 
        purchaseItem={(e) => dispatch({ type: "SELECT", drink: e.target.getAttribute("data-value") })} 
      />
      <Inventory money={state.balance} />
      <div className="coins">
        <button onClick={() => handleCoinDeposit({ name: "nickel", value: 5 })} className="coin-button">
          <img src={nickel} alt="Nickel" className="coin-img" />
          <div className="coin-text">5¢</div>
        </button>

        <button onClick={() => handleCoinDeposit({ name: "dime", value: 10 })} className="coin-button">
          <img src={dime} alt="Dime" className="coin-img" />
          <div className="coin-text">10¢</div>
        </button>

        <button onClick={() => handleCoinDeposit({ name: "quarter", value: 25 })} className="coin-button">
          <img src={quarter} alt="Quarter" className="coin-img" />
          <div className="coin-text">25¢</div>
        </button>
      </div>
      <PurchaseCancellation money={state.balance} moneyBack={() => dispatch({ type: "MONEY_BACK" })} lastPurchased={state.lastPurchased} />
    </div>
  );
}
