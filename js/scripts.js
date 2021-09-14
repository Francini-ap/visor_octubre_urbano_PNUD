// Mapa Leaflet
var mapa = L.map('mapid').setView([9.9, -84.10], 12.09);


// Definición de capas base
var capa_osm = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
  {
    maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(mapa);	

// Segunda capa base
var capa_hot = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}.png', 
   {
	maxZoom: 19,
	attribution: '="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ</a>'
   }
).addTo(mapa);

// tercera capa base
var capa_esri = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
   {
	maxZoom: 19,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
   }
).addTo(mapa);


// Conjunto de capas base
var capas_base = {
  "OSM": capa_osm,
  "OSM Gray" : capa_hot,
  "Satelital" : capa_esri,
};	    


// Control de capas
control_capas = L.control.layers(capas_base).addTo(mapa);	

// Control de escala
L.control.scale().addTo(mapa);
	    

// Capa de coropletas de % Superficie verde por habitante (Trama verde completa)
$.getJSON('https://francini-ap.github.io/datos_actubreurbano2/super_hab_2.geojson', function (geojson) {
  var capa_cantones_gam_coropletas = L.choropleth(geojson, {
	  valueProperty: 'sv_hab2',
	  scale: ['#90ee90', '#006400'],
	  steps: 5,
	  mode: 'q',
	  style: {
	    color: '#fff',
	    weight: 2,
	    fillOpacity: 0.7
	  },
	 onEachFeature: function popup_registros (feature, layer) {
	layer.bindPopup("<div style=text-align:center><h3>"+feature.properties.distrito+
	  "<h3></div><hr><table><tr><td>Población total: "+feature.properties.pobla_2021+
	  "</td></tr><tr><td>Población mujeres:"+feature.properties.mujeres+
	  "</td></tr><tr><td>Población hombres: "+feature.properties.hombre+
	  "</td></tr><tr><td>Área trama verde: "+feature.properties.area_tv_m2.toLocaleString()+'m2'+
	  "</td></tr><tr><td>Trama verde por habitante: "+feature.properties.sv_hab2+'m2'+
	  
"</td></tr></table>",
	{minWidth: 150, maxWidth: 200});				
		}
		
  }).addTo(mapa);
  control_capas.addOverlay(capa_cantones_gam_coropletas, 'Superficie de trama verde por habitante por distrito');	

  // Leyenda de la capa de coropletas
  var leyenda = L.control({ position: 'bottomleft' })
  leyenda.onAdd = function (mapa) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = capa_cantones_gam_coropletas.options.limits
    var colors = capa_cantones_gam_coropletas.options.colors
    var labels = []

    // Add min & max
    div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
  }
  leyenda.addTo(mapa)
});


/// Capa de coropletas de % Superficie verde por habitante (Trama verde completa)
$.getJSON('https://francini-ap.github.io/datos_actubreurbano2/super_hab_2.geojson', function (geojson) {
  var capa_cantones_gam_coropletas = L.choropleth(geojson, {
	  valueProperty: 'par_xhab2',
	  scale: ['#cdeef8','#0a3946'],
	  steps: 5,
	  mode: 'q',
	  style: {
	    color: '#fff',
	    weight: 2,
	    fillOpacity: 0.8
	  },
	 onEachFeature: function popup_registros (feature, layer) {
	layer.bindPopup("<div style=text-align:center><h3>"+feature.properties.distrito+
	  "<h3></div><hr><table><tr><td>Población total: "+feature.properties.pobla_2021+
	  "</td></tr><tr><td>Población mujeres:"+feature.properties.mujeres+
	  "</td></tr><tr><td>Población hombres: "+feature.properties.hombre+
	  "</td></tr><tr><td>Área trama verde: "+feature.properties.area_tv_m2.toLocaleString()+'m2'+
	  "</td></tr><tr><td>Área parques y recreativas por habitante: "+feature.properties.par_xhab2 +'m2'+
	  
"</td></tr></table>",
	{minWidth: 150, maxWidth: 200});				
		}
		
  }).addTo(mapa);
  control_capas.addOverlay(capa_cantones_gam_coropletas, 'Superficie de parques y áreas recreativas por habitante por distrito');	

  // Leyenda de la capa de coropletas
  var leyenda = L.control({ position: 'bottomleft' })
  leyenda.onAdd = function (mapa) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = capa_cantones_gam_coropletas.options.limits
    var colors = capa_cantones_gam_coropletas.options.colors
    var labels = []

    // Add min & max
    div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
  }
  leyenda.addTo(mapa)
});



