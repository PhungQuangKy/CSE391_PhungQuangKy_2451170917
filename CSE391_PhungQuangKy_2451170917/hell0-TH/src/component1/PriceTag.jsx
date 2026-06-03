// Nhận vào giá gốc và giá giảm
function PriceTag({ originalPrice, salePrice }) {
  // Tính phần trăm giảm giá trực tiếp
  const discount = Math.round(
    ((originalPrice - salePrice) / originalPrice) * 100,
  );

  return (
    <div style={{ fontFamily: "sans-serif", margin: "10px" }}>
      {/* Giá mới (giá giảm) */}
      <span
        style={{
          color: "red",
          fontWeight: "bold",
          fontSize: "18px",
          marginRight: "10px",
        }}
      >
        {salePrice.toLocaleString("vi-VN")}đ
      </span>

      {/* Giá gốc (bị gạch ngang) */}
      <span
        style={{
          textDecoration: "line-through",
          color: "#999",
          fontSize: "14px",
        }}
      >
        {originalPrice.toLocaleString("vi-VN")}đ
      </span>

      {/* Phần trăm giảm giá (Hiển thị có điều kiện nếu có giảm giá) */}
      {discount > 0 && (
        <span
          style={{
            marginLeft: "10px",
            background: "red",
            color: "white",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          -{discount}%
        </span>
      )}
    </div>
  );
}
export default PriceTag;
