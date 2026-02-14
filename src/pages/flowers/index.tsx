import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "./flowers.css";

interface Flower {
  id: number;
  growth: number;
  isWatering: boolean;
  color: string;
}

const FLOWER_COLORS = ["#ff6b9d", "#c44569", "#f8b500", "#9b59b6", "#3498db"];

const FlowersPage: React.FC = () => {
  const [flowers, setFlowers] = useState<Flower[]>([
    { id: 1, growth: 0, isWatering: false, color: FLOWER_COLORS[0] },
  ]);
  const [waterCount, setWaterCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".flowers-title",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".flower-pot",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.3, ease: "back.out(1.7)" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const waterFlower = (id: number) => {
    setFlowers((prev) =>
      prev.map((flower) => {
        if (flower.id === id && flower.growth < 100) {
          const newGrowth = Math.min(flower.growth + 20, 100);
          const flowerCount = Math.floor(newGrowth / 20); // 1-5 flowers based on growth

          // Animate new flower appearing
          if (flowerCount > Math.floor(flower.growth / 20)) {
            gsap.fromTo(
              `.flower-${id} .pixel-flower-${flowerCount}`,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
          }

          // Water drop animation
          gsap.fromTo(
            `.water-drop-${id}`,
            { y: -50, opacity: 1, scale: 1 },
            {
              y: 50,
              opacity: 0,
              scale: 0.5,
              duration: 0.6,
              ease: "power2.in",
            }
          );

          return { ...flower, growth: newGrowth, isWatering: true };
        }
        return flower;
      })
    );

    setWaterCount((prev) => prev + 1);

    // Reset watering state
    setTimeout(() => {
      setFlowers((prev) =>
        prev.map((flower) =>
          flower.id === id ? { ...flower, isWatering: false } : flower
        )
      );
    }, 600);
  };

  const addNewFlower = () => {
    const newId = flowers.length + 1;
    const newColor = FLOWER_COLORS[flowers.length % FLOWER_COLORS.length];
    setFlowers([
      ...flowers,
      { id: newId, growth: 0, isWatering: false, color: newColor },
    ]);

    // Animate new flower entrance
    setTimeout(() => {
      gsap.fromTo(
        `.flower-${newId}`,
        { opacity: 0, scale: 0.5, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
      );
    }, 50);
  };

  const resetGarden = () => {
    setFlowers([{ id: 1, growth: 0, isWatering: false, color: FLOWER_COLORS[0] }]);
    setWaterCount(0);
    
    gsap.set(".stem", { height: "60px" });
    gsap.set(".flower-head", { scale: 0.5 });
  };

  return (
    <div ref={containerRef} className="flowers-container">
      <div className="flowers-content">
        <h1 className="flowers-title">🌸 Secret Garden 🌸</h1>
        <p className="flowers-subtitle">
          Water the flowers to help them grow! {waterCount > 0 && `(Watered ${waterCount} times)`}
        </p>

        <div className="garden">
          {flowers.map((flower) => (
            <div key={flower.id} className={`flower-wrapper flower-${flower.id}`}>
              {/* Water drop */}
              <div className={`water-drop water-drop-${flower.id}`}>
                <svg viewBox="0 0 24 24" fill="#3498db" width="24" height="24">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>

              {/* Flower Bush */}
              <div className="flower-plant">
                <div className="flower-bush">
                  {/* Flower 1 - always visible */}
                  <div className="pixel-flower-small pixel-flower-1">
                    <div className="pixel-grid-small">
                      <div className="pixel-s petal-s-1" style={{ backgroundColor: flower.color }} />
                      <div className="pixel-s petal-s-2" style={{ backgroundColor: flower.color }} />
                      <div className="pixel-s petal-s-3" style={{ backgroundColor: flower.color }} />
                      <div className="pixel-s petal-s-4" style={{ backgroundColor: flower.color }} />
                      <div className="pixel-s petal-s-5" style={{ backgroundColor: flower.color }} />
                      <div className="pixel-s petal-s-6" style={{ backgroundColor: flower.color }} />
                      <div className="pixel-s petal-s-7" style={{ backgroundColor: flower.color }} />
                      <div className="pixel-s petal-s-8" style={{ backgroundColor: flower.color }} />
                      <div className="pixel-s center-s" />
                    </div>
                  </div>

                  {/* Flower 2 - at 20% */}
                  <div 
                    className="pixel-flower-small pixel-flower-2" 
                    style={{ opacity: flower.growth >= 20 ? 1 : 0, transform: flower.growth >= 20 ? 'scale(1)' : 'scale(0)' }}
                  >
                    <div className="pixel-grid-small">
                      <div className="pixel-s petal-s-1" style={{ backgroundColor: FLOWER_COLORS[(flower.id) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-2" style={{ backgroundColor: FLOWER_COLORS[(flower.id) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-3" style={{ backgroundColor: FLOWER_COLORS[(flower.id) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-4" style={{ backgroundColor: FLOWER_COLORS[(flower.id) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-5" style={{ backgroundColor: FLOWER_COLORS[(flower.id) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-6" style={{ backgroundColor: FLOWER_COLORS[(flower.id) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-7" style={{ backgroundColor: FLOWER_COLORS[(flower.id) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-8" style={{ backgroundColor: FLOWER_COLORS[(flower.id) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s center-s" />
                    </div>
                  </div>

                  {/* Flower 3 - at 40% */}
                  <div 
                    className="pixel-flower-small pixel-flower-3" 
                    style={{ opacity: flower.growth >= 40 ? 1 : 0, transform: flower.growth >= 40 ? 'scale(1)' : 'scale(0)' }}
                  >
                    <div className="pixel-grid-small">
                      <div className="pixel-s petal-s-1" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 1) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-2" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 1) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-3" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 1) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-4" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 1) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-5" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 1) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-6" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 1) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-7" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 1) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-8" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 1) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s center-s" />
                    </div>
                  </div>

                  {/* Flower 4 - at 60% */}
                  <div 
                    className="pixel-flower-small pixel-flower-4" 
                    style={{ opacity: flower.growth >= 60 ? 1 : 0, transform: flower.growth >= 60 ? 'scale(1)' : 'scale(0)' }}
                  >
                    <div className="pixel-grid-small">
                      <div className="pixel-s petal-s-1" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 2) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-2" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 2) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-3" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 2) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-4" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 2) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-5" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 2) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-6" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 2) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-7" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 2) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-8" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 2) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s center-s" />
                    </div>
                  </div>

                  {/* Flower 5 - at 80% */}
                  <div 
                    className="pixel-flower-small pixel-flower-5" 
                    style={{ opacity: flower.growth >= 80 ? 1 : 0, transform: flower.growth >= 80 ? 'scale(1)' : 'scale(0)' }}
                  >
                    <div className="pixel-grid-small">
                      <div className="pixel-s petal-s-1" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 3) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-2" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 3) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-3" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 3) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-4" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 3) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-5" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 3) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-6" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 3) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-7" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 3) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s petal-s-8" style={{ backgroundColor: FLOWER_COLORS[(flower.id + 3) % FLOWER_COLORS.length] }} />
                      <div className="pixel-s center-s" />
                    </div>
                  </div>
                </div>

                {/* Bush stem */}
                <div className="bush-stem">
                  <div className="bush-leaves">
                    <div className="bush-leaf bl-1" />
                    <div className="bush-leaf bl-2" />
                    <div className="bush-leaf bl-3" />
                    <div className="bush-leaf bl-4" />
                  </div>
                </div>
              </div>

              {/* Pot */}
              <div className="pot" onClick={() => waterFlower(flower.id)}>
                <div className="pot-rim" />
                <div className="pot-body">
                  <span className="pot-label">
                    {flower.growth >= 100 ? "🌺 Full Bloom!" : "💧 Click to Water"}
                  </span>
                </div>
              </div>

              {/* Growth indicator */}
              <div className="growth-bar">
                <div
                  className="growth-fill"
                  style={{ width: `${flower.growth}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="garden-controls">
          <button className="garden-btn add-btn" onClick={addNewFlower}>
            🌱 Add Flower
          </button>
          <button className="garden-btn reset-btn" onClick={resetGarden}>
            🔄 Reset Garden
          </button>
        </div>

        <a href="/" className="back-link">
          ← Back to Portfolio
        </a>
      </div>
    </div>
  );
};

export default FlowersPage;