/// Capa de coropletas Árboles urbanos por habitante 
$.getJSON('https://francini-ap.github.io/datos_actubreurbano2/arboles_ap_tv_cbima.geojson', function (geojson) {
  var capa_cantones_gam_coropletas = L.choropleth(geojson, {
	  valueProperty: 'por_arbol',
	  scale: ['#efdce1','#98485c'],
	  steps: 5,
	  mode: 'q',
	  style: {
	    color: '#fff',
	    weight: 2,
	    fillOpacity: 0.8
	  },
	 onEachFeature: function popup_registros (feature, layer) {
	layer.bindPopup("<div style=text-align:center><h3>"+feature.properties.distrito+
	  "<h3></div><hr><table><tr><td>Población total: "+feature.properties.pobla_2021+
	  "</td></tr><tr><td>Población mujeres:"+feature.properties.mujeres+
	  "</td></tr><tr><td>Población hombres: "+feature.properties.hombre+
	  "</td></tr><tr><td> Número de árboles urbanos: "+feature.properties.num_arbol +
	  "</td></tr><tr><td> Catidad de árboles urbanos por habitante: "+feature.properties.por_arbol+
	  
"</td></tr></table>",
	{minWidth: 150, maxWidth: 200});				
		}
		
  }).addTo(mapa);
  control_capas.addOverlay(capa_cantones_gam_coropletas, 'Catidad de árboles urbanos por habitante');	

  // Leyenda de la capa de coropletas
  var leyenda = L.control({ position: 'bottomleft' })
  leyenda.onAdd = function (mapa) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = capa_cantones_gam_coropletas.options.limits
    var colors = capa_cantones_gam_coropletas.options.colors
    var labels = []

    // Add min & max
    div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
  }
  leyenda.addTo(mapa)
});


/// Capa de coropletas: Porcentaje de trama verde por área de protección por distrito
$.getJSON('https://francini-ap.github.io/datos_actubreurbano2/arboles_ap_tv_cbima.geojson', function (geojson) {
  var capa_cantones_gam_coropletas = L.choropleth(geojson, {
	  valueProperty: 'por_tv',
	  scale: ['#fedfef','#ed0579'],
	  steps: 5,
	  mode: 'q',
	  style: {
	    color: '#fff',
	    weight: 2,
	    fillOpacity: 0.8
	  },
	 onEachFeature: function popup_registros (feature, layer) {
	layer.bindPopup("<div style=text-align:center><h3>"+feature.properties.distrito+
	  "<h3></div><hr><table><tr><td>Porcentaje de trama verde en el área de protección: "+feature.properties.por_tv+'%'+
	  
	
	  
"</td></tr></table>",
	{minWidth: 150, maxWidth: 200});				
		}
		
  }).addTo(mapa);
  control_capas.addOverlay(capa_cantones_gam_coropletas, 'Porcentaje de trama verde en el área de protección por distrito');	

  // Leyenda de la capa de coropletas
  var leyenda = L.control({ position: 'bottomleft' })
  leyenda.onAdd = function (mapa) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = capa_cantones_gam_coropletas.options.limits
    var colors = capa_cantones_gam_coropletas.options.colors
    var labels = []

    // Add min & max
    div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
  }
  leyenda.addTo(mapa)
});


