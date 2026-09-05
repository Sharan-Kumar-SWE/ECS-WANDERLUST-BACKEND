import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import connectDB from './config/db.js';
import { PORT } from './config/utils.js';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';
const app = express();
const port = PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(compression());

// Versioned API routes
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/auth', authRouter);

app.get('/api/v1/test', (req, res) => {
  res.send('Yay!! Backend v2 of wanderlust app is now accessible on new helm deployment');
});


async function startServer() {
  try {
    await connectDB();

    app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'API is healthy',
        version: 'v2',
        timestamp: new Date().toISOString()
      });
    });

    app.listen(port, () => {
      console.log(`Server is running on port -- ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();

export default app;
