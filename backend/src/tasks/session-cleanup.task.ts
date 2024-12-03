// src/tasks/session-cleanup.task.ts

import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionCleanupTask {
  constructor(private readonly prisma: PrismaService) {}

  // Method to start the scheduled job
  public startCleanup() {
    // Schedule the job to run every day at midnight
    cron.schedule('0 0 * * *', async () => {
      console.log('Running session cleanup job...');

      try {
        // Delete expired sessions from the database
        const deletedSessions = await this.prisma.session.deleteMany({
          where: {
            expiresAt: {
              lt: new Date(), // Expired sessions
            },
          },
        });

        console.log(`Deleted ${deletedSessions.count} expired sessions.`);
      } catch (error) {
        console.error('Error during session cleanup:', error);
      }
    });
  }
}
