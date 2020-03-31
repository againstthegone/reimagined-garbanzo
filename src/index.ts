import fs from 'fs';
import http from 'http';

http.createServer(function (req, res) {
    const filePath = req.url === '/' ? '/index.html' : req.url;
    fs.readFile(__dirname + filePath, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
}).listen(8080);