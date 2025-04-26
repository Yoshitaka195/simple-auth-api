import { IncomingMessage, ServerResponse } from 'http';

export function healthCheck(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void,
): void {
  if (req.url === '/status.html') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
  }

  next();
}
