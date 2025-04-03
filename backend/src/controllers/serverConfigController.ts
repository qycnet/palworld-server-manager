import { Request, Response } from 'express';
import { PalworldService } from '../services/palworldService';
import logger from '../utils/logger';

export class ServerConfigController {
  private palworldService: PalworldService;

  constructor() {
    this.palworldService = new PalworldService();
  }

  public async getServerConfig(req: Request, res: Response) {
    try {
      const config = await this.palworldService.getServerConfig();
      res.json(config);
    } catch (error) {
      logger.error('Failed to fetch server configuration:', error);
      res.status(500).json({ error: 'Failed to fetch server configuration' });
    }
  }

  public async updateServerConfig(req: Request, res: Response) {
    try {
      const newConfig = req.body;
      const updatedConfig = await this.palworldService.updateServerConfig(newConfig);
      res.json(updatedConfig);
    } catch (error) {
      logger.error('Failed to update server configuration:', error);
      res.status(500).json({ error: 'Failed to update server configuration' });
    }
  }

  public async restartServer(req: Request, res: Response) {
    try {
      await this.palworldService.restartServer();
      res.json({ message: 'Server restart initiated' });
    } catch (error) {
      logger.error('Failed to restart server:', error);
      res.status(500).json({ error: 'Failed to restart server' });
    }
  }

  public async stopServer(req: Request, res: Response) {
    try {
      await this.palworldService.stopServer();
      res.json({ message: 'Server stop initiated' });
    } catch (error) {
      logger.error('Failed to stop server:', error);
      res.status(500).json({ error: 'Failed to stop server' });
    }
  }

  public async startServer(req: Request, res: Response) {
    try {
      await this.palworldService.startServer();
      res.json({ message: 'Server start initiated' });
    } catch (error) {
      logger.error('Failed to start server:', error);
      res.status(500).json({ error: 'Failed to start server' });
    }
  }
}