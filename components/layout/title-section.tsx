import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

interface SectionProps {
    title: string
    description?: string
}

export default function Title({ title, description }: SectionProps) {
    return (
        <MaxWidthWrapper>
<div className="py-6">

            <section className="relative overflow-hidden rounded-2xl bg-[#F9660B] ">
                {/* Decorative curved lines */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='1000' height='1000' viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 500 C 200 400, 800 400, 1000 500' stroke='white' fill='none' stroke-width='100'/%3E%3Cpath d='M 0 700 C 200 600, 800 600, 1000 700' stroke='white' fill='none' stroke-width='100'/%3E%3C/svg%3E")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                <div className="relative z-10 p-8 md:p-12">
                    <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">{title}</h2>
                    {description && <p className="max-w-4xl text-sm leading-relaxed text-white/90 md:text-xl">{description}</p>}
                </div>
            </section>
</div>
        </MaxWidthWrapper>
    )
}

