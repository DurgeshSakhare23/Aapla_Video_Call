import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Camera, CameraOff, Mic, MicOff, PhoneOff, Monitor, MonitorOff, MessageCircle, Users, Settings, Maximize2, Minimize2, Video, Wifi, Volume2 } from 'lucide-react';

// Mock socket.io functionality for demo
const mockSocket = {
  connect: () => ({
    on: () => {},
    emit: () => {},
    id: 'mock-socket-id'
  })
};

const server_url = "http://localhost:8080";

var connections = {};

const peerConfigConnections = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" }
    ]
}

export default function VideoMeet() {
    var socketRef = useRef();
    let socketId = useRef();
    let localVideoRef = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);
    let [audioAvailable, setAudioAvailable] = useState(true);
    let [video, setVideo] = useState([]);
    let [videoEnabled, setVideoEnabled] = useState(true);
    let [audio, setAudio] = useState();
    let [audioEnabled, setAudioEnabled] = useState(true);
    let [screen, setScreen] = useState(false);
    let [screenAvailable, setScreenAvailable] = useState(true);
    let [messages, setMessages] = useState([
        { data: { user: "John", message: "Hello everyone!" } },
        { data: { user: "Alice", message: "Great to see you all" } },
        { data: { user: "Bob", message: "The audio quality is excellent" } }
    ]);
    let [message, setMessage] = useState("");
    let [newMessage, setNewMessage] = useState(0);
    let [askForUsername, setAskForUsername] = useState(true);
    let [username, setUsername] = useState("");
    let [showChat, setShowChat] = useState(false);
    let [isFullscreen, setIsFullscreen] = useState(false);
    let [remoteVideos, setRemoteVideos] = useState([
        { socketId: "user1", stream: null },
        { socketId: "user2", stream: null }
    ]);

    const getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (videoPermission) {
                setVideoAvailable(true);
                setAudioAvailable(true);
                setAudio(videoPermission.getAudioTracks()[0]);
                const videoTrack = videoPermission.getVideoTracks()[0];
                if (videoTrack) {
                    setVideoEnabled(videoTrack.enabled);
                }
            }
            if (navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true);
            }
        } catch (err) {
            console.error("Error accessing media devices.", err);
            setVideoAvailable(false);
            setAudioAvailable(false);
            setVideoEnabled(false);
        }
    }

    useEffect(() => {
        getPermissions();
    }, [])

    let connect = () => {
        setAskForUsername(false);
        // Mock connection for demo
        socketRef.current = mockSocket.connect();
        socketId.current = socketRef.current.id;
    }

    let handleVideo = () => {
        setVideoEnabled(!videoEnabled);
    }

    let handleAudio = () => {
        setAudioEnabled(!audioEnabled);
    }

    let handleScreen = () => {
        setScreen(!screen);
    }

    let sendMessage = () => {
        if (message.trim()) {
            setMessages(prev => [...prev, { data: { user: username, message: message } }]);
            setMessage("");
        }
    }

    let handleEndCall = () => {
        console.log("Call ended");
    }

    let toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.15),transparent_50%)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>

            {askForUsername ? (
                <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
                    <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-md border border-white/10 shadow-2xl shadow-purple-500/10 transform hover:scale-105 transition-all duration-300">
                        <div className="text-center mb-8">
                            <div className="relative">
                                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30 animate-pulse">
                                    <Video className="w-10 h-10 text-white" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-20 h-20 rounded-full mx-auto blur-xl opacity-30 animate-pulse"></div>
                            </div>
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-2">
                                Join Meeting
                            </h2>
                            <p className="text-gray-300 text-lg">Enter your name to get started</p>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">Your Name</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                                    placeholder="Enter your name"
                                />
                            </div>
                            
                            <button
                                onClick={connect}
                                disabled={!username.trim()}
                                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-2xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30 relative overflow-hidden group"
                            >
                                <span className="relative z-10">Join Meeting</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                        
                        <div className="mt-8 p-4 bg-black/20 rounded-2xl border border-white/10">
                            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl h-32 flex items-center justify-center">
                                <div className="text-center">
                                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-400 text-sm">Camera Preview</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`flex flex-col h-screen ${isFullscreen ? 'fixed inset-0 z-50' : ''} relative z-10`}>
                    {/* Header */}
                    <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                    <Video className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-white font-semibold text-xl">Video Meeting</h1>
                                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span>Connected</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-3 text-gray-300 bg-white/5 px-4 py-2 rounded-2xl backdrop-blur-sm">
                                    <Users className="w-5 h-5" />
                                    <span className="text-sm font-medium">{remoteVideos.length + 1} participants</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center space-x-1 text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                                        <Wifi className="w-4 h-4" />
                                        <span className="text-sm">Good</span>
                                    </div>
                                    <button
                                        onClick={toggleFullscreen}
                                        className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 text-gray-300 hover:text-white"
                                    >
                                        {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <div className="flex-1 flex relative">
                        {/* Video Area */}
                        <div className={`flex-1 flex flex-col transition-all duration-300 ${showChat ? 'lg:mr-80' : ''}`}>
                            {/* Main Video Grid */}
                            <div className="flex-1 p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
                                    {/* Local Video */}
                                    <div className="relative bg-gradient-to-br from-black/40 to-black/20 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10 group hover:shadow-purple-500/20 transition-all duration-300">
                                        <video
                                            ref={localVideoRef}
                                            autoPlay
                                            muted
                                            playsInline
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/10">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                <span className="text-white text-sm font-medium">You</span>
                                            </div>
                                        </div>
                                        <div className="absolute top-4 right-4 flex space-x-2">
                                            {!audioEnabled && (
                                                <div className="bg-red-500/90 backdrop-blur-sm p-2 rounded-full">
                                                    <MicOff className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                            {!videoEnabled && (
                                                <div className="bg-red-500/90 backdrop-blur-sm p-2 rounded-full">
                                                    <CameraOff className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        {!videoEnabled && (
                                            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
                                                        <span className="text-white text-2xl font-bold">
                                                            {username.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <p className="text-white text-sm font-medium">Camera Off</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Remote Videos */}
                                    {remoteVideos.map((video, index) => (
                                        <div key={video.socketId} className="relative bg-gradient-to-br from-black/40 to-black/20 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10 group hover:shadow-purple-500/20 transition-all duration-300">
                                            <video
                                                className="w-full h-full object-cover"
                                                autoPlay
                                                playsInline
                                            />
                                            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/10">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                    <span className="text-white text-sm font-medium">User {index + 1}</span>
                                                </div>
                                            </div>
                                            <div className="absolute top-4 right-4">
                                                <div className="bg-green-500/90 backdrop-blur-sm p-2 rounded-full">
                                                    <Volume2 className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                            {/* Mock user avatars */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/30">
                                                        <span className="text-white text-2xl font-bold">
                                                            {String.fromCharCode(65 + index)}
                                                        </span>
                                                    </div>
                                                    <p className="text-white text-sm font-medium">User {index + 1}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="p-6 bg-black/20 backdrop-blur-xl border-t border-white/10">
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-3xl p-2 border border-white/10">
                                        <button
                                            onClick={handleVideo}
                                            className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                                                videoEnabled
                                                    ? 'bg-white/10 hover:bg-white/20 text-white shadow-lg'
                                                    : 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30'
                                            }`}
                                        >
                                            {videoEnabled ? <Camera className="w-6 h-6" /> : <CameraOff className="w-6 h-6" />}
                                        </button>

                                        <button
                                            onClick={handleAudio}
                                            className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                                                audioEnabled
                                                    ? 'bg-white/10 hover:bg-white/20 text-white shadow-lg'
                                                    : 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30'
                                            }`}
                                        >
                                            {audioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                                        </button>

                                        {screenAvailable && (
                                            <button
                                                onClick={handleScreen}
                                                className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                                                    screen
                                                        ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                                        : 'bg-white/10 hover:bg-white/20 text-white shadow-lg'
                                                }`}
                                            >
                                                {screen ? <MonitorOff className="w-6 h-6" /> : <Monitor className="w-6 h-6" />}
                                            </button>
                                        )}

                                        <button
                                            onClick={() => setShowChat(!showChat)}
                                            className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 transform hover:scale-110 relative shadow-lg"
                                        >
                                            <MessageCircle className="w-6 h-6" />
                                            {newMessage > 0 && (
                                                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce shadow-lg">
                                                    {newMessage}
                                                </span>
                                            )}
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleEndCall}
                                        className="p-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white transition-all duration-300 transform hover:scale-110 shadow-lg shadow-red-500/30"
                                    >
                                        <PhoneOff className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Chat Sidebar */}
                        <div className={`fixed right-0 top-0 h-full w-80 bg-black/30 backdrop-blur-xl border-l border-white/10 flex flex-col transform transition-transform duration-300 ${showChat ? 'translate-x-0' : 'translate-x-full'} z-20`}>
                            <div className="p-6 border-b border-white/10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-white font-semibold text-xl">Chat</h3>
                                    <button
                                        onClick={() => setShowChat(false)}
                                        className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 text-gray-300 hover:text-white lg:hidden"
                                    >
                                        <Minimize2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {messages.map((item, index) => (
                                    <div key={index} className="space-y-2 animate-fade-in">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                                                <span className="text-white text-xs font-bold">
                                                    {item.data.user.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="text-gray-300 text-sm font-medium">{item.data.user}</span>
                                            <span className="text-gray-500 text-xs">now</span>
                                        </div>
                                        <div className="ml-11 bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                                            <p className="text-white text-sm leading-relaxed">{item.data.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="p-6 border-t border-white/10">
                                <div className="flex space-x-3">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                        placeholder="Type a message..."
                                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}