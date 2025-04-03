import express from 'express';
import { ServerConfigController } from '../controllers/serverConfigController';

const router = express.Router();
const serverConfigController = new ServerConfigController();

// Get server configuration
router.get('/', (req, res) => serverConfigController.getServerConfig(req, res));

// Update server configuration
router.put('/', (req, res) => serverConfigController.updateServerConfig(req, res));

// Restart server
router.post('/restart', (req, res) => serverConfigController.restartServer(req, res));

// Stop server
router.post('/stop', (req, res) => serverConfigController.stopServer(req, res));

// Start server
router.post('/start', (req, res) => serverConfigController.startServer(req, res));

export default router;