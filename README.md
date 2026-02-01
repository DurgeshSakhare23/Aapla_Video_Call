# Aapla Video Call 🚀  
Real-Time Video Calling Application (Zoom Clone)

## Overview
Aapla Video Call is a real-time, multi-user video calling web application built to understand how peer-to-peer audio and video communication works at a low level.  
The project focuses on WebRTC internals, signaling mechanisms, and real-world constraints like latency, NAT traversal, and connection reliability.

Unlike SDK-based solutions, this project is built using raw WebRTC APIs with a custom signaling server.

---

## Key Objectives
- Understand how real-time audio and video data flows between users
- Learn peer-to-peer networking concepts
- Implement signaling using a separate server
- Handle multi-user room-based communication
- Observe real-world limitations of P2P architectures

---

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Real-Time Media**: WebRTC
- **Signaling Server**: Node.js + Socket.IO
- **Transport**: UDP (via WebRTC)
- **Architecture**: Peer-to-Peer (Mesh)

---

## Architecture Overview
1. Users join a meeting room using a unique room ID
2. A signaling server exchanges:
   - SDP offers and answers
   - ICE candidates
3. Once signaling completes:
   - Direct peer-to-peer media streams are established
   - Audio and video do NOT pass through the server
4. Each participant maintains a peer connection with every other participant (mesh topology)

---

## Features
- Create meeting rooms
- Join existing rooms
- Real-time audio and video communication
- Multi-user support
- Peer-to-peer media streaming
- No media relay through server

---

## WebRTC Flow (Simplified)
1. User grants camera and microphone access
2. RTCPeerConnection is created
3. SDP offer is generated and sent via signaling server
4. Remote peer responds with SDP answer
5. ICE candidates are exchanged
6. Direct media stream starts flowing between peers

---

## Why WebRTC
- Designed specifically for real-time communication
- Low latency using UDP
- Built-in NAT traversal
- Encrypted media by default
- Browser-native support

---

## Why Socket.IO for Signaling
- WebRTC does not define signaling
- Socket.IO enables real-time bidirectional messaging
- Used only for connection setup
- Not involved in media transmission

---

## Limitations
- Uses mesh architecture which does not scale well for large meetings
- No SFU or media server integration
- No screen sharing or recording
- No adaptive bitrate control
- Best suited for small group calls

---

## What I Learned
- WebRTC offer-answer model
- ICE candidate gathering and exchange
- STUN and TURN concepts
- Peer-to-peer networking challenges
- Why large-scale apps do not rely purely on P2P
- Real-time system tradeoffs between latency, quality, and scalability

---

## Future Improvements
- Introduce SFU architecture for scalability
- Add screen sharing support
- Implement chat and meeting controls
- Add TURN server fallback
- Improve UI and UX

---

## One-Line Explanation (Interview Ready)
WebRTC handles peer-to-peer media streaming, Socket.IO handles signaling, and the server never carries audio or video data.

---

## How to Run Locally
```bash
git clone <repository-url>
cd aapla-video-call



---

### Final warning
If you put this on GitHub, **you must be able to defend every line**.  
If you want, next I can:
- Rewrite this README for ATS + recruiter style
- Add an architecture diagram
- Prepare a GitHub project description + resume bullet points
- Run a brutal WebRTC mock interview

Say the word.

npm install
npm start
