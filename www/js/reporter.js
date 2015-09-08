var reporter = {
    
    prepareReportFile: function () {
    
        var today = new Date().toJSON().slice(0,10);
        
        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir) {
            
            dir.getFile(today + ".txt", {create:true}, function(file) {
                console.log("got the file", file);
                logOb = file;
            });
        });
    },
    
    write: function (str) {
        if(!logOb) return;
        //var log = str + " [" + (new Date()) + "]\n";
        var log = str+"\n";
        logOb.createWriter(function(fileWriter) {
            
            fileWriter.seek(fileWriter.length);
            
            var blob = new Blob([log], {type:'text/plain'});
            fileWriter.write(blob);
            console.log("ok, in theory i worked");
        }, reporter.failedToWrite);
    },
    
    failedToWrite: function () {
        console.log("writing failed");
    },
    
    
    clearReportsStorage : function() {
        localStorage["reports"] = ""
    },
    
    writeToLog : function(time, name, coords) {
        
        coords = coords.latitude.toFixed(3) + ", " + coords.longitude.toFixed(3);
        
        var entry = "["+time+"] "+name+" ["+coords+"]";
            
        var log_;
        if (localStorage["reports"]) {
            log_ = JSON.parse(localStorage["reports"]);
            log_.unshift(entry)
        } else {
            log_ = [entry];
        }
        
        
        app.log.innerHTML = log_.join("\n");
        localStorage["reports"] = JSON.stringify(log_);
        
    },
    
    writeToFile: function(time, species, coords) {
        reporter.write([time,
                     species,
                     coords.latitude,
                     coords.longitude,
                     coords.accuracy].join());
    },
    
    
    report: function(species) {
        
        var time = app.getTime();
        var name = BATS[species];
        app.show("loading", true);
        var coords = navigator.geolocation.getCurrentPosition(function (position){
            
            reporter.writeToLog(time, name, position.coords);
            reporter.writeToFile(time, species, position.coords);
            
            app.show("loading", false);
        }, function (error) {
            updateLog("no position");
            app.show("loading", false);
        },
        {timeout: 2000,}); 
        
        
    },
    
    
    
}