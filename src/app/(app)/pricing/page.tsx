import Link from "next/link"

import { fontHeading } from "@/lib/fonts"
import { buttonVariants } from "@/components/ui/button"
import SenjaEmbed from "@/components/senja-embed"

export default function PricingPage() {
    const pricingPlans = [
        {
            name: "Free",
            price: "$0",
            href: "/",
            subtitle: "enjoy basic features",
            highlight: false,
            callToAction: "Get Started",
        },
        {
            name: "Premium",
            price: "$45",
            href: "/sign-up",
            subtitle: "a one-time payment",
            highlight: true,
            callToAction: "Get Started",
        },
        {
            name: "Open-Source",
            price: "Your Time",
            href: "https://github.com/krasun/damngood.tools",
            subtitle: "host yourself",
            highlight: false,
            callToAction: "Check Out",
        },
    ]

    return (
        <>
            <div className="flex flex-col items-center gap-10 text-center">
                <h1
                    className={`text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl ${fontHeading.variable}`}
                >
                    Pay once. Enjoy daily.
                </h1>
                <p className="max-w-[500px] text-lg text-muted-foreground sm:text-xl">
                    Start for free and get premium access with only a one-time
                    payment once you need it.
                </p>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 px-10 sm:px-20">
                {pricingPlans.map((p) => (
                    <div
                        className={`shadow dark:border dark:border-slate-800 rounded-3xl flex flex-col items-center p-5 ${
                            p.highlight && "shadow-lg"
                        }`}
                    >
                        <div className="text-sm">{p.name}</div>
                        <div className="mt-5 text-3xl font-bold tracking-tight">
                            {p.price}
                        </div>
                        {p.subtitle && (
                            <div className="mt-2 text-muted-foreground">
                                {p.subtitle}
                            </div>
                        )}
                        <div className="mt-5 w-full">
                            <Link
                                href={p.href}
                                className={`${buttonVariants({
                                    variant: "default",
                                })} w-full`}
                            >
                                {p.callToAction}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {process.env.NEXT_PUBLIC_SENJA_WALL_WIDGET_ID && (
                <div className="mt-20 flex flex-col items-center gap-10 text-center">
                    <h1
                        className={`text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl ${fontHeading.variable}`}
                    >
                        Beyond Expectations
                    </h1>
                    <p className="max-w-[500px] text-lg text-muted-foreground sm:text-xl">
                        People love using Damn Good Tools daily.
                    </p>
                </div>
            )}
            {process.env.NEXT_PUBLIC_SENJA_WALL_WIDGET_ID && (
                <div>
                    <div className="flex flex-row gap-5 items-center justify-center my-10">
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
