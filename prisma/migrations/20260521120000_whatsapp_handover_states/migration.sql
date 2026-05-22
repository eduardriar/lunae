-- AlterEnum: add awaiting_menu and human_handover states
ALTER TYPE "WhatsappConversationState" ADD VALUE 'awaiting_menu';
ALTER TYPE "WhatsappConversationState" ADD VALUE 'human_handover';
