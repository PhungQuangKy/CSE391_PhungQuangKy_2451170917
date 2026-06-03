// Nhận vào name, email, avatar qua props
function UserCard({ name, email, avatar }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        margin: "10px",
        textAlign: "center",
        width: "200px",
      }}
    >
      <img
        src={avatar}
        alt={name}
        style={{ width: "80px", height: "80px", borderRadius: "50%" }}
      />
      <h3>{name}</h3>
      <p style={{ color: "#666", fontSize: "14px" }}>{email}</p>
    </div>
  );
}
export default UserCard;
