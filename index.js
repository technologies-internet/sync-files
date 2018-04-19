var express = require("express"),
    glob    = require('glob'),
    request = require('request'),
    fs      = require('fs');

var [_node, _index_js, port, msgDir, ...peers] = process.argv;

var app = express();

var syncFiles = function() {
    var url = peers[0];
    console.log(" ... syncing with "+url);
    peers.push(peers.shift());
    request(url+"ls", function(err, x, body) {
        if (err) return console.log(err);
        var files = JSON.parse(body);
        files.map( function( file ) {
            if (! fs.existsSync(msgDir+"/"+file)) {
                console.log("    .... downloading "+file+" ...");
                var ext = Math.random(),
                    filename = msgDir+"/"+file+"_"+ext;
                request(url+file)
                    .pipe(fs.createWriteStream(filename))
                    .on('finish', function(){ 
                        fs.renameSync(filename,msgDir+"/"+file);
                    });
            };
        });
    });
};

app.get("/ls", function(req,res) {
    glob("*.json", {cwd: msgDir},  function(err, files) { 
      res.json(files);
    });
});

app.use(express.static(msgDir));

app.listen(port, function(){
  console.log("serveur  : [http://localhost:"+port+"/ls]");
  console.log("  msgDir : "+msgDir);
  console.log("  peers  : "+peers);
  setInterval(syncFiles, 10000);
});

