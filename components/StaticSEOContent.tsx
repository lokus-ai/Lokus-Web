export default function StaticSEOContent() {
  return (
    <div className="sr-only" aria-hidden="false">
      <section>
        <h2>What is Lokus?</h2>
        <p>
          Lokus is a personal knowledge OS for macOS, Windows, and Linux. Built on local-first
          architecture with Tauri v2 and Rust, Lokus stores all notes as plain markdown files on
          the user's device. It is designed for thinking, researching, and creating.
        </p>
        <p>
          Lokus helps users build interconnected knowledge with wiki links, graph visualization,
          infinite canvas, and a template system with over 90 features.
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
          <li>Works offline with local-first data storage</li>
          <li>Cross-platform support for macOS, Windows, and Linux</li>
          <li>Full-text search across all notes</li>
          <li>Tag system with nested tag support</li>
          <li>Slash commands and command palette for quick actions</li>
          <li>Frontmatter and YAML metadata support</li>
          <li>Compatible with standard markdown vault formats</li>
        </ul>
      </section>

      <section>
        <h2>Frequently Asked Questions about Lokus</h2>
        <p>
          <strong>Does Lokus work offline?</strong> Yes, Lokus works offline. All notes
          are stored locally as markdown files.
        </p>
        <p>
          <strong>Can Lokus open existing markdown vaults?</strong> Yes, Lokus uses standard markdown
          and wiki link syntax. Point it at any markdown folder.
        </p>
        <p>
          <strong>Does Lokus support the Zettelkasten method?</strong> Yes, through wiki links,
          backlinks, graph view, and templates for consistent atomic note creation.
        </p>
        <p>
          <strong>What is a local-first app?</strong> A local-first app stores all data on
          the user's device rather than on remote servers, ensuring privacy, offline access, and data
          ownership. Lokus is a local-first app.
        </p>
      </section>
    </div>
  )
}
