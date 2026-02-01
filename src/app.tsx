import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.sass";
import "../src/app/component/Navbar.sass";
import "../src/app/component/Button.sass";
import Navbar from "~/app/component/Navbar";

export default function App() {
  return (
    <>
      <Router
        root={(props) => (
          <>
            <Navbar />
            <Suspense>{props.children}</Suspense>
          </>
        )}
      >
        <FileRoutes />
      </Router>
    </>
  );
}
