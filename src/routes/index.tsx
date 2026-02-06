import Button from "~/component/Button";
import "./index.sass";
import { useNavigate } from "@solidjs/router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div class="home">
      <div class="home-photo">
        <img src="/mesange.png" alt="" />
      </div>
      <h1>Quiz des oiseaux</h1>
      <Button onClick={() => navigate("/quiz")}>Démarrer</Button>
    </div>
  );
}
