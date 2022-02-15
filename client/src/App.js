import "./App.css";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:8080");
const startGame = "start game";
function App() {
  const [username, setUsername] = useState("");
  const [count, setCount] = useState(0);
  // room is id
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  useEffect(() => {
    socket.on("counter", (data) => {
      setCount(data.count);
      // console.log("data.count", data.count);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  console.log("count", count);
  const startTheGame = () => {
    socket.emit("start_game", startGame);
  };
  useEffect(() => {
    socket.on("end_game", (data) => {
      console.log("data", data.endGame);
      alert("this");
    });
  }, [socket]);

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="john.."
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID.."
            onChange={(event) => setRoom(event.target.value)}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}

      <button onClick={startTheGame}>Start Game</button>
    </div>
  );
}

export default App;
