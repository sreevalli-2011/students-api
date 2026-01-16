import StudentCarousel from "./components/StudentCarousel";

function App() {
  return (
    <>
      <h2
        style={{
          textAlign: "center",
          marginTop: "30px",
          marginBottom: "20px",
          fontSize: "28px",
          fontWeight: "600",
          color: "#333",
        }}
      >
        React with API
      </h2>

      <StudentCarousel />
    </>
  );
}

export default App;
