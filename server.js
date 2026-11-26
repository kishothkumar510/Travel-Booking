import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDirectory = path.dirname(fileURLToPath(import.meta.url));
const buildDirectory = path.join(projectDirectory, 'dist');
const port = Number(process.env.PORT || 3001);
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};
const assetExtensions = new Set(['.css', '.ico', '.jpeg', '.jpg', '.js', '.json', '.png', '.svg', '.webp']);

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Method not allowed');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname);
  } catch {
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Invalid request path');
    return;
  }

  const requestedFile = path.resolve(buildDirectory, `.${pathname}`);
  const relativePath = path.relative(buildDirectory, requestedFile);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Forbidden');
    return;
  }

  let fileToServe = requestedFile;
  try {
    const fileInfo = await stat(fileToServe);
    if (fileInfo.isDirectory()) fileToServe = path.join(fileToServe, 'index.html');
    else if (!fileInfo.isFile()) fileToServe = null;
  } catch (error) {
    if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') {
      console.error('Unable to inspect requested file:', error);
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Internal server error');
      return;
    }
    fileToServe = null;
  }

  if (!fileToServe && assetExtensions.has(path.extname(pathname).toLowerCase())) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  if (!fileToServe) fileToServe = path.join(buildDirectory, 'index.html');

  try {
    const content = await readFile(fileToServe);
    response.writeHead(200, {
      'Content-Length': content.length,
      'Content-Type': mimeTypes[path.extname(fileToServe).toLowerCase()] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-cache',
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch (error) {
    console.error('Unable to serve the production build:', error);
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Production files are unavailable. Run "npm run build" first.');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`World Trip is running at http://127.0.0.1:${port}`);
});