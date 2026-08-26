function VoiceRecorder({ onRecordingComplete }) {
    const [isRecording, setIsRecording] = React.useState(false);
    const [audioBlob, setAudioBlob] = React.useState(null);
    const [audioUrl, setAudioUrl] = React.useState(null);
    const [timer, setTimer] = React.useState(0);
    const [errorMessage, setErrorMessage] = React.useState(null);
    const mediaRecorderRef = React.useRef(null);
    const timerIntervalRef = React.useRef(null);

    React.useEffect(() => {
        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            if (audioUrl) URL.revokeObjectURL(audioUrl);
        };
    }, [audioUrl]);

    const startRecording = async () => {
        setErrorMessage(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            const chunks = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                setAudioBlob(blob);
                setAudioUrl(url);
                onRecordingComplete(blob); // Pass blob back to parent
                
                // Stop all tracks to release microphone
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setTimer(0);
            timerIntervalRef.current = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);

        } catch (err) {
            console.error("Error accessing microphone:", err);
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDismissedError') {
                setErrorMessage("Microphone access denied. Please allow microphone permissions in your browser settings.");
            } else if (err.name === 'NotFoundError') {
                setErrorMessage("No microphone found. Please connect a microphone and try again.");
            } else {
                setErrorMessage("Could not access microphone. " + err.message);
            }
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(timerIntervalRef.current);
        }
    };

    const deleteRecording = () => {
        setAudioBlob(null);
        setAudioUrl(null);
        onRecordingComplete(null);
        setTimer(0);
        setErrorMessage(null);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full">
            <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Voice Message</div>
            
            {errorMessage && (
                <div className="mb-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                    <div className="icon-circle-alert text-red-500 mt-0.5 shrink-0"></div>
                    <div>
                        <p className="text-xs text-red-400">{errorMessage}</p>
                        <button 
                            type="button" 
                            onClick={() => setErrorMessage(null)}
                            className="text-xs text-red-300 underline mt-1 hover:text-white"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}
            
            {!audioUrl ? (
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                            isRecording 
                            ? 'bg-red-500/20 text-red-500 border border-red-500/50 animate-pulse' 
                            : 'bg-white/5 border border-white/10 text-gray-300 hover:text-cyan-400 hover:border-cyan-500/30'
                        }`}
                    >
                        {isRecording ? (
                            <>
                                <div className="icon-square fill-current text-sm"></div>
                                <span>Stop ({formatTime(timer)})</span>
                            </>
                        ) : (
                            <>
                                <div className="icon-mic text-sm"></div>
                                <span>Record Voice Note</span>
                            </>
                        )}
                    </button>
                    {isRecording && <span className="text-xs text-red-400 animate-bounce">● Recording...</span>}
                </div>
            ) : (
                <div className="flex items-center gap-3 p-2 bg-white/5 border border-white/10 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                        <div className="icon-mic text-cyan-400 text-sm"></div>
                    </div>
                    <audio src={audioUrl} controls className="h-8 w-48 md:w-64" />
                    <button 
                        type="button"
                        onClick={deleteRecording}
                        aria-label="Delete recording"
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete recording"
                    >
                        <div className="icon-trash-2"></div>
                    </button>
                </div>
            )}
        </div>
    );
}