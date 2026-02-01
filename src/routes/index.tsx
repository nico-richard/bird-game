import Button from "~/app/component/Button";
import "./index.sass";
import { useNavigate } from "@solidjs/router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div class="home">
      <h1>Multi quiz</h1>
      <Button onClick={() => navigate("/quiz")}>Démarrer</Button>
    </div>
  );
}
