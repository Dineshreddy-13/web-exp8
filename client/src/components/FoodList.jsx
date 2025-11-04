import { api } from "../api";

export default function FoodList({ foods, setFoods, onAddToOrder }) {
  const handleDelete = async (id) => {
    await api.delete(`/foods/${id}`);
    setFoods(foods.filter((f) => f._id !== id));
  };

  if (!foods.length) {
    return (
      <p className="text-gray-500 text-center italic mt-4">
        No food items yet. Add some delicious meals 🍔
      </p>
    );
  }

  return (
    <div className="grid gap-4 mt-4">
      {foods.map((f) => (
        <div
          key={f._id}
          className="flex justify-between items-center bg-orange-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <div>
            <h3 className="text-lg font-semibold text-orange-800">{f.name}</h3>
            <p className="text-gray-600">
              ₹{f.price} • {f.category}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onAddToOrder(f)}  // ✅ triggers order addition
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-all"
            >
              Add
            </button>
            <button
              onClick={() => handleDelete(f._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
