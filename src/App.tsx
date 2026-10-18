import { useState, type PointerEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Activity,
  Code2,
  BriefcaseBusiness,
  Asterisk,
} from "lucide-react";
import "./App.css";

const projects = [
  {
    number: "01",
    title: "Lorem studio",
    category: "Web",
    label: "Design & development",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=85",
    alt: "Sculptural white architecture against a clear sky",
    tone: "mint",
  },
  {
    number: "02",
    title: "Ipsum collective",
    category: "Web",
    label: "Digital experience",
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=85",
    alt: "Sunlight catching the texture of an ocean wave",
    tone: "blue",
  },
  {
    number: "03",
    title: "Dolor playground",
    category: "Experiments",
    label: "Creative exploration",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1000&q=85",
    alt: "Sculptural geometric architecture viewed from below",
    tone: "coral",
  },
];

const filters = ["All", "Web", "Experiments"] as const;
const currentYear = new Date().getFullYear();
type Filter = (typeof filters)[number];

function moveHighlight(event: PointerEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--pointer-x",
    `${event.clientX - bounds.left}px`,
  );
  event.currentTarget.style.setProperty(
    "--pointer-y",
    `${event.clientY - bounds.top}px`,
  );
}

function App() {
  const [filter, setFilter] = useState<Filter>("All");
  const visibleProjects = projects.filter(
    (project) => filter === "All" || project.category === filter,
  );

  return (
    <>
      <header className="site-header" id="top">
        <a className="wordmark" href="#top" aria-label="BZL home">
          bzl<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          <a className="work-link" href="#work">
            Selected work <ArrowDown size={13} />
          </a>
          <span className="nav-divider" aria-hidden="true" />
          <a href="https://bssk.bzl.no/" target="_blank" rel="noreferrer">
            BSSK Scoreboard <ArrowUpRight size={14} />
          </a>
          <a href="https://booking.bzl.no/" target="_blank" rel="noreferrer">
            Booking <ArrowUpRight size={14} />
          </a>
        </nav>
        <span className="header-note">
          <span className="status-dot" /> Lorem ipsum
        </span>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2400&q=90"
            alt="Glass skyscrapers viewed from below"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <div className="eyebrow hero-eyebrow">
              <span className="tiny-cross">+</span> Personal portfolio{" "}
              <span className="edition">Vol. 001 / 2026</span>
            </div>
            <h1 id="hero-title">
              BZL<span className="hero-period">.</span>
              <Asterisk className="hero-asterisk" aria-hidden="true" />
            </h1>
            <p className="hero-statement">
              Lorem ipsum.
              <br />
              <span>Dolor sit amet.</span>
            </p>
            <div className="hero-bottom">
              <a className="round-link" href="#work">
                <span className="round-icon">
                  <ArrowDown size={20} />
                </span>{" "}
                Explore the work
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur
                <br className="desktop-break" /> adipiscing elit. Nunc vitae
                libero.
              </p>
              <span className="hero-coordinate">LOREM / IPSUM / DOLOR</span>
            </div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1, 2, 3].map((item) => (
              <span className="ticker-group" key={item}>
                Lorem ipsum <Asterisk /> Dolor sit amet <Asterisk /> Consectetur{" "}
                <Asterisk /> Adipiscing elit <Asterisk />
              </span>
            ))}
          </div>
        </div>

        <section
          className="work-section section-shell"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-kicker">
            <span className="tiny-cross">+</span> Lorem ipsum dolor sit amet{" "}
            <span>01 / 03</span>
          </div>
          <div className="section-heading">
            <h2 id="work-title">
              Selected work<span className="heading-count">(03)</span>
            </h2>
            <div className="filters" role="group" aria-label="Filter projects">
              {filters.map((item) => (
                <button
                  type="button"
                  key={item}
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                  {item === "All" && <span>03</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="project-grid" aria-live="polite" aria-atomic="true">
            {visibleProjects.map((project) => (
              <article
                className={`project-card ${project.tone}`}
                key={project.number}
                onPointerMove={moveHighlight}
                tabIndex={0}
                aria-label={`${project.title}, ${project.label}`}
              >
                <div className="project-visual">
                  <img src={project.image} alt={project.alt} loading="lazy" />
                  <span className="project-index">/{project.number}</span>
                  <span className="project-category">{project.category}</span>
                  <div className="project-art" aria-hidden="true">
                    {project.number === "01"
                      ? "L / S"
                      : project.number === "02"
                        ? "ipsum."
                        : "PLAY"}
                    <span>
                      {project.number === "03"
                        ? "EXPERIMENT NO. 003"
                        : "LOREM IPSUM DOLOR"}
                    </span>
                  </div>
                  <span className="card-pulse" aria-hidden="true">
                    <Activity size={21} />
                  </span>
                </div>
                <div className="project-info">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.label}</p>
                  </div>
                  <span className="project-year">2026</span>
                </div>
              </article>
            ))}
          </div>
          <div className="work-footnote">
            <span>
              <span className="status-dot" /> Lorem ipsum. Semper curiosus.
            </span>
            <span>Dolor sit amet.</span>
          </div>
        </section>

        <section
          className="about-section section-shell"
          aria-labelledby="about-title"
        >
          <div className="section-kicker">
            <span className="tiny-cross">+</span> Consectetur adipiscing elit{" "}
            <span>02 / 03</span>
          </div>
          <div className="about-layout">
            <div className="about-symbol" aria-hidden="true">
              <Asterisk strokeWidth={1} />
            </div>
            <div className="about-copy">
              <h2 id="about-title">
                Lorem ipsum.
                <br />
                <span>Dolor sit amet, consectetur.</span>
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Nulla vitae elit libero, a pharetra augue.
              </p>
              <div className="about-tags">
                <span>Lorem</span>
                <span>Ipsum</span>
                <span>Dolor sit amet</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <section
          className="contact-section section-shell"
          aria-labelledby="contact-title"
        >
          <div className="section-kicker">
            <span className="tiny-cross">+</span> Nunc vitae libero{" "}
            <span>03 / 03</span>
          </div>
          <div className="contact-heading">
            <h2 id="contact-title">
              Lorem ipsum?
              <br />
              <span>Dolor sit hello.</span>
            </h2>
            <ArrowUpRight aria-hidden="true" />
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className="social-links">
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              <Code2 size={18} /> GitHub <ArrowUpRight size={16} />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              <BriefcaseBusiness size={18} /> LinkedIn{" "}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
        <div className="site-footer section-shell">
          <a className="wordmark" href="#top" aria-label="BZL home">
            bzl<span>.</span>
          </a>
          <span>© {currentYear} BZL. Lorem ipsum, always.</span>
          <a className="back-top" href="#top">
            Back to top <ArrowUp size={16} />
          </a>
          <span className="footer-signoff">
            Lorem ipsum dolor <ArrowRight size={14} />
          </span>
        </div>
      </footer>
    </>
  );
}

export default App;
