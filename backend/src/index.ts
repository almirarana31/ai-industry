import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { config } from './config';
import routes from './routes';
import { notFoundHandler, errorHandler } from './middleware';

// Create Express app
const app = express();
const httpServer = createServer(app);

// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: config.corsOrigin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: config.isProduction ? undefined : false,
}));

// CORS configuration
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: {
    success: false,
    error: 'Too many requests, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Request logging in development
if (!config.isProduction) {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
    next();
  });
}

// API routes
app.use('/api', routes);

// Socket.io event handlers
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Join organization room
  socket.on('join-organization', (organizationId: string) => {
    socket.join(`org:${organizationId}`);
    console.log(`Socket ${socket.id} joined org:${organizationId}`);
  });

  // Join user room for personal notifications
  socket.on('join-user', (userId: string) => {
    socket.join(`user:${userId}`);
    console.log(`Socket ${socket.id} joined user:${userId}`);
  });

  // Scenario events
  socket.on('scenario-update', (data: { organizationId: string; userId: string; event: string }) => {
    io.to(`org:${data.organizationId}`).emit('scenario-activity', {
      userId: data.userId,
      event: data.event,
      timestamp: new Date(),
    });
  });

  // Compliance alert
  socket.on('compliance-alert', (data: { organizationId: string; alert: object }) => {
    io.to(`org:${data.organizationId}`).emit('new-compliance-alert', data.alert);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Export for Socket.io access in services
export { io };

// Start server
const PORT = config.port;

httpServer.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   AI Literacy Training Platform - Backend API                ║
║                                                              ║
║   🚀 Server running on port ${PORT}                            ║
║   📡 Environment: ${config.nodeEnv.padEnd(20)}                ║
║   🔗 API: http://localhost:${PORT}/api                         ║
║   💚 Health: http://localhost:${PORT}/api/health               ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  httpServer.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});

export default app;
