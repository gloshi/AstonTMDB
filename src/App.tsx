import "./App.css";
import Header from "./components/Header";
import AppRouter from "./approutes/AppRouter";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <div className="content">
        <Header />
        <AppRouter />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
