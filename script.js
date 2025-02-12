// Initialiser la carte, L.map = l'appel de fct de Leaflet
var map = L.map('map', {
center: [48.12, -1.65],
zoom: 13});

// Ajouter des fonds de carte
var fondcartes = {
OSM: L.tileLayer('https://tile.openstreetmap.bzh/ca/{z}/{x}/{y}.png', { opacity : 0.5 } ), 
ESRI: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}.png'),
STADIA: L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.png'),
OrthoRM: L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?', {layers: 'raster:ortho2021'}),
RMfondcarte: L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows', {layers: 'ref_fonds:pvci_simple_gris'})  
 };

fondcartes.STADIA.addTo(map);


// Ajouter une attribution personnalisée directement via la carte

map.attributionControl.addAttribution('Réalisation : <a href="https://sites-formations.univ-rennes2.fr/mastersigat/" target="_blank" >MasterSIGAT🐱</a> / Sources : Stadia / Rennes Métropole');



// Ajouter l'echelle cartographique
L.control.scale().addTo(map);

// Ajouter une MiniMap
var miniMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png');
var miniMap = new L.Control.MiniMap(miniMapLayer, { toggleDisplay: true, minimized: false, position: 'bottomright' }).addTo(map);


// pin avec icone
// marqueur rennes 2 
var popuprennes2 = '<h1>Université Rennes 2 </h1> <br> <img src="https://www.lairedu.fr/wp-content/uploads/2017/02/16-mshb-chercheurs-en-ville-16-rennes-2-la-rouge.jpg" width="350px">';

var customOptions1 = {'maxWidth': '500', 'className' : 'custom'}

var rennes2icone = L.icon({
iconUrl: 'https://upload.wikimedia.org/wikipedia/fr/thumb/2/23/Logo_univ-rennes2-2016.svg/481px-Logo_univ-rennes2-2016.svg.png',
iconSize: [60, 60] });

var Rennes2 = L.marker([48.119, -1.7013],{icon: rennes2icone}).bindPopup(popuprennes2,customOptions1);



// marqueur gare

var popupgare = '<h1> La belle gare </h1> <b> blabladsfqfqf </b> <br> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Gare_de_Rennes_-_August_2024.jpg/1200px-Gare_de_Rennes_-_August_2024.jpg" width="350px" >';

var customOptions2 = {'maxWidth': '500', 'className' : 'custom'}

var gareicone = L.icon({
iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Sncf-logo.svg',
iconSize: [50, 30] });

var Gare = L.marker([48.104, -1.672], {icon: gareicone}).bindPopup(popupgare,customOptions2);

// Ajouter un gestionnaire d'événements pour le survol (hover)
Gare.on('mouseover', function (e) {
this.openPopup(); });
// Ajouter un gestionnaire d'événements pour quitter le survol (hover)
Gare.on('mouseout', function (e) {
this.closePopup(); });



// des couches
// ajout cadastre wms

var Cadastre = L.tileLayer.wms('http://geobretagne.fr/geoserver/cadastre/wms',
{layers: 'CP.CadastralParcel', format: 'image/png',transparent: true, opacity: 0.5});

var Bat = L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?', {layers: 'ref_cad:batiment' , format: 'image/png',transparent: true});

var Cycl = L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?', {layers: 'trp_doux:v_voirie_amenagement_velo', format: 'image/png',transparent: true});

var Trafic = L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?', {layers: 'trp_rout:v_rva_trafic_fcd' , format: 'image/png',transparent: true});

// Ajout des Stations de vélos
var url = 'https://raw.githubusercontent.com/mastersigat/data/main/velostar.geojson';
$.getJSON(url, function (geojson) {
var velos = L.geoJson(geojson).addTo(map);
// Ajout Popup
velos.bindPopup(function(velos) {console.log(velos.feature.properties);
return "<h1> Station : "+velos.feature.properties.nom+"</h1>"+"<hr><h2>"
+velos.feature.properties.nombreemplacementstheorique+ "&nbsp; vélos</h2>" ;
}); 
  
});


// à la fin 
var couches = {"Université Rennes 2 La Rouge": Rennes2, "Gare de Rennes" : Gare, "Cadastre" : Cadastre, "Bâtiments" : Bat , "Pistes cyclables" : Cycl , "Trafic" : Trafic };

// Ajouter le controleur de couches
var menu1 = L.control.layers(fondcartes, null, {position: 'topleft', collapsed : false }).addTo(map);

// Ajouter le controleur de couches
var menu2 = L.control.layers(null, couches, {position: 'topright', collapsed : false }).addTo(map);