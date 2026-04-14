import { renderHeader } from "./core/layout.js";
import { loadMapPage } from "./pages/mapPage.js";

// render header global
document.getElementById("header").innerHTML = renderHeader();

// detect halaman
if (window.location.pathname.includes("map.html")) {
  loadMapPage();
}