const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Manejar la solicitud para la ruta /movies
    if (req.url === '/movies') {
        // Leer el archivo JSON
        fs.readFile(path.join(__dirname, 'movies.json'), (err, data) => {
            if (err) {
                // Si hay un error al leer el archivo, responder con un código de error 500
                res.writeHead(500);
                res.end('Error interno del servidor');
            } else {
                // Establecer el tipo de contenido como JSON
                res.writeHead(200, { 'Content-Type': 'application/json' });
                // Enviar el contenido del archivo JSON como respuesta
                res.end(data);
            }
        });
    } else {
        // Si la ruta solicitada no es /movies, servir el archivo HTML como antes
        let filePath = path.join(__dirname, req.url === '/' ? 'ejerciciojson.html' : req.url);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error interno del servidor');
            } else {
                let contentType = 'text/html'; // Establecer el tipo de contenido predeterminado como HTML
                if (filePath.endsWith('.json')) {
                    contentType = 'application/json'; // Establecer el tipo de contenido como JSON si es un archivo JSON
                }
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}/`);
});
