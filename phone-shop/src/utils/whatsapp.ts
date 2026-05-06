import type { CartItem } from "../data/types";

export const generateWhatsAppMessage = (
  items: CartItem[],
  customerName: string,
  customerPhone: string,
  customerAddress: string,
): string => {
  const itemsList = items
    .map(
      (item) =>
        `• ${item.name} (${item.quantity}x) - GH₵${(item.price * item.quantity).toFixed(2)}`,
    )
    .join("\n");

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const message = `Hi! I would like to place an order:\n\n${itemsList}\n\n*Total: GH₵${totalAmount.toFixed(2)}*\n\nCustomer Details:\nName: ${customerName}\nPhone: ${customerPhone}\nAddress: ${customerAddress}\n\nPlease confirm availability and delivery options.`;

  return encodeURIComponent(message);
};

export const generateWhatsAppLink = (
  phoneNumber: string,
  message: string,
): string => {
  // Format: https://wa.me/[country code][phone number]?text=[message]
  // Ghana country code: +233
  return `https://wa.me/${phoneNumber}?text=${message}`;
};
