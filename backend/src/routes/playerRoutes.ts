import express from 'express';
import { PlayerController } from '../controllers/playerController';

const router = express.Router();
const playerController = new PlayerController();

// Get all players with optional search
router.get('/', (req, res) => playerController.getPlayers(req, res));

// Get player details
router.get('/:id', (req, res) => playerController.getPlayerDetails(req, res));

// Ban/unban player
router.post('/:id/ban', (req, res) => playerController.banPlayer(req, res));
router.post('/:id/unban', (req, res) => playerController.banPlayer(req, res));

// Kick player
router.post('/:id/kick', (req, res) => playerController.kickPlayer(req, res));

// Send message to player
router.post('/:id/message', (req, res) => playerController.sendMessage(req, res));

// Update player permissions
router.put('/:id/permissions', (req, res) => playerController.updatePlayerPermissions(req, res));

export default router;