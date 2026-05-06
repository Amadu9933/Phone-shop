import type { Order } from "../data/types";

export const exportOrdersToExcel = (orders: Order[]): void => {
  if (orders.length === 0) {
    alert("No orders to export");
    return;
  }

  // Create CSV content
  const headers = [
    "Order ID",
    "Date",
    "Customer Name",
    "Phone",
    "Email",
    "Address",
    "Items",
    "Total Amount",
    "Payment Method",
    "Status",
  ];

  const rows = orders.map((order) => [
    order.id,
    new Date(order.createdAt).toLocaleDateString(),
    order.customerName,
    order.customerPhone,
    order.customerEmail,
    order.customerAddress,
    order.items.map((item) => `${item.name} (${item.quantity}x)`).join("; "),
    `GH₵${order.totalAmount.toFixed(2)}`,
    order.paymentMethod,
    order.status,
  ]);

  // Create CSV string
  let csv = headers.join(",") + "\n";
  rows.forEach((row) => {
    csv +=
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",") +
      "\n";
  });

  // Create blob and download
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `orders_${new Date().toISOString().split("T")[0]}.csv`,
  );
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportProductsToExcel = (products: any[]): void => {
  if (products.length === 0) {
    alert("No products to export");
    return;
  }

  const headers = [
    "Product ID",
    "Name",
    "Category",
    "Price",
    "Availability",
    "Description",
  ];

  const rows = products.map((product) => [
    product.id,
    product.name,
    product.category,
    `GH₵${product.price.toFixed(2)}`,
    product.availability,
    product.description,
  ]);

  let csv = headers.join(",") + "\n";
  rows.forEach((row) => {
    csv +=
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",") +
      "\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `products_${new Date().toISOString().split("T")[0]}.csv`,
  );
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
