import { initMap } from "../map/initMap.js";

export async function loadMapPage() {
    const map = initMap();

    let activeLayer = null;
    let closeTimeout = null;

    // ==========================
    // LOAD DATA
    // ==========================
    const geojson = await fetch("/data/clean/surabaya_kecamatan.geojson")
        .then(res => res.json());

    const analysis = await fetch("/data/clean/analysis.json")
        .then(res => res.json());

    window.analysisData = analysis;

    // ==========================
    // HELPER
    // ==========================
    function getData(kecamatan) {
        return analysis.find(d => d.kecamatan === kecamatan);
    }

    function style(feature) {
        const nama = feature.properties.kecamatan;
        const data = getData(nama);

        return {
        fillColor: data ? data.warna : "#ccc",
        weight: 1,
        color: "#333",
        fillOpacity: 0.7,
        };
    }

    function onEachFeature(feature, layer) {
        const nama = feature.properties.kecamatan;
        const data = getData(nama);

        const content = data
            ? `
            <div>
                <strong>${nama}</strong><br/>
                Fasilitas: ${data.total_fasilitas}<br/>
                Penduduk: ${data.jumlah_penduduk.toLocaleString()}<br/>
                Rasio: ${data.rasio_scaled.toFixed(2)} / 1000<br/>
                Status: ${data.kategori}<br/>
            </div>
            `
            : `<strong>${nama}</strong><br/>Data tidak tersedia`;

        // 🔥 pakai tooltip, bukan popup
        layer.bindTooltip(content, {
            sticky: true,
            direction: "top",
            opacity: 0.9
        });

        layer.on({
            mouseover: (e) => {
            e.target.setStyle({
                weight: 2,
                color: "#000",
                fillOpacity: 0.9,
            });
            },

            mouseout: (e) => {
            geojsonLayer.resetStyle(e.target);
            },

            click: () => {
            showDetail(nama);
            }
        });
    }

// ==========================
// RENDER GEOJSON
// ==========================
const geojsonLayer = L.geoJSON(geojson, {
        style,
        onEachFeature,
    }).addTo(map);

    // zoom ke wilayah
    map.fitBounds(geojsonLayer.getBounds());
}

window.showDetail = function(nama) {
    const panel = document.getElementById("detail-panel");
    const content = document.getElementById("detail-content");

    const data = window.analysisData.find(d => d.kecamatan === nama);

    if (!data) return;

    content.innerHTML = `
        <h2 class="text-xl font-bold mb-2">${nama}</h2>
        <p>Fasilitas: ${data.total_fasilitas}</p>
        <p>Penduduk: ${data.jumlah_penduduk.toLocaleString()}</p>
        <p>Rasio: ${data.rasio_scaled.toFixed(2)} / 1000</p>
        <p>Status: ${data.kategori}</p>
    `;

    panel.classList.remove("translate-x-full");
};