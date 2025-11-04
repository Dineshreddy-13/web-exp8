export default function OrdersList({ orders, onRemove }) {
  if (!orders.length) {
    return (
      <p className="text-gray-500 text-center italic">No orders yet 💤</p>
    );
  }

  const totalAmount = orders.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div>
      <div className="space-y-4 mb-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-4 bg-orange-50 rounded-xl shadow-sm hover:shadow-md transition-all flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-orange-800">
                {order.name}
              </h3>
              <p className="text-gray-600">
                ₹{order.price} × {order.qty}
              </p>
              <p className="font-medium text-gray-800 mt-1">
                Total: ₹{order.price * order.qty}
              </p>
            </div>
            <button
              onClick={() => onRemove(order._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 text-right">
        <h2 className="text-xl font-semibold text-orange-700">
          🧾 Total Bill: ₹{totalAmount}
        </h2>
      </div>
    </div>
  );
}
