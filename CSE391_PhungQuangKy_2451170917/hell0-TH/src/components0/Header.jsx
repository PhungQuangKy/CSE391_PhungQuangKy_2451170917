function Header() {
  return (
    <header
      style={{
        background: "#2c3e50",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "24px" }}>Cửa hàng điện thoại</h1>
      <nav>
        <a
          href="#home"
          style={{
            color: "white",
            marginRight: "15px",
            textDecoration: "none",
          }}
        >
          Trang chủ
        </a>
        <a href="#products" style={{ color: "white", textDecoration: "none" }}>
          Sản phẩm
        </a>
      </nav>
    </header>
  );
}

export default Header;
