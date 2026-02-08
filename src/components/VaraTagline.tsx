// components/landing/VaraTagline.tsx
import { useEffect } from "react";
import Vara from "vara";

export function VaraTagline() {
  const id = "vara-tagline";

  useEffect(() => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = "";

    const vara = new Vara(
      `#${id}`,
      "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Parisienne/Parisienne.json",
      [
        {
          text: "Love, reserved for two.",
          fontSize: 42,          // ↓ slightly smaller
          strokeWidth: 2.5,
          color: "#FFFFFF",
          textAlign: "center",
          duration: 3500,
          letterSpacing: -1,
          id: "tagline",
        },
      ],
      {
        queued: true,
      }
    );

    vara.ready(() => {
      vara.draw("tagline");

      setTimeout(() => {
        const svg = document.querySelector(
          `#${id} svg`
        ) as SVGSVGElement | null;
        if (!svg) return;

        // Scale everything down a bit vertically so ascenders fit
        const rootGroup = svg.querySelector("g");
        if (rootGroup) {
          const existing = rootGroup.getAttribute("transform") ?? "";
          // scale X = 1 (same width), scale Y = 0.9 (10% shorter)
          rootGroup.setAttribute(
            "transform",
            `${existing} scale(1,1.1)`
          );
        }
      }, 120);

      vara.animationEnd((animationId, obj) => {
        if (animationId !== "tagline") return;

        const { characters } = obj;
        if (!characters || !characters.length) return;

        // "Love, reserved for two." => reserved = indices 6..13
        const start = 6;
        const end = 13;

        for (let i = start; i <= end && i < characters.length; i++) {
          const g = characters[i] as SVGGElement;
          const paths = g.querySelectorAll("path");
          const delay = (i - start) * 100;

          setTimeout(() => {
            paths.forEach((path) => {
              path.style.transition = "stroke 0.6s ease-out";
              path.setAttribute("stroke", "#B80B0B");
            });
          }, delay);
        }
        const start1 = 22;
        const end1 = 22;

        for (let i = start1; i <= end1 && i < characters.length; i++) {
          const g = characters[i] as SVGGElement;
          const paths = g.querySelectorAll("path");
          const delay = (i - end) * 100;

          setTimeout(() => {
            paths.forEach((path) => {
              path.style.transition = "stroke 0.6s ease-out";
              path.setAttribute("stroke", "#B80B0B");
            });
          }, delay);
        }
      });
    });

    return () => {
      const cleanupEl = document.getElementById(id);
      if (cleanupEl) cleanupEl.innerHTML = "";
    };
  }, []);

  return (
    <div className="mt-1 flex justify-center">
      <div
        id={id}
        style={{
          width: "100%",
          maxWidth: "640px",
          minHeight: "90px",
          overflow: "visible",
          position: "relative",
          paddingTop: "10px",
          paddingBottom: "0px",
        }}
      />
    </div>
  );
}
