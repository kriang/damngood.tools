import Link from "next/link"
import {
    Aperture,
    FileCheck,
    FileCog2,
    FileSearch,
    FileText,
    FileType,
    MessageSquare,
    Monitor,
} from "lucide-react"

import { getCurrentUser } from "@/lib/session"
import { Tool } from "@/lib/tools"
import { PageHeader } from "@/components/page-header"
import SenjaEmbed from "@/components/senja-embed"

import { tool } from "./tools/scrolling-screenshots/tool"

export default async function IndexPage() {
    const u = await getCurrentUser()

    const tools: Tool[] = [tool]

    const allTools = [
        {
            name: "Privacy Policy Generator",
            description:
                "Generate privacy policy in a few seconds according to your preferences.",
            icon: <FileCog2 />,
            link: "/tools/privacy-policy-generator",
        },
        {
            name: "Screenshots",
            description:
                "Quickly test your website for popular screen dimensions.",
            icon: <Aperture />,
            link: "/tools/screenshots-for-dimensions",
        },
        {
            name: "Full Page Screenshots",
            description: "Render a full-page screenshot of any website.",
            icon: <Monitor />,
            link: "/tools/full-page-screenshots",
        },
        {
            name: "Detect Fonts",
            description:
                "Quickly detect fonts used on any website and get links on how to install or download them.",
            icon: <FileType />,
            link: "/tools/detect-fonts",
        },
        {
            name: "Chat With Any PDF",
            description:
                "Upload a PDF file and ask any questions about it. Let AI answer them.",
            icon: <FileSearch />,
            link: "/tools/chat-pdf",
        },
        {
            name: "Summarize Any URL",
            description: "Quickly summarize any website or URL.",
            icon: <FileText />,
            link: "/tools/summarize-any-url",
        },
        {
            name: "Grammar Fixer",
            description: "Fix the grammar of any text in one click.",
            icon: <FileCheck />,
            link: "/tools/grammar-fixer",
        },
        {
            name: "Damn Good Chat",
            description:
                "A better ChatGPT alternative that supports superb ChatGPT plugins.",
            icon: <MessageSquare />,
            link: "/tools/damn-good-chat",
        },
        ...tools.map((t) => {
            return {
                ...t,
                link: `/tools/${t.slug}`,
            }
        }),
    ]

    return (
        <>
            <PageHeader
                heading="Oh, these damn good tools"
                subheading="Easy-to-use, fun tools—free (and open-source)."
            />
            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
                {allTools.map((tool, idx) => (
                    <div
                        key={idx}
                        className="p-5 shadow rounded-[12px] dark:shadow-slate-900"
                    >
                        <Link
                            href={tool.link}
                            className="flex flex-row items-center gap-2 text-2xl font-bold tracking-tight"
                        >
                            <span className="text-red-500 dark:text-red-700">
                                {tool.icon}
                            </span>
                            <div className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">
                                {tool.name}
                            </div>
                        </Link>
                        <p className="ml-8 mt-2 text-muted-foreground">
                            {tool.description}
                        </p>
                    </div>
                ))}
            </div>
            {process.env.NEXT_PUBLIC_SENJA_WALL_WIDGET_ID && (
                <div className="mt-10 flex max-w-[980px] flex-col items-start gap-2">
                    <PageHeader
                        heading="Beyond Expectations"
                        subheading="People love using Damn Good Tools daily."
                    />
                </div>
            )}
            {process.env.NEXT_PUBLIC_SENJA_WALL_WIDGET_ID && (
                <div>
                    <div className="flex flex-row gap-5 items-center justify-start my-10">
                        <a
                            key="day"
                            href="https://www.producthunt.com/posts/damn-good-tools?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-damn&#0045;good&#0045;tools"
                            target="_blank"
                        >
                            <img
                                src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=395421&theme=neutral&period=daily"
                                alt="Damn&#0032;Good&#0032;Tools - Easy&#0045;to&#0045;use&#0044;&#0032;fun&#0032;productivity&#0032;tools&#0032;&#0045;&#0032;free&#0032;&#0038;&#0032;open&#0045;source | Product Hunt"
                                style={{ width: "250px", height: "54px" }}
                                width="250"
                                height="54"
                            />
                        </a>
                        <a
                            key="month"
                            href="https://www.producthunt.com/posts/damn-good-tools?utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_souce=badge-damn&#0045;good&#0045;tools"
                            target="_blank"
                        >
                            <img
                                src="https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=395421&theme=neutral&period=monthly&topic_id=267"
                                alt="Damn&#0032;Good&#0032;Tools - Easy&#0045;to&#0045;use&#0044;&#0032;fun&#0032;productivity&#0032;tools&#0032;&#0045;&#0032;free&#0032;&#0038;&#0032;open&#0045;source | Product Hunt"
                                style={{ width: "250px", height: "54px" }}
                                width="250"
                                height="54"
                            />
                        </a>
                    </div>
                    <SenjaEmbed
                        widgetId={process.env.NEXT_PUBLIC_SENJA_WALL_WIDGET_ID}
                    />
                </div>
            )}
        </>
    )
}
