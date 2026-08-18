import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files (images, css, etc)

// Dashboard data - AZ-ZUHRI operations
const dashboardData = {
  clientName: "AZ-ZUHRI",
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  data: {
    January: { manualBank: 5895.05, billplz: 1005.00, stripe: 150.00, totalCollection: 7050.05, totalCost: 87.50, advertyUpah: 3007.82, clientNet: 3954.73 },
    February: { manualBank: 5446.77, billplz: 2185.00, stripe: 30.00, totalCollection: 7661.77, totalCost: 0.00, advertyUpah: 3309.88, clientNet: 4351.89 },
    March: { manualBank: 9337.97, billplz: 3975.00, stripe: 0.00, totalCollection: 13312.97, totalCost: 123.75, advertyUpah: 5697.74, clientNet: 7491.48 },
    April: { manualBank: 5106.14, billplz: 1190.00, stripe: 0.00, totalCollection: 6296.14, totalCost: 234.65, advertyUpah: 2618.56, clientNet: 3442.93 },
    May: { manualBank: 5821.35, billplz: 1670.00, stripe: 0.00, totalCollection: 7491.35, totalCost: 123.64, advertyUpah: 3182.85, clientNet: 4184.86 },
    June: { manualBank: 4001.27, billplz: 175.00, stripe: 0.00, totalCollection: 4176.27, totalCost: 87.50, advertyUpah: 1766.35, clientNet: 2322.42 },
    July: { manualBank: 3931.53, billplz: 31.00, stripe: 0.00, totalCollection: 3962.53, totalCost: 58.33, advertyUpah: 1686.61, clientNet: 2275.92 }
  },
  totals: {
    totalCollection: 49951.08,
    totalCost: 715.37,
    clientNet: 28024.21
  }
};

// API endpoint - fetch all dashboard data
app.get('/api/dashboard', (req, res) => {
  res.json(dashboardData);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static HTML file
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AZ-ZUHRI Dashboard running on port ${PORT}`);
  console.log(`📊 Open http://localhost:${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api/dashboard`);
});
