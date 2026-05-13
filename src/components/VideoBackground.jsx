import { useEffect, useRef, useState } from 'react';

function VideoBackground({ weatherId, icon, className, fade }) {
    if (!weatherId || !icon) return null;

    const isDay = icon.endsWith('d');
    let video = "";

    if (200 <= weatherId && weatherId <= 232) video = "thunderstorm";
    if ((300 <= weatherId && weatherId <= 321) || (500 <= weatherId && weatherId <= 531)) video = "rain";
    if (600 <= weatherId && weatherId <= 622) video = "snow";
    if (700 <= weatherId && weatherId <= 781) video = "fog";
    if (801 <= weatherId && weatherId <= 804) video = "cloudy";
    if (weatherId === 800) video = isDay ? "clear-day" : "clear-night";

    const videoRefs = [useRef(null), useRef(null)];
    const [active, setActive] = useState(0);
    const [opacities, setOpacities] = useState([1, 0]);
    const isFirstRender = useRef(true);

    useEffect(() => {
        const src = `/videos/${video}.mp4`;

        if (isFirstRender.current || !fade) {
            isFirstRender.current = false;
            const v = videoRefs[active].current;
            if (!v) return;
            v.src = src;
            v.load();
            v.playbackRate = 0.7;
            v.currentTime = Math.random() * 10;
            return;
        }

        const next = 1 - active;
        const nextVid = videoRefs[next].current;
        if (!nextVid) return;

        nextVid.src = src;
        nextVid.load();
        nextVid.playbackRate = 0.7;
        nextVid.currentTime = Math.random() * 10;
        nextVid.play();

        const newOpacities = [0, 0];
        newOpacities[next] = 1;
        setOpacities(newOpacities);

        const timer = setTimeout(() => setActive(next), 500);
        return () => clearTimeout(timer);
    }, [video]);

    return (
        <div className={className}>
            {[0, 1].map(i => (
                <video
                    key={i}
                    ref={videoRefs[i]}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: opacities[i],
                        transition: fade ? 'opacity 0.8s ease' : 'none'
                    }}
                />
            ))}
        </div>
    )
}

export default VideoBackground;
