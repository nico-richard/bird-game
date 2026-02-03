import React from "react";
import Button from "~/component/Button";
import { useNavigate } from "@solidjs/router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div class="buttons">
        <Button onClick={() => navigate("/")}>Accueil</Button>
        <Button onClick={() => navigate("/data")}>Données</Button>
      </div>
      <hr />
    </>
  );
};

export default Navbar;
