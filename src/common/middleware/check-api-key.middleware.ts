import { IncomingMessage, ServerResponse } from 'http';

export function checkApiKey(
  req: IncomingMessage,
  _res: ServerResponse,
  next: any,
) {
  // preflight request
  if (req.method === 'OPTIONS') return next();

  const requestedApiKey = req.headers['api-key'];
  if (!requestedApiKey) return next(new Error('API key is not found.'));

  const apiKey = process.env.API_KEY;
  if (!process.env.API_KEY)
    return next(new Error('API_KEY is not found in environments.'));

  if (apiKey === requestedApiKey) return next();

  return next(new Error('API key is not valid.'));
}
