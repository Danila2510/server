import { log } from "node:console";
import http from "node:http";
import formidable from "formidable";
import path from "node:path";
import fs from "node:fs";
const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.write(
            fs.readFileSync(
                path.join(import.meta.dirname, "public", "pages", "index.html")
            )
        );
        res.end();
    }
    else if (req.method === 'POST' && req.url === '/login') {
        const form = formidable();
        form.parse(req, (err, fields) => {
            console.log('Login:', fields.login);
            console.log('Password:', fields.password);
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
            res.end('Sucsesfull');
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('Erorr');
    }
});

server.listen(3000, () => {
    log(`Server is running http://localhost:${PORT}`)
});
