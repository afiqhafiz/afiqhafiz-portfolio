import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  type: "work" | "education";
}

const experiences: Experience[] = [
  {
    id: 1,
    role: "Frontend Engineer",
    company: "Ant International",
    location: "Kuala Lumpur, Malaysia",
    period: "September 2024 - Present",
    description: [
      "Own and maintain several modules for Antom Business Account (Portal)",
      "Developed dynamic, user-focused interfaces using React and internal Ant libraries",
      "Collaborate with stakeholders to design and implement effective solutions",
      "Perform daily system analysis to understand requirements and ensure robust implementations",
      "Write clean, reusable, and maintainable code following best practices in software development",
      "Implement monitoring, logging, and other tools for performance optimization and issue resolution",
      "Continuously optimize and improve frontend workflows and code quality"
    ],
    technologies: ["React", "TypeScript", "Next.js", "GraphQL", "AWS"],
    type: "work",
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Agmo Studio Sdn. Bhd.",
    location: "Petaling Jaya, Malaysia",
    period: "July 2023 - August 2024",
    description: [
      "Devising effective solutions to development challenges",
      "Craft website usign Angular, AngularJs, Tailwind and Bootstrap",
      "Maintain, fix and create new feature for web application",
    ],
    technologies: ["Angular", "AngularJs", "Tailwind CSS", "Azure"],
    type: "work",
  },
  {
    id: 3,
    role: "Software Engineer (Intern)",
    company: "Petronas Digital Sdn. Bhd.",
    location: "Kuala Lumpur, Malaysia",
    period: "June 2022 - August 2022",
    description: [
      "Creating a mobile application using Flutter",
      "Learn Flutter framework",
      "Learn JavaScript, MySQL, PHP and Git",
    ],
    technologies: ["JavaScript", "React", "CSS3", "HTML5", "Git", "Flutter"],
    type: "work",
  },
  {
    id: 4,
    role: "Bachelor of Computer Science (Cyber Security)",
    company: "Universiti Tenaga Nasional",
    location: "Selangor, Malaysia",
    period: "2020 - 2023",
    description: [
      "Graduated with First Class Honors",
      "Specialized in Cyber Security",
      "President of Student Representative Council",
      "Developed a final year project on 2FA Authentication",
    ],
    technologies: ["Java", "Python", "C++", "SQL"],
    type: "education",
  },
];

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const filteredExperiences = experiences.filter((exp) => exp.type === activeTab);

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
        tabsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tabsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!timelineRef.current) return;

    const items = timelineRef.current.querySelectorAll(".timeline-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      }
    );

    const triggers: ScrollTrigger[] = [];
    items.forEach((item) => {
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        onLeave: () => {
          const itemId = Number(item.getAttribute("data-id"));
          if (expandedId === itemId) {
            setExpandedId(null);
          }
        },
        onLeaveBack: () => {
          const itemId = Number(item.getAttribute("data-id"));
          if (expandedId === itemId) {
            setExpandedId(null);
          }
        },
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [activeTab, expandedId]);

  const toggleExpand = (id: number) => {
    const newExpandedId = expandedId === id ? null : id;
    setExpandedId(newExpandedId);
  };

  return (
    <section ref={sectionRef} id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="text-center mb-12">
          <p className="text-primary-400 font-mono text-sm mb-2"># Experience</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A timeline of my professional growth and learning experiences.
          </p>
        </div>

        <div ref={tabsRef} className="flex justify-center gap-4 mb-12">
          {["work", "education"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab as "work" | "education");
                setExpandedId(null);
              }}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab
                  ? "bg-primary-500 text-white"
                  : "bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600"
              }`}
            >
              {tab === "work" ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              )}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line transform md:-translate-x-1/2" />

          <div className="space-y-8">
            {filteredExperiences.map((exp, index) => (
              <div
                key={exp.id}
                data-id={exp.id}
                className={`timeline-item relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-dark-900 transform -translate-x-1/2 z-10 shadow-lg shadow-primary-500/50" />

                <div
                  className={`ml-12 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div
                    className="glass rounded-2xl p-6 cursor-pointer card-hover"
                    onClick={() => toggleExpand(exp.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {exp.role}
                        </h3>
                        <p className="text-primary-400 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 font-mono whitespace-nowrap ml-4">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm mb-4">{exp.location}</p>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedId === exp.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="space-y-2 mb-4">
                        {exp.description.map((item, i) => (
                          <li
                            key={i}
                            className="text-gray-400 text-sm flex items-start gap-2"
                          >
                            <span className="text-primary-400 mt-1">▹</span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-mono text-accent-cyan bg-accent-cyan/10 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center mt-4">
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                          expandedId === exp.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
