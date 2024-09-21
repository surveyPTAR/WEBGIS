// Inisialisasi peta
var map = L.map("map").setView([-6.88378592, 107.54146461], 13); // Mengatur pusat peta ke koordinat Bandung, Indonesia

// Base layers
var osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

//  var topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//    attribution: 'Map data: &copy; <a href="https://www.opentopomap.org">OpenTopoMap</a> contributors'
// });

// Tambahkan salah satu layer dasar ke peta
osmLayer.addTo(map);

// Overlays
var marker = L.marker([-6.917464, 107.619123]).bindPopup("<b>Hello world!</b><br />I am a popup.");
var circle = L.circle([-6.917464, 107.619123], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 500,
}).bindPopup("I am a circle.");

// WMS layer from GeoServer

var wmsLayer_batas_adm_kec_polygon = L.tileLayer.wms("http://103.233.103.22:8090/geoserver/wms", {
  layers: "hutankota:Gis_batas_adm_kec_polygon", // Ganti 'workspace' dengan nama workspace yang benar
  format: "image/png",
  transparent: true,
  attribution: "&copy; GeoServer",
});
var wmsLayer_batas_adm_kel_polygon = L.tileLayer.wms("http://103.233.103.22:8090/geoserver/wms", {
  layers: "hutankota:Gis_batas_adm_kel_polygon", // Ganti 'workspace' dengan nama workspace yang benar
  format: "image/png",
  transparent: true,
  attribution: "&copy; GeoServer",
});
var wmsLayer_rth_polygon = L.tileLayer.wms("http://103.233.103.22:8090/geoserver/wms", {
  layers: "hutankota:Gis_rth_polygon", // Ganti 'workspace' dengan nama workspace yang benar
  format: "image/png",
  transparent: true,
  attribution: "&copy; GeoServer",
});
var wmsLayer_rimba_kota_polygon = L.tileLayer.wms("http://103.233.103.22:8090/geoserver/wms", {
  layers: "hutankota:Gis_rimba_kota_polygon", // Ganti 'workspace' dengan nama workspace yang benar
  format: "image/png",
  transparent: true,
  attribution: "&copy; GeoServer",
});
var wmsLayer_pohon_point = L.tileLayer.wms("http://103.233.103.22:8090/geoserver/wms", {
  layers: "hutankota:Gis_pohon_point", // Ganti 'workspace' dengan nama workspace yang benar
  format: "image/png",
  transparent: true,
  attribution: "&copy; GeoServer",
});
var wmsLayer_aksesibilitas_line = L.tileLayer.wms("http://103.233.103.22:8090/geoserver/wms", {
  layers: "hutankota:Gis_aksesbilitas_line", // Ganti 'workspace' dengan nama workspace yang benar
  format: "image/png",
  transparent: true,
  attribution: "&copy; GeoServer",
});
var wmsLayer_aksesibilitas_polygon = L.tileLayer.wms("http://103.233.103.22:8090/geoserver/wms", {
  layers: "hutankota:Gis_aksesbilitas_poligon", // Ganti 'workspace' dengan nama workspace yang benar
  format: "image/png",
  transparent: true,
  attribution: "&copy; GeoServer",
});
var wmsLayer_infrastruktur_line = L.tileLayer.wms("http://103.233.103.22:8090/geoserver/wms", {
  layers: "hutankota:Gis_infrastruktur_line", // Ganti 'workspace' dengan nama workspace yang benar
  format: "image/png",
  transparent: true,
  attribution: "&copy; GeoServer",
});
var wmsLayer_infrastruktur_point = L.tileLayer.wms("http://103.233.103.22:8090/geoserver/wms", {
  layers: "hutankota:Gis_infrastruktur_point", // Ganti 'workspace' dengan nama workspace yang benar
  format: "image/png",
  transparent: true,
  attribution: "&copy; GeoServer",
});
var wmsLayer_infrastruktur_polygon = L.tileLayer.wms("http://103.233.103.22:8090/geoserver/wms", {
  layers: "hutankota:Gis_infrastruktur_polygon", // Ganti 'workspace' dengan nama workspace yang benar
  format: "image/png",
  transparent: true,
  attribution: "&copy; GeoServer",
});

