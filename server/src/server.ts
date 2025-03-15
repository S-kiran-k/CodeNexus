// Import required modules and libraries
import express, { Response, Request } from "express" // Express for routing and handling HTTP requests
import dotenv from "dotenv" // dotenv to load environment variables
import http from "http" // HTTP module for server creation
import cors from "cors" // CORS for enabling cross-origin requests
import { SocketEvent, SocketId } from "./types/socket" // Custom types for socket events and IDs
import { USER_CONNECTION_STATUS, User } from "./types/user" // Custom types for user data and connection status
import { Server } from "socket.io" // Socket.IO for real-time communication
// import { WebSocketServer, WebSocket } from "ws"; // WebSocket server (commented out)
import { spawn } from "node-pty" // node-pty for spawning terminal processes
import path from "path" // Path utility for file system operations
import { GoogleGenerativeAI } from "@google/generative-ai" // Google Generative AI (commented out)

// Load environment variables from .env file
dotenv.config()

// Initialize express app
const app = express()

// Middleware to parse JSON and handle cross-origin requests
app.use(express.json())
app.use(cors())

// Serve static files (e.g., front-end assets)
app.use(express.static(path.join(__dirname, "public")))

// Create HTTP server
const server = http.createServer(app)

// Initialize Socket.IO server with configurations
const io = new Server(server, {
	cors: {
		origin: "*", // Allow connections from all origins
	},
	maxHttpBufferSize: 1e8, // Max buffer size for HTTP requests
	pingTimeout: 60000, // Timeout for ping response
})

// Array to map users to their sockets
let userSocketMap: User[] = []

// Function to get users in a specific room
function getUsersInRoom(roomId: string): User[] {
	return userSocketMap.filter((user) => user.roomId == roomId)
}

// Function to get room ID associated with a socket ID
function getRoomId(socketId: SocketId): string | null {
	const roomId = userSocketMap.find(
		(user) => user.socketId === socketId
	)?.roomId

	if (!roomId) {
		console.error("Room ID is undefined for socket ID:", socketId)
		return null
	}
	return roomId
}

// Function to get user by socket ID
function getUserBySocketId(socketId: SocketId): User | null {
	const user = userSocketMap.find((user) => user.socketId === socketId)
	if (!user) {
		console.error("User not found for socket ID:", socketId)
		return null
	}
	return user
}

