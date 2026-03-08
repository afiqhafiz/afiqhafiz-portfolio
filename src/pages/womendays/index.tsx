import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "./womendays.css";

interface Heart {
    id: number;
    x: number;
    y: number;
    scale: number;
    opacity: number;
}

interface Message {
    text: string;
    delay: number;
}

const WOMENS_DAY_MESSAGES: Message[] = [
    { text: "Happy Women's Day", delay: 0 },
    { text: "To Abdah Aliah", delay: 2 },
    { text: "You Make My World Beautiful", delay: 4 },
    { text: "More Than Just a Friend 💕", delay: 6 },
];

const WomenDaysPage: React.FC = () => {
    const [hearts, setHearts] = useState<Heart[]>([]);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [showGift, setShowGift] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const giftBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.fromTo(
                ".womens-title",
                { opacity: 0, y: -50, rotation: -10 },
                {
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    duration: 1.5,
                    ease: "back.out(1.7)"
                }
            );

            // Subtitle animation
            gsap.fromTo(
                ".womens-subtitle",
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    delay: 0.5,
                    ease: "power3.out"
                }
            );

            // Gift box animation
            gsap.fromTo(
                ".gift-box-container",
                { opacity: 0, scale: 0, rotation: -180 },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 1.2,
                    delay: 1,
                    ease: "elastic.out(1, 0.5)"
                }
            );

            // Floating hearts animation loop
            const createHeart = () => {
                const newHeart: Heart = {
                    id: Date.now(),
                    x: Math.random() * 100,
                    y: 100,
                    scale: 0.5 + Math.random() * 0.5,
                    opacity: 0.6 + Math.random() * 0.4,
                };

                setHearts((prev) => [...prev.slice(-20), newHeart]);

                gsap.fromTo(
                    `.floating-heart-${newHeart.id}`,
                    {
                        y: 100,
                        opacity: 1,
                        scale: newHeart.scale,
                        rotation: 0
                    },
                    {
                        y: -100,
                        opacity: 0,
                        scale: newHeart.scale * 1.5,
                        rotation: 360,
                        duration: 3 + Math.random() * 2,
                        ease: "power1.out",
                        onComplete: () => {
                            setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
                        }
                    }
                );
            };

            const heartInterval = setInterval(createHeart, 300);

            // Message rotation
            const messageInterval = setInterval(() => {
                setCurrentMessageIndex((prev) => (prev + 1) % WOMENS_DAY_MESSAGES.length);
            }, 3000);

            return () => {
                ctx.revert();
                clearInterval(heartInterval);
                clearInterval(messageInterval);
            };
        }, containerRef);
    }, []);

    const openGift = () => {
        if (!showGift && giftBoxRef.current) {
            setShowGift(true);

            const tl = gsap.timeline();

            // Shake the gift box
            tl.to(".gift-box", {
                rotation: -10,
                duration: 0.1,
                repeat: 5,
                yoyo: true,
            })
                // Open the lid
                .to(".gift-lid", {
                    y: -80,
                    rotation: 20,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out",
                })
                // Hearts burst out
                .to(".gift-hearts", {
                    scale: 1.5,
                    opacity: 1,
                    duration: 0.3,
                })
                // Show special message
                .to(".gift-message", {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                });
        }
    };

    return (
        <div ref={containerRef} className="womens-container">
            {/* Floating hearts background */}
            <div className="hearts-background">
                {hearts.map((heart) => (
                    <div
                        key={heart.id}
                        className={`floating-heart floating-heart-${heart.id}`}
                        style={{
                            left: `${heart.x}%`,
                            bottom: `${heart.y}%`,
                            opacity: heart.opacity,
                        }}
                    >
                        ❤️
                    </div>
                ))}
            </div>

            {/* Sparkles overlay */}
            <div className="sparkles-overlay">
                <span className="sparkle-item s1">✨</span>
                <span className="sparkle-item s2">✨</span>
                <span className="sparkle-item s3">✨</span>
                <span className="sparkle-item s4">✨</span>
                <span className="sparkle-item s5">✨</span>
            </div>

            <div className="womens-content">
                <h1 className="womens-title">✨ Happy Women's Day ✨</h1>
                <p className="womens-subtitle">
                    {WOMENS_DAY_MESSAGES[currentMessageIndex].text}
                </p>

                <div className="love-letter">
                    <div className="letter-envelope">
                        <div className="letter-content">
                            <div className="letter-header">
                                <span className="heart-decoration">💝</span>
                                <h2>To Abdah Aliah</h2>
                            </div>

                            <div className="letter-body">
                                <p>On this special day, I just want to wish you all the success and happiness in everything you do.</p>
                                <p>May your career continue to grow, your hard work be rewarded, and every step you take bring you closer to the dreams you’re chasing.</p>
                                <p>I hope you always find joy in the things you love and never stop doing what makes you happy. The world definitely needs more of the energy and passion you bring.</p>
                                <p className="love-signature">Always here for you,<br /><span className="signature-name">Afiq Hafiz</span></p>
                            </div>
                            <div className="letter-footer">
                                <div className="floating-hearts-decoration">
                                    <span>💖</span>
                                    <span>💗</span>
                                    <span>💕</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="gift-section">
                    <div
                        ref={giftBoxRef}
                        className="gift-box-container"
                        onClick={openGift}
                    >
                        <div className="gift-box">
                            <div className="gift-lid">
                                <div className="gift-bow">
                                    <div className="bow-left"></div>
                                    <div className="bow-right"></div>
                                    <div className="bow-center"></div>
                                </div>
                            </div>
                            <div className="gift-body">
                                <div className="gift-ribbon"></div>
                                <div className="gift-hearts">
                                    <span className="gh-1">💝</span>
                                    <span className="gh-2">💖</span>
                                    <span className="gh-3">💗</span>
                                    <span className="gh-4">💕</span>
                                    <span className="gh-5">💘</span>
                                </div>
                            </div>
                        </div>
                        <div className="gift-message">
                            <h3>You Mean Everything to Me!</h3>
                            <p>Thank you for being you 🌹</p>
                        </div>
                    </div>
                </div>

                <div className="photo-frame-section">
                    <div className="photo-frame">
                        <div className="frame-border">
                            <div className="frame-corner tl"></div>
                            <div className="frame-corner tr"></div>
                            <div className="frame-corner bl"></div>
                            <div className="frame-corner br"></div>
                            <div className="frame-content">
                                <img
                                    src="/assets/pic.JPG"
                                    alt="Our Beautiful Moment"
                                    className="memory-photo"
                                />
                            </div>
                        </div>
                        <div className="frame-caption">
                            We should have photoboth pic together!!!
                        </div>
                    </div>
                </div>

                <div className="wishes-container">
                    <div className="wish-card">
                        <div className="wish-icon">🌟</div>
                        <h3>May Your Day</h3>
                        <p>Be filled with joy, laughter, and all the things that make you smile</p>
                    </div>

                    <div className="wish-card">
                        <div className="wish-icon">🌸</div>
                        <h3>May You Always</h3>
                        <p>Bloom beautifully and spread your wonderful energy everywhere</p>
                    </div>

                    <div className="wish-card">
                        <div className="wish-icon">💫</div>
                        <h3>May Our Friendship</h3>
                        <p>Continue to grow stronger and maybe become something more</p>
                    </div>
                </div>

                <a href="/" className="back-link">
                    ← Back to Portfolio
                </a>
            </div>
        </div>
    );
};

export default WomenDaysPage;