// Group layers
var overlayLayers = {
  //"Marker": marker,
  //"Circle": circle,

  "Batas Kecamatan": wmsLayer_batas_adm_kec_polygon,
  "Batas Kelurahan": wmsLayer_batas_adm_kel_polygon,
  RTH: wmsLayer_rth_polygon,
  "Rimba Kota": wmsLayer_rimba_kota_polygon,
  Pohon: wmsLayer_pohon_point,
  "Aksesibilitas Line": wmsLayer_aksesibilitas_line,
  "Aksesibilitas Polygon": wmsLayer_aksesibilitas_polygon,
  "Infrastruktur Line": wmsLayer_infrastruktur_line,
  "Infrastruktur Point": wmsLayer_infrastruktur_point,
  "Infrastruktur Polygon": wmsLayer_infrastruktur_polygon,
};

// Layer control
var baseLayers = {
  OpenStreetMap: osmLayer,
};

L.control.layers(baseLayers, overlayLayers).addTo(map);

// Tambahkan overlay ke peta secara default
wmsLayer_rimba_kota_polygon.addTo(map);
wmsLayer_pohon_point.addTo(map);

// Fungsi untuk mendapatkan URL GetFeatureInfo
function getFeatureInfoUrl(latlng, layers, map) {
  var point = map.latLngToContainerPoint(latlng, map.getZoom());
  var size = map.getSize();

  var params = {
    request: "GetFeatureInfo",
    service: "WMS",
    srs: "EPSG:4326",
    styles: "",
    transparent: true,
    version: "1.1.1",
    format: "image/png",
    bbox: map.getBounds().toBBoxString(),
    height: size.y,
    width: size.x,
    layers: layers,
    query_layers: layers,
    info_format: "application/json",
  };

  params[params.version === "1.3.0" ? "i" : "x"] = point.x;
  params[params.version === "1.3.0" ? "j" : "y"] = point.y;

  return "http://103.233.103.22:8090/geoserver/wms" + L.Util.getParamString(params, "http://103.233.103.22:8090/geoserver/wms", true);
}

// Event listener untuk klik pada peta
map.on("click", function (e) {
  // List all active layers
  var activeLayers = [];
  if (map.hasLayer(wmsLayer_aksesibilitas_line)) activeLayers.push("hutankota:Gis_aksesbilitas_line");
  if (map.hasLayer(wmsLayer_aksesibilitas_polygon)) activeLayers.push("hutankota:Gis_aksesbilitas_poligon");
  if (map.hasLayer(wmsLayer_batas_adm_kec_polygon)) activeLayers.push("hutankota:Gis_batas_adm_kec_polygon");
  if (map.hasLayer(wmsLayer_batas_adm_kel_polygon)) activeLayers.push("hutankota:Gis_batas_adm_kel_polygon");
  if (map.hasLayer(wmsLayer_infrastruktur_line)) activeLayers.push("hutankota:Gis_infrastruktur_line");
  if (map.hasLayer(wmsLayer_infrastruktur_point)) activeLayers.push("hutankota:Gis_infrastruktur_point");
  if (map.hasLayer(wmsLayer_infrastruktur_polygon)) activeLayers.push("hutankota:Gis_infrastruktur_polygon");
  if (map.hasLayer(wmsLayer_pohon_point)) activeLayers.push("hutankota:Gis_pohon_point");
  if (map.hasLayer(wmsLayer_rimba_kota_polygon)) activeLayers.push("hutankota:Gis_rimba_kota_polygon");
  if (map.hasLayer(wmsLayer_rth_polygon)) activeLayers.push("hutankota:Gis_rth_polygon");

  if (activeLayers.length > 0) {
    var url = getFeatureInfoUrl(e.latlng, activeLayers.join(","), map);

    // Mengirim permintaan GetFeatureInfo
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        var info = "<h3>Feature Info</h3>";
        data.features.forEach(function (feature) {
          var properties = feature.properties;
          info += "<h4>Layer: " + feature.id.split(".")[0] + "</h4>";
          for (var key in properties) {
            info += "<strong>" + key + ":</strong> " + properties[key] + "<br>";
          }
        });
        L.popup().setLatLng(e.latlng).setContent(info).openOn(map);
      })
      .catch((error) => {
        console.log("Error fetching GetFeatureInfo:", error);
      });
  }
});
