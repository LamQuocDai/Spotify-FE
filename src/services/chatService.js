import axiosCustom from "../utils/axiosCustom";
import { getAccessToken } from "../utils/token";
import { jwtDecode } from "jwt-decode";

// REST API services
export const getChatsService = async () => {
  return await axiosCustom.get(`/api/chats/`);
};

export const getMessagesService = async (id) => {
  return await axiosCustom.get(`/api/chats/${id}/messages/`);
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
    this.maxReconnectAttempts = 3;
    this.reconnectTimeout = null;
    this.isAuthenticated = false;

    // Get current user ID from token
    const token = getAccessToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        this.userId = decoded.user_id;
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }

  connect() {
    // Close any existing socket first
    if (this.socket) {
      this.socket.close(1000, "Reconnecting");
      this.socket = null;
    }

    try {
      const token = getAccessToken();
      if (!token) {
        console.error("No authentication token found");
        return false;
      }

      // Use the simplest and most reliable approach - query parameters
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const host = "localhost:8000";

      // Pass the raw token as a query parameter
      const wsUrl = `${protocol}//${host}/ws/chat/${
        this.otherUserId
      }/?token=${encodeURIComponent(token)}`;
      console.log("Connecting to WebSocket with token in URL");

      // Create a simple WebSocket with no protocols
      this.socket = new WebSocket(wsUrl);

      // Set up connection timeout
      const connectionTimeout = setTimeout(() => {
        if (this.socket && this.socket.readyState !== WebSocket.OPEN) {
          console.log("WebSocket connection timeout");
          if (this.socket) {
            this.socket.close();
            this.socket = null;
          }
        }
      }, 5000);

      // Set up event handlers
      this.socket.onopen = (event) => {
        clearTimeout(connectionTimeout);
        console.log("WebSocket connection established");

        // Mark as authenticated immediately since token is in URL
        this.isAuthenticated = true;
        this.reconnectAttempts = 0;

        if (this.onConnectCallback) {
          this.onConnectCallback();
        }

        // Start ping interval
        this.startPingInterval();
      };

      this.socket.onmessage = (event) => {
        try {
          console.log("WebSocket message received:", event.data);
          const data = JSON.parse(event.data);

          // Handle different message types
          if (data.type === "authentication_success") {
            console.log("WebSocket authentication successful");
            this.isAuthenticated = true;
          } else if (data.type === "authentication_error") {
            console.error("WebSocket authentication failed:", data.message);
            this.isAuthenticated = false;
          } else if (data.type === "pong") {
            console.log("Received pong from server");
          } else if (this.onMessageCallback) {
            this.onMessageCallback(data);
          }
        } catch (error) {
          console.error(
            "Error processing WebSocket message:",
            error,
            event.data
          );
        }
      };

      this.socket.onclose = (event) => {
        clearTimeout(connectionTimeout);
        this.stopPingInterval();

        console.log("WebSocket connection closed:", event.code, event.reason);
        this.isAuthenticated = false;

        if (this.onCloseCallback) {
          this.onCloseCallback(event);
        }

        // Attempt to reconnect if not closed intentionally
        if (
          event.code !== 1000 &&
          this.reconnectAttempts < this.maxReconnectAttempts
        ) {
          this.attemptReconnect();
        }
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      return true;
    } catch (error) {
      console.error("Connection setup failed:", error);
      return false;
    }
  }

  // Keep the connection alive with ping messages
  startPingInterval() {
    this.pingInterval = setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        try {
          this.socket.send(JSON.stringify({ type: "ping" }));
        } catch (error) {
          console.error("Error sending ping:", error);
          this.stopPingInterval();
        }
      } else {
        this.stopPingInterval();
      }
    }, 25000); // 25 seconds
  }

  stopPingInterval() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(
        1000 * Math.pow(1.5, this.reconnectAttempts),
        5000
      );

      console.log(`Attempting to reconnect in ${delay / 1000} seconds...`);

      this.reconnectTimeout = setTimeout(() => {
        console.log(
          `Reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`
        );
        this.connect();
      }, delay);
    } else {
      console.log("Maximum reconnection attempts reached.");
    }
  }

  sendMessage(messageData) {
    if (!this.socket) {
      console.warn("Cannot send message: WebSocket not initialized");
      return false;
    }

    if (this.socket.readyState !== WebSocket.OPEN) {
      console.warn(
        `Cannot send message: WebSocket not open (state: ${this.getReadyStateString()})`
      );
      return false;
    }

    // If not authenticated, don't try re-authenticating automatically
    // This can cause infinite loops if authentication is failing
    if (!this.isAuthenticated) {
      console.warn("Cannot send message: WebSocket not authenticated");
      return false;
    }

    // Format the message with the expected structure
    const formattedMessage = {
      message: messageData.message,
    };

    try {
      console.log("Sending WebSocket message:", formattedMessage);
      this.socket.send(JSON.stringify(formattedMessage));
      return true;
    } catch (error) {
      console.error("Error sending message:", error);
      return false;
    }
  }

  getReadyStateString() {
    if (!this.socket) return "not initialized";

    switch (this.socket.readyState) {
      case WebSocket.CONNECTING:
        return "connecting";
      case WebSocket.OPEN:
        return "open";
      case WebSocket.CLOSING:
        return "closing";
      case WebSocket.CLOSED:
        return "closed";
      default:
        return "unknown";
    }
  }

  disconnect() {
    this.stopPingInterval();

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.socket) {
      if (this.socket.readyState === WebSocket.OPEN) {
        try {
          this.socket.send(JSON.stringify({ type: "disconnect" }));
        } catch (error) {
          console.error("Error sending disconnect message:", error);
        }
      }

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

// New function to search for users to chat with
export const searchUsersService = async (query) => {
  const res = await axiosCustom.get(
    `/api/users/search/?q=${encodeURIComponent(query)}`
  );
  return res;
};

export const sendMessageService = async (chatId, message) => {
  const res = await axiosCustom.post(`/api/chats/${chatId}/messages/`, {
    message, // Changed from content to message
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
