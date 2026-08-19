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

// Dashboard data - AZ-ZUHRI operations (2025 & 2026)
const dashboardData = {
  2025: {
    clientName: "AZ-ZUHRI",
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    data: {
      January: { manualBank: 42286.10, billplz: 60105.00, stripe: 0.00, totalCollection: 102391.10, totalCost: 2029.49, advertyUpah: 40144.64, clientNet: 57005.39 },
      February: { manualBank: 22270.03, billplz: 14820.00, stripe: 0.00, totalCollection: 37090.03, totalCost: 1467.97, advertyUpah: 14248.82, clientNet: 20233.33 },
      March: { manualBank: 24586.71, billplz: 39190.00, stripe: 0.00, totalCollection: 63776.71, totalCost: 33938.48, advertyUpah: 11935.29, clientNet: 16948.11 },
      April: { manualBank: 7983.32, billplz: 4355.00, stripe: 0.00, totalCollection: 12338.32, totalCost: 5657.65, advertyUpah: 2672.27, clientNet: 3794.62 },
      May: { manualBank: 10089.15, billplz: 2035.00, stripe: 0.00, totalCollection: 12124.15, totalCost: 6878.93, advertyUpah: 2098.09, clientNet: 2979.28 },
      June: { manualBank: 5991.70, billplz: 110.00, stripe: 0.00, totalCollection: 6101.70, totalCost: 514.76, advertyUpah: 2234.78, clientNet: 3173.38 },
      July: { manualBank: 8636.41, billplz: 860.00, stripe: 0.00, totalCollection: 9496.41, totalCost: 303.80, advertyUpah: 3677.04, clientNet: 5221.40 }
    },
    totals: {
      totalCollection: 243318.42,
      totalCost: 50791.08,
      clientNet: 109355.11
    }
  },
  2026: {
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
  }
};

// Facebook API Configuration
const FACEBOOK_PAGE_ID = '116256619764756';
const FACEBOOK_ACCESS_TOKEN = 'EAAM1TTZBRzhYBSZAm5ZCZCOuJhdwtbwzWABWhtCH78KTTYKZCwBcj542vY6cgrLReNwiUV9qlPZBJwg1qixhvOLgt8s5vKHkmZCcZBROkdAhz0CZC47VsdeMyqyroAKOYgbx4TZA6TrFCHGICyzSwSTSi7tuvi7irZBoPNYHxkh1js8KSRKa3dC9mBXZA9ags1qGu6QtSHo07AG0M6uc0qzn01LNG4S6xhWGWY8ONl0yalyaFhQZCTZA4KBAWlc0ZAoann3IkhAoQPFuwDhGepAKqt63ktcf21d';

// Mock Facebook metrics (fallback data)
const facebookMetrics = {
  impressions: 1250,
  engagement: 89,
  comments: 23,
  shares: 12,
  newLikes: 45,
  videoViews: 567,
  clickThroughRate: 3.2
};

// API endpoint - fetch all dashboard data
app.get('/api/dashboard', (req, res) => {
  res.json({
    2025: dashboardData[2025],
    2026: dashboardData[2026],
    facebook: facebookMetrics
  });
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
