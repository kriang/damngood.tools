import { useCallback, useEffect, useState } from "react"
import { Mic, RotateCcw, Square } from "lucide-react"

import { Progress } from "@/components/ui/progress"

import { Button } from "./ui/button"

interface Props {
    onAudioAvailable: (audio: Blob, type: string) => void
    maxRecordDuration: number
    onStart: () => void
}

const padLeft = (x) => {
    return Math.abs(x) < 10 ? `0${x}` : x
}
const renderTimeLeft = (current: number, max: number) => {
    const left = (max - current) / 1000

    const leftMinutes = Math.floor(left / 60)
    const leftSeconds = left - leftMinutes * 60

    return `${padLeft(leftMinutes)}:${padLeft(leftSeconds)}`
}

const level = (audioStream: MediaStream, onUpdate: (level: number) => void) => {
    const audioContext = new AudioContext()
    const audioSource = audioContext.createMediaStreamSource(audioStream)
    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 512
    analyser.minDecibels = -127
    analyser.maxDecibels = 0
    analyser.smoothingTimeConstant = 0.4
    audioSource.connect(analyser)
    const volumes = new Uint8Array(analyser.frequencyBinCount)

    const timerId = setInterval(() => {
        analyser.getByteFrequencyData(volumes)
        let volumeSum = 0
        for (let i = 0; i < volumes.length; i++) {
            volumeSum += volumes[i]
        }

        const averageVolume = volumeSum / volumes.length
        // value range: 127 = analyser.maxDecibels - analyser.minDecibels;
        onUpdate((averageVolume * 100) / 127)
    }, 150)

    return () => {
        clearInterval(timerId)
    }
}

export function AudioRecorder({
    onStart,
    onAudioAvailable,
    maxRecordDuration,
}: Props) {
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
        null
    )
    const [recordDuration, setRecordDuration] = useState(0)
    const [inputVolumeLevel, setInputVolumeLevel] = useState(0)

    const onStopRecording = useCallback(() => {
        if (mediaRecorder) {
            mediaRecorder.stop()
            setMediaRecorder(null)
        }
    }, [mediaRecorder])

    const onStartRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: { noiseSuppression: true, echoCancellation: true },
        })

        const stop = level(stream, setInputVolumeLevel)

        const mediaRecorder = new MediaRecorder(stream, {})
        mediaRecorder.ondataavailable = async (e) => {
            if (e.data?.size) {
                onAudioAvailable(e.data, e.data.type)
            }
        }

        const i = setInterval(() => {
            setRecordDuration((d) => d + 1000)
        }, 1000)

        mediaRecorder.onstop = () => {
            stop()
            const tracks = stream.getTracks()
            tracks.forEach((track) => track.stop())
            clearInterval(i)
        }

        mediaRecorder.start()
        setMediaRecorder(mediaRecorder)
        onStart()
    }

    useEffect(() => {
        let t: NodeJS.Timeout | null = null
        if (mediaRecorder) {
            t = setTimeout(() => {
                onStopRecording()
            }, maxRecordDuration)
        }

        return () => {
            if (t) {
                clearTimeout(t)
            }
        }
    }, [mediaRecorder])

    return (
        <>
            <div className="flex flex-row gap-5">                <Button
                    onClick={mediaRecorder ? onStopRecording : onStartRecording}
                    className="text-red-700 p-6"
                >
                    {mediaRecorder ? (
                        <Square className="animate-pulse w-6 h-6" />
                    ) : (
                        <Mic className="w-6 h-6" />
                    )}
                </Button>
            </div>
            {mediaRecorder && (
                <div className="mt-5 flex">
                    <Progress
                        value={inputVolumeLevel}
                        className="mx-auto w-[150px] h-2"
                        indicatorClassName="bg-green-500"
                    />
                </div>
            )}
            <div className="text-center mt-5 text-xl">
                {renderTimeLeft(recordDuration, maxRecordDuration)}
            </div>
        </>
    )
}
