import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

const frameModules = (
  import.meta as ImportMeta & {
    glob: (pattern: string, options: { eager: boolean; import: 'default' }) => Record<string, string>;
  }
).glob('/assets/Cover 2/frame_*.png', {
  eager: true,
  import: 'default'
});

const frameUrls = Object.entries(frameModules)
  .sort(([fileA], [fileB]) => {
    const indexA = Number.parseInt(fileA.match(/frame_(\d+)\.png$/)?.[1] ?? '0', 10);
    const indexB = Number.parseInt(fileB.match(/frame_(\d+)\.png$/)?.[1] ?? '0', 10);
    return indexA - indexB;
  })
  .map(([, frameUrl]) => frameUrl as string);

const frameCount = Math.max(frameUrls.length, 1);

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onHeroComplete: (completed: boolean) => void;
}

export default function Hero({ onNavigate, onHeroComplete }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameImagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const scrollProgressRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const heroCompleteRef = useRef(false);
  const isReadyRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [heroComplete, setHeroComplete] = useState(false);

  const heroHeadline = useMemo(() => ['RESTORE', 'THE SHINE'], []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const heroSection = sectionRef.current;
    if (!heroSection) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 2,
      lerp: 0.08
    });
    lenisRef.current = lenis;

    const trigger = ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: () => `+=${Math.max(1200, heroSection.clientHeight - window.innerHeight)}`,
      pin: true,
      pinSpacing: false,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      onUpdate: (self) => {
        const progress = clamp(self.progress, 0, 1);
        scrollProgressRef.current = progress;
        targetFrameRef.current = progress * (frameCount - 1);

        if (progress >= 0.999 && !heroCompleteRef.current) {
          heroCompleteRef.current = true;
          setHeroComplete(true);
          onHeroComplete(true);
        }
      }
    });

    lenis.on('scroll', () => ScrollTrigger.update());

    const resizeHandler = () => {
      ScrollTrigger.refresh(true);
    };
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      lenis.destroy();
      lenisRef.current = null;
      trigger.kill();
    };
  }, [onHeroComplete]);

  useEffect(() => {
    let isMounted = true;

    const preloadFrame = (url: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.decoding = 'async';
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`Failed to preload frame: ${url}`));
        image.src = url;
      });

    const preloadFrames = async () => {
      const loadedResults = await Promise.allSettled(frameUrls.map((url) => preloadFrame(url)));

      if (!isMounted) return;

      const loadedFrames = loadedResults
        .filter((result): result is PromiseFulfilledResult<HTMLImageElement> => result.status === 'fulfilled')
        .map((result) => result.value);

      frameImagesRef.current = loadedFrames;
      isReadyRef.current = loadedFrames.length > 0;
      setIsReady(true);
      drawFrame();
    };

    preloadFrames().catch(() => {
      if (isMounted) {
        isReadyRef.current = frameImagesRef.current.length > 0;
        setIsReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const drawFrameImage = (
    image: HTMLImageElement,
    alpha: number,
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    if (!image.complete) return;

    context.save();
    context.globalAlpha = alpha;
    context.filter = 'none';

    const imageAspect = image.naturalWidth / image.naturalHeight;
    const containerAspect = width / height;

    let drawWidth = width;
    let drawHeight = height;

    if (imageAspect > containerAspect) {
      drawHeight = height * 1.04;
      drawWidth = drawHeight * imageAspect;
    } else {
      drawWidth = width * 1.04;
      drawHeight = drawWidth / imageAspect;
    }

    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    context.restore();
  };

  const drawFrame = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context || frameImagesRef.current.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const cappedDpr = Math.min(window.devicePixelRatio || 1, isTouchDevice ? 1.25 : 2);
    const qualityScale = isTouchDevice ? 0.6 : 0.88;

    const renderWidth = Math.max(1, Math.round(rect.width * cappedDpr * qualityScale));
    const renderHeight = Math.max(1, Math.round(rect.height * cappedDpr * qualityScale));

    if (canvas.width !== renderWidth || canvas.height !== renderHeight) {
      canvas.width = renderWidth;
      canvas.height = renderHeight;
    }

    context.resetTransform();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.setTransform(cappedDpr * qualityScale, 0, 0, cappedDpr * qualityScale, 0, 0);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    const framePosition = clamp(currentFrameRef.current, 0, frameCount - 1);
    const lowerFrame = Math.floor(framePosition);
    const upperFrame = Math.min(lowerFrame + 1, frameCount - 1);
    const blend = framePosition - lowerFrame;

    const lowerImage = frameImagesRef.current[lowerFrame];
    const upperImage = frameImagesRef.current[upperFrame];

    const drawWidth = rect.width;
    const drawHeight = rect.height;

    if (lowerImage) {
      drawFrameImage(lowerImage, 1 - blend, context, drawWidth, drawHeight);
    }

    if (upperImage && upperFrame !== lowerFrame) {
      drawFrameImage(upperImage, blend, context, drawWidth, drawHeight);
    }
  };

  useEffect(() => {
    const renderLoop = (time: number) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }

      if (isReadyRef.current) {
        currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * 0.1;
        currentFrameRef.current = clamp(currentFrameRef.current, 0, frameCount - 1);
        drawFrame();
      }

      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const heroSection = sectionRef.current;
    if (!heroSection) return;

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh(true);
      drawFrame();
    });

    resizeObserver.observe(heroSection);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-[250vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          style={{ background: 'transparent', transform: 'translateZ(0)', willChange: 'transform' }}
        />

        <div className="absolute inset-0 z-20 flex items-center justify-start px-4 sm:px-6 lg:px-10">
          <motion.div
            animate={{
              opacity: heroComplete ? 1 : 0,
              y: heroComplete ? 0 : 36,
              filter: heroComplete ? 'blur(0px)' : 'blur(8px)'
            }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl pt-10 sm:pt-12 md:pt-14"
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: heroComplete ? 1 : 0, y: heroComplete ? 0 : 18 }}
              transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-gray-200 backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#D8FF00]" />
              ELITE AUTOMOTIVE HYGIENE
            </motion.div>

            <div className="space-y-4">
              <div className="flex flex-col text-left uppercase tracking-[0.16em] text-white">
                {heroHeadline.map((line, lineIndex) => (
                  <div key={line} className="overflow-hidden leading-none">
                    <div className="flex items-center gap-0">
                      {line.split('').map((letter, letterIndex) => (
                        <motion.span
                          key={`${line}-${letter}-${letterIndex}`}
                          initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
                          animate={{
                            opacity: heroComplete ? 1 : 0,
                            y: heroComplete ? 0 : 32,
                            filter: heroComplete ? 'blur(0px)' : 'blur(6px)'
                          }}
                          transition={{
                            duration: 0.85,
                            delay: 0.45 + lineIndex * 0.2 + letterIndex * 0.04,
                            ease: [0.16, 1, 0.3, 1]
                          }}
                          className={`inline-block text-[4.2rem] font-black leading-[0.78] tracking-[-0.04em] sm:text-[5.8rem] md:text-[7rem] lg:text-[8rem] ${lineIndex === 1 ? 'text-[#D8FF00]' : ''}`}
                          style={{ textShadow: lineIndex === 1 ? '0 0 26px rgba(216,255,0,0.38)' : undefined }}
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: heroComplete ? 1 : 0, y: heroComplete ? 0 : 20 }}
              transition={{ delay: 0.68, duration: 0.8, ease: 'easeOut' }}
              className="mt-6 max-w-2xl text-left text-sm font-medium text-gray-200 sm:text-base md:text-lg"
            >
              Premium Car Wash & Luxury Detailing Experience
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: heroComplete ? 1 : 0, y: heroComplete ? 0 : 20 }}
              transition={{ delay: 0.85, duration: 0.8, ease: 'easeOut' }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <button
                onClick={() => onNavigate('contact')}
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-[#D8FF00] px-6 py-3 text-xs font-bold uppercase tracking-[0.24em] text-[#050505] transition-all duration-300 hover:bg-white hover:text-black"
              >
                Book Appointment
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-[0.24em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black"
              >
                Explore Services
                <Play className="h-4 w-4 fill-current" />
              </button>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
