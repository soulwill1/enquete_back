-- DropForeignKey
ALTER TABLE `PollOption` DROP FOREIGN KEY `PollOption_pollId_fkey`;

-- DropIndex
DROP INDEX `PollOption_pollId_fkey` ON `PollOption`;

-- AddForeignKey
ALTER TABLE `PollOption` ADD CONSTRAINT `PollOption_pollId_fkey` FOREIGN KEY (`pollId`) REFERENCES `Poll`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
