import { loadSummarizationChain } from "langchain/chains"
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

import { GPT4All } from "./gpt4all-llm"

if (!process.env.GPT4ALL_MODEL) {
    throw new Error("Please, specify the `GPT4ALL_MODEL` environment variable")
}

const model = new GPT4All({
    model: process.env.GPT4ALL_MODEL,
})

export async function generateSummary(url: string) {
    const loader = new CheerioWebBaseLoader(url)

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 4000,
        chunkOverlap: 20,
    })

    const docs = (await textSplitter.splitDocuments(await loader.load()))

    const chain = loadSummarizationChain(model, { type: "map_reduce" })
    const res = await chain.call({
        input_documents: docs,
    })

    if (res && res.text) {
        return res.text
    }

    return null
}