// Socket.IO connection event
io.on("connection", (socket) => {
	// Start a new PTY (pseudo-terminal) process for each connected user
	const ptyProcess = spawn("bash", [], {
		name: "xterm-color", // Terminal type
		env: process.env, // Use environment variables
	});

	// Handle data from the PTY process and send it to the socket
	ptyProcess.onData((data) => {
		socket.emit("terminal-output", data);
	});

	// Handle terminal input from the socket and pass it to the PTY process
	socket.on("terminal-input", (input) => {
		ptyProcess.write(input);
	});

	// Handle socket disconnection and kill the PTY process
	socket.on("disconnect", () => {
		console.log("Socket.io Disconnected");
		ptyProcess.kill();
	});

	// Handle user join requests
	socket.on(SocketEvent.JOIN_REQUEST, ({ roomId, username }) => {
		// Check if the username already exists in the room
		const isUsernameExist = getUsersInRoom(roomId).filter(
			(u) => u.username === username
		)
		if (isUsernameExist.length > 0) {
			io.to(socket.id).emit(SocketEvent.USERNAME_EXISTS) // Notify user if username exists
			return
		}

		// Add user to the user map and broadcast to the room
		const user = {
			username,
			roomId,
			status: USER_CONNECTION_STATUS.ONLINE,
			cursorPosition: 0,
			typing: false,
			socketId: socket.id,
			currentFile: null,
		}
		userSocketMap.push(user)
		socket.join(roomId)
		socket.broadcast.to(roomId).emit(SocketEvent.USER_JOINED, { user })
		const users = getUsersInRoom(roomId)
		io.to(socket.id).emit(SocketEvent.JOIN_ACCEPTED, { user, users })
	})

	// Handle user disconnection
	socket.on("disconnecting", () => {
		const user = getUserBySocketId(socket.id)
		if (!user) return
		const roomId = user.roomId
		socket.broadcast
			.to(roomId)
			.emit(SocketEvent.USER_DISCONNECTED, { user })
		userSocketMap = userSocketMap.filter((u) => u.socketId !== socket.id)
		socket.leave(roomId)
	})

	// File-related events (synchronizing file structure, creating, updating, deleting files)
	socket.on(SocketEvent.SYNC_FILE_STRUCTURE, ({ fileStructure, openFiles, activeFile, socketId }) => {
		io.to(socketId).emit(SocketEvent.SYNC_FILE_STRUCTURE, {
			fileStructure,
			openFiles,
			activeFile,
		})
	})

	socket.on(SocketEvent.DIRECTORY_CREATED, ({ parentDirId, newDirectory }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_CREATED, {
			parentDirId,
			newDirectory,
		})
	})

	// Handle directory updates, renaming, and deletions (similar structure as file actions)
	socket.on(SocketEvent.DIRECTORY_UPDATED, ({ dirId, children }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_UPDATED, {
			dirId,
			children,
		})
	})

	socket.on(SocketEvent.DIRECTORY_RENAMED, ({ dirId, newName }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_RENAMED, {
			dirId,
			newName,
		})
	})

	socket.on(SocketEvent.DIRECTORY_DELETED, ({ dirId }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast
			.to(roomId)
			.emit(SocketEvent.DIRECTORY_DELETED, { dirId })
	})

	// Similar handling for file creation, updating, renaming, and deletion
	socket.on(SocketEvent.FILE_CREATED, ({ parentDirId, newFile }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast
			.to(roomId)
			.emit(SocketEvent.FILE_CREATED, { parentDirId, newFile })
	})

	socket.on(SocketEvent.FILE_UPDATED, ({ fileId, newContent }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.FILE_UPDATED, {
			fileId,
			newContent,
		})
	})

	socket.on(SocketEvent.FILE_RENAMED, ({ fileId, newName }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.FILE_RENAMED, {
			fileId,
			newName,
		})
	})

	socket.on(SocketEvent.FILE_DELETED, ({ fileId }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.FILE_DELETED, { fileId })
	})

	// Handle user status changes (online/offline)
	socket.on(SocketEvent.USER_OFFLINE, ({ socketId }) => {
		userSocketMap = userSocketMap.map((user) => {
			if (user.socketId === socketId) {
				return { ...user, status: USER_CONNECTION_STATUS.OFFLINE }
			}
			return user
		})
		const roomId = getRoomId(socketId)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.USER_OFFLINE, { socketId })
	})

	socket.on(SocketEvent.USER_ONLINE, ({ socketId }) => {
		userSocketMap = userSocketMap.map((user) => {
			if (user.socketId === socketId) {
				return { ...user, status: USER_CONNECTION_STATUS.ONLINE }
			}
			return user
		})
		const roomId = getRoomId(socketId)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.USER_ONLINE, { socketId })
	})

	// Handle chat actions (sending and receiving messages)
	socket.on(SocketEvent.SEND_MESSAGE, ({ message }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast
			.to(roomId)
			.emit(SocketEvent.RECEIVE_MESSAGE, { message })
	})

	// Handle cursor position for typing indication
	socket.on(SocketEvent.TYPING_START, ({ cursorPosition }) => {
		userSocketMap = userSocketMap.map((user) => {
			if (user.socketId === socket.id) {
				return { ...user, typing: true, cursorPosition }
			}
			return user
		})
		const user = getUserBySocketId(socket.id)
		if (!user) return
		const roomId = user.roomId
		socket.broadcast.to(roomId).emit(SocketEvent.TYPING_START, { user })
	})

	socket.on(SocketEvent.TYPING_PAUSE, () => {
		userSocketMap = userSocketMap.map((user) => {
			if (user.socketId === socket.id) {
				return { ...user, typing: false }
			}
			return user
		})
		const user = getUserBySocketId(socket.id)
		if (!user) return
		const roomId = user.roomId
		socket.broadcast.to(roomId).emit(SocketEvent.TYPING_PAUSE, { user })
	})

	// Handle drawing requests and updates (for collaborative drawing)
	socket.on(SocketEvent.REQUEST_DRAWING, () => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast
			.to(roomId)
			.emit(SocketEvent.REQUEST_DRAWING, { socketId: socket.id })
	})

	socket.on(SocketEvent.SYNC_DRAWING, ({ drawingData, socketId }) => {
		socket.broadcast
			.to(socketId)
			.emit(SocketEvent.SYNC_DRAWING, { drawingData })
	})

	socket.on(SocketEvent.DRAWING_UPDATE, ({ snapshot }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.DRAWING_UPDATE, {
			snapshot,
		})
	})
})

// Set the port for the server to listen on
const PORT = process.env.PORT || 3000

// Handle HTTP GET request for the root route
app.get("/", (req: Request, res: Response) => {
	// Send the index.html file for the front-end
	res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})

// Start the server and listen for incoming requests
server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})
