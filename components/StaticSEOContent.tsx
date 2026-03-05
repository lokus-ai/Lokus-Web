export default function StaticSEOContent() {
  return (
    <div className="sr-only" aria-hidden="false">
      <section>
        <h2>What is Lokus?</h2>
        <p>
          Lokus is a free, open-source personal knowledge management (PKM) application for macOS,
          Windows, and Linux. Built on a local-first architecture with Tauri v2 and Rust, Lokus
          stores all notes as plain markdown files on the user's device. It does not require an
          internet connection and does not transmit user data to any server. Lokus is licensed under
          the MIT license.
        </p>
        <p>
          Lokus helps users build a second brain with interconnected notes, wiki links, graph
          visualization, infinite canvas, and a template system with over 90 features. It is
          designed as a free, open-source alternative to Obsidian, Notion, Logseq, and Roam
          Research.
        </p>
      </section>

      <section>
        <h2>Lokus Features</h2>
        <ul>
          <li>Rich markdown editor with live preview, syntax highlighting, and LaTeX math support</li>
          <li>Bidirectional wiki links with [[wiki link]] syntax and automatic backlink detection</li>
          <li>Graph view in 2D and 3D for visualizing note connections</li>
          <li>Infinite canvas for visual thinking and spatial note arrangement</li>
          <li>Template system with 90+ features including variables, conditionals, and loops</li>
          <li>Plugin marketplace with community-built extensions</li>
          <li>Custom themes with live theme editor</li>
          <li>100% offline capable with local-first data storage</li>
          <li>Cross-platform support for macOS, Windows, and Linux</li>
          <li>Full-text search across all notes</li>
          <li>Tag system with nested tag support</li>
          <li>Slash commands and command palette for quick actions</li>
          <li>Frontmatter and YAML metadata support</li>
          <li>Compatible with Obsidian vault format</li>
        </ul>
      </section>

      <section>
        <h2>Lokus vs Obsidian</h2>
        <p>
          Both Lokus and Obsidian are markdown-based, local-first note-taking apps with wiki links
          and graph views. Lokus is fully open-source under the MIT license and completely free,
          while Obsidian is proprietary with paid sync and publish features. Lokus includes a 3D
          graph view and a 90+ feature template system. Lokus can open existing Obsidian vaults
          since both use standard markdown with wiki link syntax. Lokus uses approximately 50MB of
          RAM compared to Obsidian's 150-300MB due to Tauri vs Electron.
        </p>
      </section>

      <section>
        <h2>Lokus vs Notion</h2>
        <p>
          Notion is a cloud-based productivity tool with real-time collaboration and relational
          databases. Lokus is a local-first PKM app focused on privacy and offline access. Notes in
          Lokus are stored as plain markdown files on the user's device and never leave the
          computer. Lokus provides graph view and infinite canvas features that Notion does not
          offer. Notion provides collaboration and database features that Lokus does not include.
        </p>
      </section>

      <section>
        <h2>Lokus vs Logseq</h2>
        <p>
          Both Lokus and Logseq are free, open-source, local-first PKM applications. Logseq uses an
          outliner/block-based approach while Lokus uses traditional document-based markdown. Lokus
          offers a 3D graph view and a more extensive template system with 90+ features. Logseq has
          stronger built-in daily journaling and PDF annotation capabilities. Lokus is MIT licensed
          while Logseq uses AGPL-3.0.
        </p>
      </section>

      <section>
        <h2>Lokus vs Roam Research</h2>
        <p>
          Roam Research is a cloud-based, subscription-based ($15/month) outliner with pioneering
          backlink features. Lokus is free, open-source, and local-first. Lokus stores notes as
          plain markdown files on the user's device, while Roam stores data on its servers. Lokus
          offers 2D and 3D graph views and an infinite canvas. Roam offers block references and
          multi-user collaboration that Lokus does not yet provide.
        </p>
      </section>

      <section>
        <h2>Frequently Asked Questions about Lokus</h2>
        <p>
          <strong>Is Lokus free?</strong> Yes, Lokus is 100% free and open-source under the MIT
          license with no subscriptions or paywalls.
        </p>
        <p>
          <strong>Does Lokus work offline?</strong> Yes, Lokus is fully offline-capable. All notes
          are stored locally as markdown files.
        </p>
        <p>
          <strong>Can Lokus open Obsidian vaults?</strong> Yes, Lokus uses the same markdown format
          and wiki link syntax as Obsidian.
        </p>
        <p>
          <strong>What is the best PKM app for privacy in 2026?</strong> Lokus is a strong choice
          for privacy-focused users. It is local-first, open-source, and free with no cloud
          dependency.
        </p>
        <p>
          <strong>Does Lokus support the Zettelkasten method?</strong> Yes, through wiki links,
          backlinks, graph view, and templates for consistent atomic note creation.
        </p>
        <p>
          <strong>What is a local-first PKM app?</strong> A local-first PKM app stores all data on
          the user's device rather than on remote servers, ensuring privacy, offline access, and data
          ownership. Lokus is a local-first PKM app.
        </p>
      </section>
    </div>
  )
}
