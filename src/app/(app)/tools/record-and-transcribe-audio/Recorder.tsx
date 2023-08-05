"use client"

import { useState } from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { AudioRecorder } from "@/components/audio-recorder"

const transcribeAudioRequest = async (audioFile: Blob) => {
    const formData = new FormData()
    formData.append("file", audioFile, "audio.webm")
    try {
        const response = await fetch(
            "/tools/record-and-transcribe-audio/api/transcribe",
            {
                method: "POST",
                body: formData,
            }
        )
        if (response.ok) {
            const { text, summary, success, message } = await response.json()
            if (success && text && summary) {
                return { success, text, summary }
            } else {
                return { success, message }
            }
        } else {
            return { success: false }
        }
    } catch (error) {
        console.error(error)

        return { success: false }
    }
}

export function Recorder() {
    const [text, setText] = useState("")
    const [summary, setSummary] = useState("")
    const [processing, setProcessing] = useState(false)

    const onAudioAvailable = (blob: Blob) => {
        setProcessing(true)
        transcribeAudioRequest(blob)
            .then((result) => {
                setProcessing(false)
                if (result.success) {
                    setText(result.text ? result.text : "")
                    setSummary(result.summary ? result.summary : "")
                }
            })
            .catch((reason) => {
                setProcessing(false)
                console.error(reason)
            })
    }

    return (
        <>
            <div className="flex">
                <div className="mx-auto flex flex-col items-center">
                    <div className="mt-10">
                        {processing ? (
                            <div className="animate-pulse">Transcribing...</div>
                        ) : (
                            <AudioRecorder
                                onAudioAvailable={onAudioAvailable}
                            />
                        )}
                    </div>
                    {(summary || text) && (
                        <Card className="max-w-[550px] mt-20">
                            <CardHeader>
                                {summary && (
                                    <CardDescription>{summary}</CardDescription>
                                )}
                            </CardHeader>
                            {text && (
                                <CardContent>
                                    <p>{text}</p>
                                </CardContent>
                            )}
                        </Card>
                    )}
                </div>
            </div>
        </>
    )
}
