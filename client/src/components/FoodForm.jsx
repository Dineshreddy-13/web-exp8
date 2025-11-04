import { useState } from "react";
import { api } from "../api";

export default function FoodForm({ onAdd }) {
  const [food, setFood] = useState({ name: "", price: "", category: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!food.name || !food.price || !food.category) return;
    const res = await api.post("/foods", food);
    onAdd(res.data);
    setFood({ name: "", price: "", category: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 mb-6 bg-orange-50 p-4 rounded-xl"
    >
      <input
        type="text"
        placeholder="Food Name"
        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={food.name}
        onChange={(e) => setFood({ ...food, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={food.price}
        onChange={(e) => setFood({ ...food, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={food.category}
        onChange={(e) => setFood({ ...food, category: e.target.value })}
      />
      <button
        type="submit"
        className="bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all"
      >
        Add Food
      </button>
    </form>
  );
}
