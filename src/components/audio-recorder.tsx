import { useState } from "react"
import { Mic, Square } from "lucide-react"

import { Button } from "./ui/button"

interface Props {
    onAudioAvailable: (audio: Blob) => void
}

export function AudioRecorder({ onAudioAvailable }: Props) {
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
        null
    )

    const onStartRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: { noiseSuppression: true, echoCancellation: true },
        })

        const mediaRecorder = new MediaRecorder(stream, {})
        mediaRecorder.ondataavailable = async (e) => {
            if (e.data?.size) {
                onAudioAvailable(e.data)
            }
        }
        mediaRecorder.start()
        setMediaRecorder(mediaRecorder)
    }

    const onStopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop()
            setMediaRecorder(null)
        }
    }

    return (
        <>
            <Button
                onClick={mediaRecorder ? onStopRecording : onStartRecording}
                className="text-red-700 p-6"
            >
                {mediaRecorder ? (
                    <Square className="animate-pulse w-6 h-6" />
                ) : (
                    <Mic className="w-6 h-6" />
                )}
            </Button>
        </>
    )
}
