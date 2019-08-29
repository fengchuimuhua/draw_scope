//var color = ['#AED363', '#ECDC5E', '#FD8C2F', '#C50A3C', '#501A48'];
var color = ["#00FF00","#FFFF00","#FF0000"]

function format_poly(poly_raw) {
	var p = [];
	for (var i = 0; i < poly_raw.length; i++) {
		var point = [];
		point.push(poly_raw[i]["y"] / 1000000.0);
		point.push(poly_raw[i]["x"] / 1000000.0);
		p.push(point);
	}
	return p;
}

function get_geo_color(geo_obj) {
	if (geo_obj.ord_num < 0) {
		return '#FFFFFF'
	} else {
		var idx = Math.floor(geo_obj.empty_ratio * 3);
		if (idx == 3) {
			idx = 2
		}
		return color[idx]
	}
}


var rec_list = []
for (var i = 0; i < geo_list.length; i++) {
	var geo = geo_list[i];
	if (geo.ord_num <= 0) {
		continue
	}
	var bounds = Geohash.bounds(geo.geohash);

	var rec = new AMap.Rectangle({
			bounds: new AMap.Bounds(new AMap.LngLat(bounds.sw.lon, bounds.sw.lat), new AMap.LngLat(bounds.ne.lon, bounds.ne.lat)),
			strokeColor: '#006666',
			strokeOpacity: 0,
			fillOpacity: 0.8,
			fillColor: get_geo_color(geo)
		});
	rec_list.push(rec);
}
alert(rec_list.length + ',' + geo_list.length);

var map = new AMap.Map('container',{
            resizeEnable: true,
            zoom: 13,
            center: rec_list[0].getBounds().getCenter()
        });

AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
    function(){
        map.addControl(new AMap.ToolBar());

        map.addControl(new AMap.Scale());

});

function add_geo_list(fromIdx, toIdx, rec_list) {
	for (var i = fromIdx; i <= toIdx; i++) {
		rec_list[i].setMap(map);
	}
}

for (var i = 0; i < rec_list.length; i++) {
	rec_list[i].setMap(map);
}


