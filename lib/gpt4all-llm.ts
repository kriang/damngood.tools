import { BaseLLMParams, LLM } from "langchain/llms/base"

export interface GPT4AllInput {
    model: string
    decoderConfig?: Record<string, unknown>
}

export class GPT4All extends LLM implements GPT4AllInput {
    model: GPT4AllInput["model"]
    decoderConfig: Record<string, unknown>
    instance: any

    constructor(fields: GPT4AllInput & BaseLLMParams) {
        super(fields)

        this.model = fields.model
        this.decoderConfig = fields.decoderConfig ?? {}
    }

    _llmType() {
        return "gpt4all"
    }

    async _call(prompt: string, _stop?: string[]): Promise<string> {
        if (!this.instance) {
            const imports = await GPT4All.imports()

            const gpt4all = new imports.GPT4All(
                this.model,
                false,
                this.decoderConfig
            )

            await gpt4all.init()
            await gpt4all.open()

            this.instance = gpt4all
        }

        const output = await this.caller.call(
            async () => await this.instance.prompt(prompt)
        )

        return output
    }

    static async imports(): Promise<{
        GPT4All: typeof import("gpt4all").GPT4All
    }> {
        try {
            const { GPT4All } = await import("gpt4all")
            return { GPT4All }
        } catch (e) {
            throw new Error(
                "Please install `gpt4all` as a dependency with, e.g. `yarn add gpt4all`"
            )
        }
    }
}