/// Capa de coropletas: Temperaturas superficiales de la tierra
$.getJSON('https://francini-ap.github.io/datos_actubreurbano2/tem2.geojson', function (geojson) {
  var capa_cantones_gam_coropletas = L.choropleth(geojson, {
	  valueProperty: 'temp_prome',
	  scale: ['#fda5a5','#da0505'],
	  steps: 5,
	  mode: 'q',
	  style: {
	    color: '#fff',
	    weight: 2,
	    fillOpacity: 0.8
	  },
	 onEachFeature: function popup_registros (feature, layer) {
	layer.bindPopup("<div style=text-align:center><h3>"+feature.properties.canton_1+
	  "<h3></div><hr><table><tr><td>Temperatura mínima : "+feature.properties.tem_mina+'°C'+
	  "</td></tr><tr><td> Temperatura máxima: "+feature.properties.tem_max+'°C'+
	  "</td></tr><tr><td> Temperatura promedio: "+feature.properties.temp_prome+'°C'+
	
	  
"</td></tr></table>",
	{minWidth: 150, maxWidth: 200});				
		}
		
  }).addTo(mapa);
  control_capas.addOverlay(capa_cantones_gam_coropletas, 'Temperatura superficial de la tierra');	

  // Leyenda de la capa de coropletas
  var leyenda = L.control({ position: 'bottomleft' })
  leyenda.onAdd = function (mapa) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = capa_cantones_gam_coropletas.options.limits
    var colors = capa_cantones_gam_coropletas.options.colors
    var labels = []

    // Add min & max
    div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
  }
  leyenda.addTo(mapa)
});

/// Capa de coropletas: Porcentaje asentamientos informales por distrito
$.getJSON('https://francini-ap.github.io/datos_actubreurbano2/ai2.geojson', function (geojson) {
  var capa_cantones_gam_coropletas = L.choropleth(geojson, {
	  valueProperty: 'por_ai',
	  scale: ['#fefecc','#eded05'],
	  steps: 5,
	  mode: 'q',
	  style: {
	    color: '#fff',
	    weight: 2,
	    fillOpacity: 0.8
	  },
	 onEachFeature: function popup_registros (feature, layer) {
	layer.bindPopup("<div style=text-align:center><h3>"+feature.properties.distrito+
	  "<h3></div><hr><table><tr><td>Área asentamiento informal : "+feature.properties.area_ai_2 + 'm2'+
	  "</td></tr><tr><td> Población asentamiento informal: "+feature.properties.poblacion+
	  "</td></tr><tr><td> Número de viviendas: "+feature.properties.num_vivien+
	  "</td></tr><tr><td> Número de hogares: "+feature.properties.num_hogare+
	
	  
"</td></tr></table>",
	{minWidth: 150, maxWidth: 200});				
		}
		
  }).addTo(mapa);
  control_capas.addOverlay(capa_cantones_gam_coropletas, 'Porcentaje de ocupación de los asentamientos informales por distrito');	

  // Leyenda de la capa de coropletas
  var leyenda = L.control({ position: 'bottomleft' })
  leyenda.onAdd = function (mapa) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = capa_cantones_gam_coropletas.options.limits
    var colors = capa_cantones_gam_coropletas.options.colors
    var labels = []

    // Add min & max
    div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
  }
  leyenda.addTo(mapa)
});

/// Capa de coropletas: Porcentaje de trama verde en los asentamientos informales por distrito
$.getJSON('https://francini-ap.github.io/datos_actubreurbano2/ai2.geojson', function (geojson) {
  var capa_cantones_gam_coropletas = L.choropleth(geojson, {
	  valueProperty: 'por_par_ai',
	  scale: ['#ccfefe','#05eded'],
	  steps: 5,
	  mode: 'q',
	  style: {
	    color: '#fff',
	    weight: 2,
	    fillOpacity: 0.8
	  },
	 onEachFeature: function popup_registros (feature, layer) {
	layer.bindPopup("<div style=text-align:center><h3>"+feature.properties.distrito+
	  "<h3></div><hr><table><tr><td>Área trama verde (asentamiento informal) : "+feature.properties.tv_ai_2 + 'm2'+
	  "</td></tr><tr><td> Población asentamiento informal: "+feature.properties.poblacion+
	  "</td></tr><tr><td> Área parques y recreativas por habitante en los asentamientos informales: "+feature.properties.por_par_ai+'m2'+
	  
	
	  
"</td></tr></table>",
	{minWidth: 150, maxWidth: 200});				
		}
		
  }).addTo(mapa);
  control_capas.addOverlay(capa_cantones_gam_coropletas, 'Superficie de parques y áreas recreativas por habitante en los asentamientos informales ');	

  // Leyenda de la capa de coropletas
  var leyenda = L.control({ position: 'bottomleft' })
  leyenda.onAdd = function (mapa) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = capa_cantones_gam_coropletas.options.limits
    var colors = capa_cantones_gam_coropletas.options.colors
    var labels = []

    // Add min & max
    div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
  }
  leyenda.addTo(mapa)
});
