// ── Mirror the hook's Message type exactly ───────────────────────────────────
export interface TChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// ── Props ─────────────────────────────────────────────────────────────────────
export interface TChatbotProps {
  botName?: string;
  placeholder?: string;
}

export interface TMessageBubbleProps {
  message: TChatMessage;
  // Only the last bot message gets the typewriter effect
  isLatestBotMessage: boolean;
}

export interface TChatHeaderProps {
  botName: string;
  onReset: () => void;
  onClose: () => void;
}

export interface TChatInputProps {
  onSend: (text: string) => void;
  isFetching: boolean;
  placeholder?: string;
}

export interface TChatTriggerProps {
  isOpen: boolean;
  unreadCount?: number;
  onClick: () => void;
}