import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: "Frontend",
    items: ["React", "Angular", "TypeScript", "Javascript", "Next.js", "Tailwind CSS", "GSAP"],
    color: "from-accent-cyan to-blue-500",
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "Figma", "VS Code", "Vercel", "Cursor", "Qoder"],
    color: "from-accent-purple to-violet-500",
  },
];

const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "∞", label: "Cups of Coffee" },
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
        textRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        skillsRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      const statCards = statsRef.current?.children;
      if (statCards) {
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <p className="text-primary-400 font-mono text-sm mb-2"># About Me</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Crafting Digital <span className="gradient-text">Experiences</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div ref={textRef} className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              Hello! I&apos;m a passionate frontend developer based in Malaysia,
              dedicated to creating beautiful and functional web applications
              that leave lasting impressions.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My journey in web development started with a curiosity about how
              things work on the internet. That curiosity quickly turned into a
              passion for crafting user interfaces that not only look stunning
              but also provide seamless user experiences.
            </p>
            <p className="text-gray-400 leading-relaxed">
              When I&apos;m not coding, you&apos;ll find me exploring new design trends,
              contributing to open-source projects, or enjoying a good cup of
              coffee while brainstorming my next project.
            </p>

            <div className="pt-4">
              <h4 className="text-white font-semibold mb-3">Fun Facts:</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-primary-400">▹</span> I can debug CSS
                  faster than I can decide what to eat
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary-400">▹</span> My code is
                  cleaner than my room (most of the time)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary-400">▹</span> I believe
                  semicolons are optional but style is mandatory
                </li>
              </ul>
            </div>
          </div>

          <div ref={skillsRef} className="space-y-6">
            {skills.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="glass rounded-2xl p-6 card-hover"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${skillGroup.color}`}
                  />
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag px-3 py-1.5 rounded-lg text-sm text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-6 text-center card-hover"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
