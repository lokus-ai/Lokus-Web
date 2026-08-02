import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "How Lokus handles your data — locally, on your device.",
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-white">{title}</h2>
        <div className="text-gray-400 leading-relaxed space-y-3">{children}</div>
    </section>
)

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-400 text-lg">Last updated: August 2, 2026</p>
                </div>

                <Section title="The short version">
                    <p>
                        Lokus is a local-first application. Your notes, files, and calendar data live on
                        your device. We do not run servers that store your documents, we do not sell data,
                        and we do not use your content for advertising or to train AI models.
                    </p>
                </Section>

                <Section title="What Lokus stores, and where">
                    <p>
                        Everything you create in Lokus — notes, tasks, canvases, kanban boards, and synced
                        calendar events — is stored in files and a local database on your own computer.
                        Deleting the app or your workspace deletes that data.
                    </p>
                </Section>

                <Section title="Google user data">
                    <p>
                        If you choose to connect Google Calendar, Lokus requests the following scopes:
                        read-only access to your calendar list and events
                        (<code className="text-gray-300">calendar.readonly</code>), the ability to create and
                        edit events (<code className="text-gray-300">calendar.events</code>), and your email
                        address (<code className="text-gray-300">userinfo.email</code>) to label the connected
                        account.
                    </p>
                    <p>
                        Calendar data retrieved from Google is stored <strong className="text-gray-200">only in a local
                        database on your device</strong> so your calendar loads instantly and works offline. It is
                        never transmitted to Lokus servers (we don&apos;t have any that receive it), never shared
                        with third parties, never sold, and never used for advertising or model training.
                        OAuth tokens are stored in your operating system&apos;s secure keychain.
                    </p>
                    <p>
                        Lokus&apos;s use and transfer of information received from Google APIs adheres to the{" "}
                        <a
                            className="text-blue-400 hover:underline"
                            href="https://developers.google.com/terms/api-services-user-data-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google API Services User Data Policy
                        </a>
                        , including the Limited Use requirements.
                    </p>
                    <p>
                        You can disconnect a Google account at any time from Preferences → Connections inside
                        Lokus, which deletes its locally stored events and tokens. You can also revoke
                        Lokus&apos;s access from your{" "}
                        <a
                            className="text-blue-400 hover:underline"
                            href="https://myaccount.google.com/permissions"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google Account permissions page
                        </a>
                        .
                    </p>
                </Section>

                <Section title="Other connected services">
                    <p>
                        The same rules apply to Microsoft, iCloud/CalDAV, Notion, and iCal calendar
                        connections: credentials go in your system keychain, fetched data stays in the local
                        database on your device, and disconnecting removes it.
                    </p>
                </Section>

                <Section title="Accounts and payments">
                    <p>
                        If you create a Lokus account on this website, we store the email address and
                        authentication details needed to operate it. Payments, when offered, are processed by
                        our payment provider; we never see or store card numbers.
                    </p>
                </Section>

                <Section title="Telemetry">
                    <p>
                        The Lokus desktop app does not track you. Optional crash reports, if enabled, contain
                        technical error details only — never your notes or calendar contents.
                    </p>
                </Section>

                <Section title="Contact">
                    <p>
                        Questions about this policy: <a className="text-blue-400 hover:underline" href="mailto:prathambiren2618@gmail.com">prathambiren2618@gmail.com</a>
                    </p>
                </Section>
            </div>
        </div>
    )
}
