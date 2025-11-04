import { useEffect, useState } from "react";
import { api } from "./api";
import FoodForm from "./components/FoodForm";
import FoodList from "./components/FoodList";
import OrdersList from "./components/OrdersList";

export default function App() {
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/foods").then((res) => setFoods(res.data));
  }, []);

  const handleAddToOrder = (food) => {
    setOrders((prev) => {
      const existing = prev.find((item) => item._id === food._id);
      if (existing) {
        return prev.map((item) =>
          item._id === food._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...food, qty: 1 }];
      }
    });
  };

  const handleRemoveOrder = (id) => {
    setOrders((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-orange-100 p-8 flex justify-center items-start">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Left side: Food management */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
            🍕 Food Management
          </h1>
          <FoodForm onAdd={(newFood) => setFoods([...foods, newFood])} />
          <FoodList
            foods={foods}
            setFoods={setFoods}
            onAddToOrder={handleAddToOrder}  
          />
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
            🛒 Orders List
          </h1>
          <OrdersList orders={orders} onRemove={handleRemoveOrder} />
        </div>
      </div>
    </div>
  );
}
