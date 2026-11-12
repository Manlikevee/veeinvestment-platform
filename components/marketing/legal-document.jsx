import Link from "next/link";
import { AlertTriangle, ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { PageHero } from "./page-hero";
import {
  legalDocuments,
  legalDraftNotice,
  legalIndex,
  legalLastUpdated,
} from "@/lib/data/legal";

export function LegalDocument({ documentKey }) {
  const document = legalDocuments[documentKey];
  if (!document) return null;

  return (
    <>
      <PageHero
        eyebrow={document.eyebrow}
        title={document.title}
        description={document.intro}
        breadcrumbs={[{ label: "Legal" }, { label: document.title }]}
        aside={
          <div className="hero-aside-card">
            <h3>Document status</h3>
            <div className="hero-aside-list">
              <div className="hero-aside-row"><span>Version</span><strong>Draft 2026.1</strong></div>
              <div className="hero-aside-row"><span>Updated</span><strong>{legalLastUpdated}</strong></div>
              <div className="hero-aside-row"><span>Review</span><strong>Required</strong></div>
              <div className="hero-aside-row"><span>Owner</span><strong>Compliance</strong></div>
            </div>
          </div>
        }
      />

      <section className="section">
        <div className="container content-grid">
          <article>
            <div className="legal-draft">
              <AlertTriangle size={17} />
              <span>{legalDraftNotice}</span>
            </div>
            <div className="legal-meta">
              <span className="badge badge-sand">Draft</span>
              <span>Last updated {legalLastUpdated}</span>
              <span>·</span>
              <span>{document.sections.length} sections</span>
            </div>
            <div className="prose">
              {document.sections.map((section) => (
                <section key={section.heading}>
                  <h2 id={section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>{section.heading}</h2>
                  {section.body ? <p>{section.body}</p> : null}
                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  ) : null}
                </section>
              ))}
              {document.table ? (
                <section>
                  <h2 id="cookie-table">Cookie reference table</h2>
                  <table>
                    <thead><tr><th>Category</th><th>Name</th><th>Purpose</th><th>Duration</th></tr></thead>
                    <tbody>
                      {document.table.map((row) => (
                        <tr key={row.name}><td>{row.category}</td><td>{row.name}</td><td>{row.purpose}</td><td>{row.duration}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              ) : null}
            </div>
            <div className="info-note" style={{ marginTop: 30 }}>
              <ShieldCheck size={17} />
              <span>Legal content is configuration-managed in the CMS. Changes must be versioned and require approval by legal and compliance.</span>
            </div>
          </article>

          <aside className="content-sidebar">
            <div className="sidebar-card">
              <h3>Legal documents</h3>
              <div className="legal-index" style={{ marginTop: 12 }}>
                {legalIndex.map((item) => (
                  <Link href={item.href} className="legal-index-link" key={item.href}>
                    <span>{item.label}</span>
                    <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </div>
            <div className="sidebar-card">
              <span className="document-icon" style={{ marginBottom: 12 }}><FileText size={18} /></span>
              <h3>Need clarification?</h3>
              <p>Contact the compliance team if you need this document explained or provided in another format.</p>
              <Link href="/contact" className="btn btn-primary">Contact compliance</Link>
            </div>
            <div className="sidebar-card">
              <h3>Raise a concern</h3>
              <p>Formal complaints are logged, acknowledged and tracked with a reference.</p>
              <Link href="/complaints" className="text-link">Complaints process <ArrowRight size={14} /></Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
