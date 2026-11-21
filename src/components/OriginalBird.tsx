// Adapted from the user-provided Wabiy AnimatedBird.tsx. Default mascot behaviour.
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
type Heart = {
    id: number;
    x: number;
    y: number;
    scale: number;
    driftOne: number;
    driftTwo: number;
    startRotate: number;
    endRotate: number;
};
type Sparkle = {
    id: number;
    x: number;
    y: number;
};
type AnimatedBirdProps = {
    className?: string;
    label: string;
    style?: React.CSSProperties;
    disableSleep?: boolean;
};
export default function OriginalBird({ className = "wabiy-bird-art", label, style, disableSleep = false, }: AnimatedBirdProps) {
    const uid = useId().replace(/:/g, "");
    const containerRef = useRef<HTMLButtonElement>(null);
    const hopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const wingFlapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const curiousTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const wakeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const wakeAnimationRef = useRef(false);
    const [isBlinking, setIsBlinking] = useState(false);
    const [isHopping, setIsHopping] = useState(false);
    const [isTilting, setIsTilting] = useState(false);
    const [isCurious, setIsCurious] = useState(false);
    const [isWingFlapping, setIsWingFlapping] = useState(false);
    const [isSleepy, setIsSleepy] = useState(false);
    const [isDeepSleep, setIsDeepSleep] = useState(false);
    const [isWakingUp, setIsWakingUp] = useState(false);
    const eyeX = useMotionValue(0);
    const eyeY = useMotionValue(0);
    const smoothEyeX = useSpring(eyeX, { stiffness: 300, damping: 30 });
    const smoothEyeY = useSpring(eyeY, { stiffness: 300, damping: 30 });
    const [clickHearts, setClickHearts] = useState<Heart[]>([]);
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);
    const triggerHop = () => {
        if (hopTimeoutRef.current)
            clearTimeout(hopTimeoutRef.current);
        setIsHopping(true);
        hopTimeoutRef.current = setTimeout(() => {
            setIsHopping(false);
            hopTimeoutRef.current = null;
        }, 600);
    };
    const triggerWingFlap = () => {
        if (wingFlapTimeoutRef.current)
            clearTimeout(wingFlapTimeoutRef.current);
        setIsWingFlapping(true);
        wingFlapTimeoutRef.current = setTimeout(() => {
            setIsWingFlapping(false);
            wingFlapTimeoutRef.current = null;
        }, 850);
    };
    const wakeUp = () => {
        if ((!isSleepy && !isDeepSleep) || wakeAnimationRef.current)
            return;
        wakeAnimationRef.current = true;
        setIsSleepy(false);
        setIsDeepSleep(false);
        setIsBlinking(false);
        setIsTilting(false);
        setIsCurious(false);
        setIsWakingUp(true);
        if (wakeTimeoutRef.current)
            clearTimeout(wakeTimeoutRef.current);
        wakeTimeoutRef.current = setTimeout(() => {
            setIsWakingUp(false);
            wakeAnimationRef.current = false;
            wakeTimeoutRef.current = null;
        }, 1150);
    };
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            if (isSleepy || isWakingUp || document.hidden)
                return;
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 120);
        }, Math.random() * 1500 + 2500);
        return () => clearInterval(blinkInterval);
    }, [isSleepy, isWakingUp]);
    useEffect(() => {
        const hopInterval = setInterval(() => {
            if (document.hidden || isSleepy || isWakingUp)
                return;
            triggerHop();
        }, Math.random() * 3000 + 5000);
        return () => clearInterval(hopInterval);
    }, [isSleepy, isWakingUp]);
    useEffect(() => {
        const tiltInterval = setInterval(() => {
            if (document.hidden || isSleepy || isWakingUp)
                return;
            setIsTilting(true);
            setTimeout(() => setIsTilting(false), 800);
        }, Math.random() * 4000 + 6000);
        return () => clearInterval(tiltInterval);
    }, [isSleepy, isWakingUp]);
    useEffect(() => {
        const curiousInterval = setInterval(() => {
            if (document.hidden || isSleepy || isWakingUp)
                return;
            setIsCurious(true);
            setTimeout(() => setIsCurious(false), 1500);
        }, Math.random() * 5000 + 8000);
        return () => clearInterval(curiousInterval);
    }, [isSleepy, isWakingUp]);
    useEffect(() => {
        if (disableSleep)
            return;
        let sleepyTimeout: ReturnType<typeof setTimeout>;
        let deepSleepTimeout: ReturnType<typeof setTimeout>;
        const resetSleepTimers = () => {
            wakeUp();
            clearTimeout(sleepyTimeout);
            clearTimeout(deepSleepTimeout);
            sleepyTimeout = setTimeout(() => {
                if (!document.hidden && !wakeAnimationRef.current)
                    setIsSleepy(true);
            }, 15000);
            deepSleepTimeout = setTimeout(() => {
                if (!document.hidden && !wakeAnimationRef.current) {
                    setIsSleepy(true);
                    setIsDeepSleep(true);
                }
            }, 30000);
        };
        const startSleepTimers = () => {
            clearTimeout(sleepyTimeout);
            clearTimeout(deepSleepTimeout);
            sleepyTimeout = setTimeout(() => {
                if (!document.hidden && !wakeAnimationRef.current)
                    setIsSleepy(true);
            }, 15000);
            deepSleepTimeout = setTimeout(() => {
                if (!document.hidden && !wakeAnimationRef.current) {
                    setIsSleepy(true);
                    setIsDeepSleep(true);
                }
            }, 30000);
        };
        startSleepTimers();
        window.addEventListener("mousemove", resetSleepTimers);
        window.addEventListener("click", resetSleepTimers);
        window.addEventListener("keydown", resetSleepTimers);
        window.addEventListener("scroll", resetSleepTimers);
        return () => {
            clearTimeout(sleepyTimeout);
            clearTimeout(deepSleepTimeout);
            window.removeEventListener("mousemove", resetSleepTimers);
            window.removeEventListener("click", resetSleepTimers);
            window.removeEventListener("keydown", resetSleepTimers);
            window.removeEventListener("scroll", resetSleepTimers);
        };
    }, [isSleepy, isDeepSleep, disableSleep]);
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (isSleepy || isWakingUp)
                return;
            const element = containerRef.current;
            if (!element)
                return;
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2.6;
            const dx = event.clientX - centerX;
            const dy = event.clientY - centerY;
            const angle = Math.atan2(dy, dx);
            const maxRadius = 2.6;
            const distance = Math.min(Math.hypot(dx, dy) / 40, maxRadius);
            eyeX.set(Math.cos(angle) * distance);
            eyeY.set(Math.sin(angle) * distance);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isSleepy, isWakingUp, eyeX, eyeY]);
    useEffect(() => {
        return () => {
            if (hopTimeoutRef.current)
                clearTimeout(hopTimeoutRef.current);
            if (wingFlapTimeoutRef.current)
                clearTimeout(wingFlapTimeoutRef.current);
            if (curiousTimeoutRef.current)
                clearTimeout(curiousTimeoutRef.current);
            if (wakeTimeoutRef.current)
                clearTimeout(wakeTimeoutRef.current);
        };
    }, []);
    const handleMouseMoveOnBird = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isSleepy || isWakingUp || Math.random() > 0.7)
            return;
        const rect = event.currentTarget.getBoundingClientRect();
        const sparkle: Sparkle = {
            id: Date.now() + Math.random(),
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
        setSparkles((previous) => [...previous.slice(-8), sparkle]);
        setTimeout(() => {
            setSparkles((previous) => previous.filter((item) => item.id !== sparkle.id));
        }, 700);
    };
    const handleInteraction = () => {
        const wasSleeping = isSleepy || isDeepSleep;
        if (wasSleeping) {
            wakeUp();
            return;
        }
        if (isWakingUp)
            return;
        triggerHop();
        triggerWingFlap();
        if (curiousTimeoutRef.current)
            clearTimeout(curiousTimeoutRef.current);
        setIsCurious(true);
        curiousTimeoutRef.current = setTimeout(() => {
            setIsCurious(false);
            curiousTimeoutRef.current = null;
        }, 1500);
        const heart: Heart = {
            id: Date.now() + Math.random(),
            x: (Math.random() - 0.5) * 60 + 100,
            y: 50 + (Math.random() - 0.5) * 20,
            scale: 0.5 + Math.random() * 0.8,
            driftOne: Math.random() * 20 - 10,
            driftTwo: Math.random() * 30 - 15,
            startRotate: -20 + Math.random() * 40,
            endRotate: 20 - Math.random() * 40,
        };
        setClickHearts((previous) => [...previous, heart]);
        setTimeout(() => {
            setClickHearts((previous) => previous.filter((item) => item.id !== heart.id));
        }, 1800);
    };
    const isEyesClosed = isSleepy;
    return (<motion.button type="button" ref={containerRef} style={style} className={`relative ${className} cursor-pointer touch-manipulation group outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:rounded-full`} aria-label={label} onClick={handleInteraction} onMouseMove={handleMouseMoveOnBird} whileHover={!isSleepy && !isWakingUp ? { scale: 1.05 } : undefined} whileTap={!isSleepy && !isWakingUp ? { scale: 0.95 } : undefined} animate={isWakingUp ? { y: [0, 5, -12, -4, 0], rotate: [0, -8, 8, -4, 0], scale: [1, 0.96, 1.08, 1.02, 1] }
            : isHopping ? { y: [0, -25, -10, 0], rotate: [0, -5, 3, 0], scale: [1, 1.05, 1.02, 1] }
                : isTilting ? { rotate: [0, -12, 12, 0] }
                    : isSleepy ? { y: [0, -1, 0], rotate: 0 }
                        :
                            { y: [0, -2, 0] }} transition={isWakingUp ? { duration: 1.15, ease: "easeOut", times: [0, 0.16, 0.52, 0.76, 1] }
            : isHopping ? { duration: 0.6, ease: "easeOut" }
                : isTilting ? { duration: 0.8, ease: "easeInOut" }
                    :
                        { duration: isSleepy ? 3 : 2, repeat: Infinity, ease: "easeInOut" }}>
      <AnimatePresence>
        {sparkles.map((sparkle) => (<motion.div key={sparkle.id} className="pointer-events-none absolute" style={{ left: sparkle.x, top: sparkle.y }} initial={{ opacity: 0.9, scale: 0.3 }} animate={{ opacity: 0, scale: 1, y: -10 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <div className="h-1.5 w-1.5 rounded-full bg-teal-200 shadow-[0_0_6px_2px_rgba(94,234,212,0.8)]"/>
          </motion.div>))}
      </AnimatePresence>

      <svg aria-hidden="true" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full overflow-visible drop-shadow-2xl" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id={uid+"-bodyGrad"} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5EEAD4"/>
            <stop offset="40%" stopColor="#2DD4BF"/>
            <stop offset="100%" stopColor="#14B8A6"/>
          </linearGradient>

          <linearGradient id={uid+"-wingGrad"} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0D9488"/>
            <stop offset="100%" stopColor="#0F766E"/>
          </linearGradient>

          <radialGradient id={uid+"-bellyGrad"}>
            <stop offset="0%" stopColor="#CCFBF1" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#99F6E4" stopOpacity="0.3"/>
          </radialGradient>

          <radialGradient id={uid+"-highlight"}>
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0"/>
          </radialGradient>

          <linearGradient id={uid+"-heartGrad"} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F43F5E"/>
            <stop offset="100%" stopColor="#E11D48"/>
          </linearGradient>

          <linearGradient id={uid+"-pillowGrad"} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF"/>
            <stop offset="100%" stopColor="#E2E8F0"/>
          </linearGradient>

          <linearGradient id={uid+"-capGrad"} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818CF8"/>
            <stop offset="100%" stopColor="#6366F1"/>
          </linearGradient>
        </defs>

        <AnimatePresence>
          {isDeepSleep && (<motion.ellipse cx="100" cy="150" rx="70" ry="30" fill={`url(#${uid}-pillowGrad)`} stroke="#CBD5E1" strokeWidth="1.5" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.22 } }} transition={{ duration: 0.5 }} style={{ filter: "drop-shadow(0 4px 8px rgba(100,116,139,0.25))" }}/>)}
        </AnimatePresence>

        <motion.circle cx="100" cy="110" r="58" fill={`url(#${uid}-bodyGrad)`} animate={{
            scale: isWakingUp
                ? [1, 0.96, 1.08, 1]
                : isHopping
                    ? [1, 1.08, 1.05, 1]
                    : isSleepy
                        ? [1, 1.015, 1]
                        : [1, 1.02, 1],
        }} transition={{
            duration: isWakingUp ? 1.15 : isHopping ? 0.6 : isSleepy ? 3.5 : 2.5,
            repeat: isWakingUp || isHopping ? 0 : Infinity,
            ease: "easeInOut",
        }} style={{
            transformOrigin: "100px 110px",
            filter: "drop-shadow(0 6px 16px rgba(20, 184, 166, 0.35))",
        }}/>

        <ellipse cx="100" cy="125" rx="42" ry="48" fill={`url(#${uid}-bellyGrad)`}/>

        <motion.ellipse cx="85" cy="95" rx="28" ry="35" fill={`url(#${uid}-highlight)`} animate={{ opacity: [0.6, 0.8, 0.6] }} transition={{ duration: 3, repeat: Infinity }}/>

        <motion.ellipse cx="60" cy="115" rx="18" ry="45" fill={`url(#${uid}-wingGrad)`} animate={isWakingUp ? { rotate: [-25, -55, -95, -50, -25], x: [0, -7, -16, -6, 0], y: [0, -4, -9, -3, 0] }
            : isWingFlapping ? { rotate: [-25, -72, -108, -72, -25], x: [0, -10, -24, -10, 0], y: [0, -4, -12, -4, 0] }
                : isHopping ? { rotate: [-25, -48, -62, -48, -25], x: [0, -7, -11, -7, 0] }
                    :
                        { rotate: [-25, -28, -25], x: [0, -2, 0] }} transition={isWakingUp ? { duration: 1.15, ease: "easeOut", times: [0, 0.2, 0.5, 0.78, 1] }
            : isWingFlapping ? { duration: 0.85, ease: "easeInOut", times: [0, 0.22, 0.5, 0.76, 1] }
                :
                    { duration: isHopping ? 0.6 : 2, repeat: isHopping ? 0 : Infinity, ease: "easeInOut" }} style={{ transformOrigin: "60px 115px", filter: "drop-shadow(0 2px 4px rgba(15, 118, 110, 0.3))" }}/>

        <motion.ellipse cx="140" cy="115" rx="18" ry="45" fill={`url(#${uid}-wingGrad)`} animate={isWakingUp ? { rotate: [25, 55, 95, 50, 25], x: [0, 7, 16, 6, 0], y: [0, -4, -9, -3, 0] }
            : isWingFlapping ? { rotate: [25, 72, 108, 72, 25], x: [0, 10, 24, 10, 0], y: [0, -4, -12, -4, 0] }
                : isHopping ? { rotate: [25, 48, 62, 48, 25], x: [0, 7, 11, 7, 0] }
                    :
                        { rotate: [25, 28, 25], x: [0, 2, 0] }} transition={isWakingUp ? { duration: 1.15, ease: "easeOut", times: [0, 0.2, 0.5, 0.78, 1] }
            : isWingFlapping ? { duration: 0.85, ease: "easeInOut", times: [0, 0.22, 0.5, 0.76, 1] }
                :
                    { duration: isHopping ? 0.6 : 2, repeat: isHopping ? 0 : Infinity, ease: "easeInOut" }} style={{ transformOrigin: "140px 115px", filter: "drop-shadow(0 2px 4px rgba(15, 118, 110, 0.3))" }}/>

        <motion.circle cx="100" cy="65" r="35" fill={`url(#${uid}-bodyGrad)`} animate={{
            scale: isWakingUp ? [1, 0.96, 1.1, 1.02, 1] : isHopping ? [1, 1.05, 1] : [1, 1.015, 1],
        }} transition={{
            duration: isWakingUp ? 1.15 : isHopping ? 0.4 : 2.5,
            repeat: isWakingUp || isHopping ? 0 : Infinity,
        }} style={{
            transformOrigin: "100px 65px",
            filter: "drop-shadow(0 3px 8px rgba(20, 184, 166, 0.25))",
        }}/>

        <ellipse cx="90" cy="55" rx="16" ry="18" fill={`url(#${uid}-highlight)`}/>

        <motion.g animate={isWakingUp
            ? { scaleY: [1, 0.9, 1.45, 1], y: [0, 0, 3, 0] }
            : isSleepy
                ? { scaleY: 1 }
                : isHopping
                    ? { scaleY: [1, 1.4, 1], y: [0, 3, 0] }
                    : { scaleY: [1, 1.03, 1] }} transition={{
            duration: isWakingUp ? 1.15 : isHopping ? 0.3 : 1.8,
            repeat: isWakingUp || isSleepy ? 0 : Infinity,
            ease: "easeInOut",
        }} style={{ transformOrigin: "100px 80px" }}>
          <path d="M 100 75 L 100 85 L 95 80 Z M 100 75 L 100 85 L 105 80 Z" fill="#FB923C" style={{ filter: "drop-shadow(0 1px 2px rgba(251, 146, 60, 0.4))" }}/>
        </motion.g>

        <motion.g animate={isWakingUp
            ? { scaleY: [0.12, 0.12, 1.25, 1], x: [0, 0, -2, 0] }
            : !isEyesClosed && isCurious
                ? { x: [-5, 5, -5] }
                : {}} transition={{ duration: isWakingUp ? 1.15 : 1.5, ease: "easeOut" }} style={{ transformOrigin: "85px 63px" }}>
          {isEyesClosed ? (<motion.path d="M 76 63 Q 85 69 94 63" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" fill="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}/>) : (<>
              <ellipse cx="85" cy="62" rx="10" ry="12" fill="white"/>
              <motion.ellipse cx="85" cy="63" rx="7" ry="8" fill="#0D9488" animate={{
                scale: isBlinking ? 0.8 : 1,
            }} style={{
                x: smoothEyeX,
                y: smoothEyeY,
            }} transition={{ duration: 0.1 }}/>
              <motion.ellipse cx="85" cy="63" rx="4" ry="5" fill="#1A1A1A" animate={{
                scaleY: isBlinking ? 0 : 1,
                scale: isBlinking ? 0 : 1,
                scaleX: isHopping ? [1, 1.2, 1] : 1,
            }} style={{
                x: smoothEyeX,
                y: smoothEyeY,
            }} transition={{ duration: 0.12 }}/>
              <ellipse cx="87" cy="61" rx="2.5" ry="3" fill="white"/>
              <motion.ellipse cx="83" cy="64" rx="1.5" ry="2" fill="white" opacity="0.6" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}/>
            </>)}
        </motion.g>

        <motion.g animate={isWakingUp
            ? { scaleY: [0.12, 0.12, 1.25, 1], x: [0, 0, 2, 0] }
            : !isEyesClosed && isCurious
                ? { x: [-5, 5, -5] }
                : {}} transition={{ duration: isWakingUp ? 1.15 : 1.5, ease: "easeOut" }} style={{ transformOrigin: "115px 63px" }}>
          {isEyesClosed ? (<motion.path d="M 106 63 Q 115 69 124 63" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" fill="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}/>) : (<>
              <ellipse cx="115" cy="62" rx="10" ry="12" fill="white"/>
              <motion.ellipse cx="115" cy="63" rx="7" ry="8" fill="#0D9488" animate={{
                scale: isBlinking ? 0.8 : 1,
            }} style={{
                x: smoothEyeX,
                y: smoothEyeY,
            }} transition={{ duration: 0.1 }}/>
              <motion.ellipse cx="115" cy="63" rx="4" ry="5" fill="#1A1A1A" animate={{
                scaleY: isBlinking ? 0 : 1,
                scale: isBlinking ? 0 : 1,
                scaleX: isHopping ? [1, 1.2, 1] : 1,
            }} style={{
                x: smoothEyeX,
                y: smoothEyeY,
            }} transition={{ duration: 0.12 }}/>
              <ellipse cx="117" cy="61" rx="2.5" ry="3" fill="white"/>
              <motion.ellipse cx="113" cy="64" rx="1.5" ry="2" fill="white" opacity="0.6" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}/>
            </>)}
        </motion.g>

        <AnimatePresence>
          {isDeepSleep && (<motion.g initial={{ opacity: 0, y: -10, rotate: -10 }} animate={{ opacity: 1, y: 0, rotate: -18 }} exit={{ opacity: 0, y: -18, x: 18, rotate: 22, transition: { duration: 0.32, ease: "easeIn" } }} transition={{ duration: 0.5, ease: "backOut" }} style={{ transformOrigin: "95px 45px" }}>
              <path d="M 78 45 Q 95 -10 125 30 Q 100 20 78 45 Z" fill={`url(#${uid}-capGrad)`} stroke="#4F46E5" strokeWidth="1"/>
              <circle cx="123" cy="28" r="6" fill="#FBCFE8" stroke="#F472B6" strokeWidth="1"/>
              <path d="M 76 44 Q 100 34 128 32" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round" fill="none"/>
            </motion.g>)}
        </AnimatePresence>

        <AnimatePresence>
          {isSleepy && (<motion.text key="zzz" x="130" y="35" fontSize={isDeepSleep ? 18 : 14} fontWeight="bold" fill="#0D9488" initial={{ opacity: 0, y: 40 }} animate={{ opacity: [0, 1, 1, 0], y: [40, 25, 15, 5] }} exit={{ opacity: 0, y: -8, transition: { duration: 0.18, repeat: 0 } }} transition={{ duration: isDeepSleep ? 3.5 : 3, repeat: Infinity }}>
              z z Z
            </motion.text>)}
        </AnimatePresence>

        <AnimatePresence>
          {isWakingUp && (<motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.7] }} exit={{ opacity: 0 }} transition={{ duration: 1.05, ease: "easeOut" }}>
              <motion.path d="M 55 42 L 58 49 L 65 52 L 58 55 L 55 62 L 52 55 L 45 52 L 52 49 Z" fill="#FBBF24" animate={{ rotate: [0, 120, 240] }} transition={{ duration: 1.05, ease: "linear" }} style={{ transformOrigin: "55px 52px" }}/>
              <motion.path d="M 145 44 L 147.5 50 L 154 52.5 L 147.5 55 L 145 61 L 142.5 55 L 136 52.5 L 142.5 50 Z" fill="#FCD34D" animate={{ rotate: [0, -120, -240] }} transition={{ duration: 1.05, ease: "linear" }} style={{ transformOrigin: "145px 52px" }}/>
            </motion.g>)}
        </AnimatePresence>

        <g>
          <motion.line x1="88" y1="165" x2="88" y2="178" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round" animate={{
            scaleY: isHopping ? 0.4 : 1,
            y: isHopping ? [0, -5, 0] : 0,
        }} transition={{ duration: 0.3 }} style={{ transformOrigin: "88px 165px" }}/>
          <motion.line x1="112" y1="165" x2="112" y2="178" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round" animate={{
            scaleY: isHopping ? 0.4 : 1,
            y: isHopping ? [0, -5, 0] : 0,
        }} transition={{ duration: 0.3 }} style={{ transformOrigin: "112px 165px" }}/>
        </g>

        <motion.g opacity={isHopping ? 0.4 : 1} animate={{ opacity: isHopping ? 0.4 : 1 }} transition={{ duration: 0.2 }}>
          <line x1="83" y1="178" x2="80" y2="182" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="88" y1="178" x2="88" y2="183" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="93" y1="178" x2="96" y2="182" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="107" y1="178" x2="104" y2="182" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="112" y1="178" x2="112" y2="183" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="117" y1="178" x2="120" y2="182" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round"/>
        </motion.g>

        {!isDeepSleep && (<motion.path d="M 100 38 Q 98 30 100 26" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" fill="none" animate={{
                rotate: isWakingUp
                    ? [0, -24, 24, -12, 0]
                    : isHopping
                        ? [0, -30, 30, 0]
                        : [0, -5, 5, 0],
            }} transition={{
                duration: isWakingUp ? 1.1 : isHopping ? 0.4 : 2.5,
                repeat: isWakingUp || isHopping ? 0 : Infinity,
            }} style={{ transformOrigin: "100px 38px" }}/>)}

        <AnimatePresence>
          {isCurious && clickHearts.length === 0 && !isWakingUp && (<motion.g initial={{ opacity: 0, y: 0, scale: 0.5 }} animate={{
                opacity: [0, 1, 1, 0],
                y: [0, -20, -35, -50],
                x: [0, 5, -5, 10],
                scale: [0.5, 1.2, 1, 0.8],
                rotate: [0, 10, -10, 5],
            }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 1.5, ease: "easeOut" }}>
              <path d="M 140 75 C 140 70 145 65 150 65 C 153 65 155 67 155 70 C 155 67 157 65 160 65 C 165 65 170 70 170 75 C 170 82 155 90 155 90 C 155 90 140 82 140 75 Z" fill={`url(#${uid}-heartGrad)`} opacity="0.9" style={{ filter: "drop-shadow(0 2px 4px rgba(225, 29, 72, 0.4))" }}/>
            </motion.g>)}

          {clickHearts.map((heart) => (<motion.g key={heart.id} initial={{ opacity: 0, y: heart.y, x: heart.x, scale: 0 }} animate={{
                opacity: [0, 1, 1, 0],
                y: [heart.y, heart.y - 30, heart.y - 60, heart.y - 90],
                x: [heart.x, heart.x + heart.driftOne, heart.x + heart.driftTwo],
                scale: [0, heart.scale * 1.5, heart.scale * 1.2, heart.scale * 0.8],
                rotate: [heart.startRotate, heart.endRotate],
            }} exit={{ opacity: 0, scale: 0 }} transition={{ duration: 1.6, ease: "easeOut" }}>
              <path d="M 0 -15 C 0 -20 5 -25 10 -25 C 13 -25 15 -23 15 -20 C 15 -23 17 -25 20 -25 C 25 -25 30 -20 30 -15 C 30 -8 15 0 15 0 C 15 0 0 -8 0 -15 Z" fill={`url(#${uid}-heartGrad)`} style={{ filter: "drop-shadow(0 2px 5px rgba(225, 29, 72, 0.5))" }}/>
            </motion.g>))}
        </AnimatePresence>
      </svg>

      <motion.div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-teal-400/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"/>

      <motion.div className="absolute -bottom-1 left-1/2 h-3 w-20 -translate-x-1/2 rounded-full bg-teal-600/30 blur-md dark:bg-teal-400/20" animate={isWakingUp
            ? { scale: [1, 0.7, 1.15, 1], opacity: [0.3, 0.12, 0.35, 0.3] }
            : isHopping
                ? { scale: [1, 0.5, 1], opacity: [0.3, 0.1, 0.3] }
                : { scale: [1, 1.08, 1], opacity: [0.3, 0.25, 0.3] }} transition={{
            duration: isWakingUp ? 1.15 : isHopping ? 0.6 : 2,
            repeat: isWakingUp || isHopping ? 0 : Infinity,
            ease: "easeInOut",
        }}/>
    </motion.button>);
}
