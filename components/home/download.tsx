"use client";

import { useEffect, useState } from "react";
import { Reveal, DISPLAY } from "./reveal";

const RELEASES_API = "https://api.github.com/repos/lokus-ai/lokus/releases?per_page=5";
const RELEASES_PAGE = "https://github.com/lokus-ai/lokus/releases";

const PLATFORMS = [
  { id: "mac", name: "Mac", detail: "Apple Silicon", pattern: /_aarch64\.dmg$/ },
  { id: "windows", name: "Windows", detail: "10 and 11", pattern: /_x64-setup\.exe$/ },
  { id: "linux", name: "Linux", detail: "AppImage", pattern: /_amd64\.AppImage$/ },
];

type Asset = { name: string; browser_download_url: string };
type Release = { tag_name: string; draft: boolean; assets: Asset[] };

export function Download() {
  const [release, setRelease] = useState<Release | null>(null);

  // The newest release with installers, pre-releases included; if GitHub does not answer, the buttons open the releases page.
  useEffect(() => {
    let cancelled = false;
    fetch(RELEASES_API, { headers: { Accept: "application/vnd.github+json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((list: Release[]) => {
        const found = list.find((r) => !r.draft && r.assets.length > 0);
        if (!cancelled && found) setRelease(found);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="download" className="scroll-mt-24 px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className={`${DISPLAY} text-4xl leading-[1.1] text-[#f4f4f2] md:text-6xl`}>
            Download Lokus.
          </h2>
          <p className="mt-5 text-lg text-[#a3a3a0]">
            Free and open source.{release ? ` Version ${release.tag_name.replace(/^v/, "")}.` : ""}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {PLATFORMS.map((platform, i) => {
            const asset = release?.assets.find((a) => platform.pattern.test(a.name));
            return (
              <Reveal key={platform.id} delay={i * 0.08}>
                <a
                  href={asset?.browser_download_url ?? RELEASES_PAGE}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[#17181a] p-6 transition-colors hover:bg-[#1e2022]"
                >
                  <span>
                    <span className="block text-lg font-medium text-[#f4f4f2]">{platform.name}</span>
                    <span className="mt-0.5 block text-sm text-[#a3a3a0]">{platform.detail}</span>
                  </span>
                  <span aria-hidden className="text-xl text-[#a3a3a0] transition-transform group-hover:translate-y-0.5 group-hover:text-[#f4f4f2]">
                    ↓
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-[#a3a3a0]">
          Intel Mac and other builds are on the{" "}
          <a href={RELEASES_PAGE} className="text-[#f4f4f2] underline underline-offset-4">
            releases page
          </a>
          .
        </p>
      </div>
    </section>
  );
}
