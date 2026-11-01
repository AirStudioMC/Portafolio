import express from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.set('trust proxy', true);
app.use(express.json());

// Persistent storage for unique IP visits
const DATA_DIR = path.resolve(process.cwd(), 'data');
const VISITS_FILE = path.join(DATA_DIR, 'visits.json');

interface VisitData {
  uniqueIps: string[]; // SHA-256 hashed IPs for privacy & anti-duplication
  initialSeed: number;
  lastUpdated: string;
}

function loadVisits(): VisitData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(VISITS_FILE)) {
      const content = fs.readFileSync(VISITS_FILE, 'utf-8');
      const data = JSON.parse(content);
      return {
        uniqueIps: Array.isArray(data.uniqueIps) ? data.uniqueIps : [],
        initialSeed: typeof data.initialSeed === 'number' ? data.initialSeed : 164,
        lastUpdated: data.lastUpdated || new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error('Error reading visits storage:', err);
  }
  return { uniqueIps: [], initialSeed: 164, lastUpdated: new Date().toISOString() };
}

function saveVisits(data: VisitData) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(VISITS_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving visits storage:', err);
  }
}

let visitsData = loadVisits();

function hashIp(ip: string): string {
  return crypto.createHash('sha256').update(ip.trim().toLowerCase()).digest('hex');
}

function getClientIp(req: express.Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  } else if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].trim();
  }
  return req.ip || (req.socket && req.socket.remoteAddress) || '127.0.0.1';
}

// GET /api/visits - Get current count and status for requester's IP
app.get('/api/visits', (req, res) => {
  const clientIp = getClientIp(req);
  const hashed = hashIp(clientIp);
  const alreadyVisited = visitsData.uniqueIps.includes(hashed);
  const totalCount = visitsData.initialSeed + visitsData.uniqueIps.length;

  res.json({
    count: totalCount,
    uniqueVisitors: visitsData.uniqueIps.length,
    alreadyVisited,
    ipHashPrefix: hashed.substring(0, 8),
  });
});

// POST /api/visits - Register visit only if IP is unique
app.post('/api/visits', (req, res) => {
  const clientIp = getClientIp(req);
  const hashed = hashIp(clientIp);
  const alreadyVisited = visitsData.uniqueIps.includes(hashed);

  if (!alreadyVisited) {
    visitsData.uniqueIps.push(hashed);
    saveVisits(visitsData);
  }

  const totalCount = visitsData.initialSeed + visitsData.uniqueIps.length;

  res.json({
    count: totalCount,
    uniqueVisitors: visitsData.uniqueIps.length,
    isNew: !alreadyVisited,
    alreadyVisited: true,
    ipHashPrefix: hashed.substring(0, 8),
    message: alreadyVisited 
      ? 'Esta IP ya está contabilizada previamente. No se incrementa.' 
      : 'Nueva visita única por IP contabilizada con éxito.',
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT} [${isProd ? 'production' : 'development'}]`);
  });
}

startServer();
