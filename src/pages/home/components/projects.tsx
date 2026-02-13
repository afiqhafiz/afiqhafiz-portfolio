import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive dashboard for managing online stores with real-time analytics, inventory management, and order tracking.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["React", "TypeScript", "Tailwind", "Chart.js"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with drag-and-drop functionality, real-time updates, and team collaboration features.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    tags: ["Next.js", "Prisma", "Socket.io", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "A beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
    tags: ["React", "OpenWeather API", "Leaflet", "GSAP"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
  },
  {
    id: 4,
    title: "Portfolio Generator",
    description:
      "A tool that helps developers create stunning portfolios by simply filling in their information and selecting themes.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["Vue.js", "Firebase", "Tailwind", "Vite"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
  },
  {
    id: 5,
    title: "Chat Application",
    description:
      "Real-time chat application with end-to-end encryption, file sharing, and group chat capabilities.",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "WebSocket", "MongoDB"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
  },
  {
    id: 6,
    title: "AI Image Generator",
    description:
      "An AI-powered image generation tool that creates unique artwork based on text prompts using machine learning.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    tags: ["Python", "TensorFlow", "React", "FastAPI"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
  },
];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const viewMoreRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    filter === "featured"
      ? projects.filter((p) => p.featured)
      : projects;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        filtersRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: filtersRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        viewMoreRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: viewMoreRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.children;
    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.9, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, [filter]);

  return (
    <section ref={sectionRef} id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-12">
          <p className="text-primary-400 font-mono text-sm mb-2"># Projects</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of projects I&apos;ve worked on, showcasing my skills in
            frontend development and creative problem-solving.
          </p>
        </div>

        <div ref={filtersRef} className="flex justify-center gap-4 mb-12">
          {["all", "featured"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as "all" | "featured")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === f
                  ? "bg-primary-500 text-white"
                  : "bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="glass rounded-2xl overflow-hidden card-hover h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                  
                  {project.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                      Featured
                    </div>
                  )}

                  <div
                    className={`absolute inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center gap-4 transition-opacity duration-300 ${
                      hoveredProject === project.id
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                      aria-label="View Code"
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-primary-500 rounded-full hover:bg-primary-600 transition-colors"
                      aria-label="Live Demo"
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-mono text-primary-300 bg-primary-500/10 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={viewMoreRef} className="text-center mt-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold btn-outline text-white"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
