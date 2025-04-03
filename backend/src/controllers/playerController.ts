import { Request, Response } from 'express';
import { PalworldService } from '../services/palworldService';

export class PlayerController {
  private palworldService: PalworldService;

  constructor() {
    this.palworldService = new PalworldService();
  }

  public async getPlayers(req: Request, res: Response) {
    try {
      const searchQuery = req.query.search as string | undefined;
      const players = await this.palworldService.getPlayers(searchQuery);
      res.json(players);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch players' });
    }
  }

  public async getPlayerDetails(req: Request, res: Response) {
    try {
      const playerId = req.params.id;
      const playerDetails = await this.palworldService.getPlayerDetails(playerId);
      if (playerDetails) {
        res.json(playerDetails);
      } else {
        res.status(404).json({ error: 'Player not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch player details' });
    }
  }

  public async banPlayer(req: Request, res: Response) {
    try {
      const playerId = req.params.id;
      const isBanned = req.path.endsWith('/ban');
      await this.palworldService.updatePlayerBanStatus(playerId, isBanned);
      res.json({ success: true, message: `Player ${isBanned ? 'banned' : 'unbanned'} successfully` });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update player ban status' });
    }
  }

  public async kickPlayer(req: Request, res: Response) {
    try {
      const playerId = req.params.id;
      const reason = req.body.reason;
      await this.palworldService.kickPlayer(playerId, reason);
      res.json({ success: true, message: 'Player kicked successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to kick player' });
    }
  }

  public async sendMessage(req: Request, res: Response) {
    try {
      const playerId = req.params.id;
      const message = req.body.message;
      await this.palworldService.sendMessageToPlayer(playerId, message);
      res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message' });
    }
  }

  public async updatePlayerPermissions(req: Request, res: Response) {
    try {
      const playerId = req.params.id;
      const permissions = req.body.permissions;
      await this.palworldService.updatePlayerPermissions(playerId, permissions);
      res.json({ success: true, message: 'Player permissions updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update player permissions' });
    }
  }
}