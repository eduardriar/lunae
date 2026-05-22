-- CreateEnum
CREATE TYPE "WhatsappConversationState" AS ENUM ('idle', 'awaiting_service', 'awaiting_date', 'awaiting_slot', 'awaiting_confirmation', 'awaiting_name', 'confirmed');

-- AlterTable
ALTER TABLE "whatsapp_conversations" ADD COLUMN     "context" JSONB,
ADD COLUMN     "state" "WhatsappConversationState" NOT NULL DEFAULT 'idle';
