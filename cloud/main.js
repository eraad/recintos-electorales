Parse.Cloud.define("generateGeoPoints", function(request, response) {
    Parse.Cloud.useMasterKey();
    var query = new Parse.Query("Recinto");
    query.skip(3050);
    query.limit(200);
    query.find({
	success: function(results) {
	    var updatedObjects = [];
	    for (var i = 0; i < results.length; ++i) {
		if (results[i].get("Y") != null) {
		    var updatedObject;
		    var point = new Parse.GeoPoint({latitude: results[i].get("Y"), longitude: results[i].get("X")});
		    updatedObject = results[i].set("position", point);
		    updatedObjects.push(updatedObject);
		}
	    }
	    Parse.Object.saveAll(updatedObjects, {
		success: function(savedObjects) {
		    response.success(savedObjects);
		},
		error: function(error) {
		    console.log(error);
		    response.error(error);
		}
	    });
	},
	error: function() {
	    response.error("User lookup failed");
	}
    });
});

Parse.Cloud.job("bgGenerateGeoPoints", function(request, status) {
    Parse.Cloud.useMasterKey();
    var query = new Parse.Query("Recinto");
    query.skip(2000);
    query.limit(1000);
    query.find({
	success: function(results) {
	    var updatedObjects = [];
	    for (var i = 0; i < results.length; ++i) {
		if (results[i].get("Y") != null) {
		    var updatedObject;
		    var point = new Parse.GeoPoint({latitude: results[i].get("Y"), longitude: results[i].get("X")});
		    updatedObject = results[i].set("position", point);
		    updatedObjects.push(updatedObject);
		}
	    }
	    Parse.Object.saveAll(updatedObjects, {
		success: function(savedObjects) {
		    status.success("Migration completed successfully.")
		},
		error: function(error) {
		    console.log(error);
		    status.error("ocurrio un error");
		}
	    });
	},
	error: function() {
	    status.error("ocurrio un error");
	}
    });
});
