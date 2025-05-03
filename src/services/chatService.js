import axiosCustom from "../utils/axiosCustom";
import {getAccessToken} from "../utils/token";

// REST API services
export const getChatsService = async () => {
  return await axiosCustom.get(`/api/chats/`);
};

export const getMessagesService = async (id) => {
  return await axiosCustom.get(`/api/chats/${id}/messages/`);
};

// WebSocket connection management
export class ChatWebSocketService {
  constructor(
    otherUserId,
    onMessageCallback,
    onConnectCallback,
    onCloseCallback
  ) {
    this.socket = null;
    this.otherUserId = otherUserId;
    this.onMessageCallback = onMessageCallback;
    this.onConnectCallback = onConnectCallback;
    this.onCloseCallback = onCloseCallback;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectTimeout = null;
  }

  connect() {
    try {
      // Get the authentication token
      const token = getAccessToken();

      if (!token) {
        console.error("Authentication token not found");
        return false;
      }

      // Create WebSocket connection
      const wsUrl = `ws://localhost:8000/ws/chat/${this.otherUserId}/`;
      this.socket = new WebSocket(wsUrl);

      // Add authorization header to the WebSocket connection
      this.socket.onopen = () => {
        console.log("WebSocket connection established");
        // Immediately after connection, send the auth token
        // Note: WebSocket doesn't support custom headers, but we can send them in the first message
        // The backend should handle this
        this.socket.send(
          JSON.stringify({
            type: "authentication",
            token: `Bearer ${token}`,
          })
        );

        this.reconnectAttempts = 0;
        if (this.onConnectCallback) {
          this.onConnectCallback();
        }
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (this.onMessageCallback) {
          this.onMessageCallback(data);
        }
      };

      this.socket.onclose = (event) => {
        console.log("WebSocket connection closed:", event.code, event.reason);
        if (this.onCloseCallback) {
          this.onCloseCallback(event);
        }

        // Attempt to reconnect if not closed intentionally
        if (event.code !== 1000) {
          this.attemptReconnect();
        }
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      return true;
    } catch (error) {
      console.error("Failed to establish WebSocket connection:", error);
      return false;
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);

      console.log(`Attempting to reconnect in ${delay / 1000} seconds...`);

      this.reconnectTimeout = setTimeout(() => {
        console.log(
          `Reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`
        );
        this.connect();
      }, delay);
    }
  }

  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      // Format the message according to the backend consumer's expected format
      const messageData = {
        message: message.content,
      };

      this.socket.send(JSON.stringify(messageData));
      return true;
    }
    return false;
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.socket) {
      this.socket.close(1000, "Closed intentionally");
      this.socket = null;
    }
  }
}

// Additional chat-related services
export const createChatService = async (userId) => {
  const res = await axiosCustom.post(`/api/chats/`, { other_user_id: userId });
  return res;
};

export const sendMessageService = async (chatId, content) => {
  const res = await axiosCustom.post(`/api/chats/${chatId}/messages/`, {
    content,
  });
  return res;
};

// Helper function to create and initialize a WebSocket connection
export const initChatWebSocket = (
  otherUserId,
  onMessage,
  onConnect,
  onClose
) => {
  const wsService = new ChatWebSocketService(
    otherUserId,
    onMessage,
    onConnect,
    onClose
  );
  wsService.connect();
  return wsService;
};
