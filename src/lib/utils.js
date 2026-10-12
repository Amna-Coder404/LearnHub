export const formatDate = (date) =>
    date
        ? new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : null;

export const formatPrice = (price) =>
    price != null ? `Rs. ${Number(price).toLocaleString("en-US")}` : null;