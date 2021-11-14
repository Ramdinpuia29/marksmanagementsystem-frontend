import Button from "react-bootstrap/Button";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home">
        <Button href="/dashboard/marks" variant="secondary">
          Go to Dashboard
        </Button>
      </div>
    </>
  );
};

export default Home;
