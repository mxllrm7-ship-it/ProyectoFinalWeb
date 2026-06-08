import "../styles/styles.css";
import NavBar from "../components/Landing/NavBar/NavBar";
import MyTickets from "../components/Events/MyTickets/MyTickets"
import Footer from "../components/Landing/Footer/Footer";

export default function MyEvents() {
  return (
    <>
      <NavBar />
      <MyTickets/>
      <Footer />
    </>
  );
}
