import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.sass";
import "~/component/Navbar.sass";
import "~/component/Button.sass";
import Navbar from "~/component/Navbar";

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
