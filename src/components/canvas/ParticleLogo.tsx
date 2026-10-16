"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const VERTEX_SHADER = `
uniform float uTime;
uniform float uProgress;

// Noise implementation
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

attribute vec3 aTarget;
attribute vec3 aCurrentPos;
attribute float aRandom;
attribute float aSize;

varying vec3 vColor;
varying float vAlpha;
varying float vActivity;

void main() {
    float smoothProg = smoothstep(0.0, 1.0, uProgress);
    
    // Cosmic breathing noise applied to the physical position
    float noise1 = snoise(vec3(aCurrentPos.x * 0.02, aCurrentPos.y * 0.02, uTime * 0.2));
    float noise2 = snoise(vec3(aCurrentPos.y * 0.02, aCurrentPos.z * 0.02, uTime * 0.2 + 100.0));
    float noise3 = snoise(vec3(aCurrentPos.z * 0.02, aCurrentPos.x * 0.02, uTime * 0.2 + 200.0));
    
    vec3 breathing = vec3(noise1, noise2, noise3) * 2.0 * smoothProg;
    
    vec3 animatedPos = aCurrentPos + breathing;
    
    // Intro scatter interpolation
    vec3 finalPos = mix(position, animatedPos, smoothProg);

    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Measure distance from origin anchor to determine physics activity
    float distFromOrigin = distance(animatedPos, aTarget);
    vActivity = clamp(distFromOrigin / 15.0, 0.0, 1.0); // 0 = settled, 1 = violently disturbed
    
    // Size attenuation: Disturbed particles bloat slightly
    float sizeMultiplier = mix(1.0, 2.5, vActivity);
    gl_PointSize = aSize * sizeMultiplier * (100.0 / -mvPosition.z) * mix(1.0, 0.5, smoothProg);

    // Ultra-bright neon green base colors
    vColor = mix(vec3(0.05, 0.8, 0.3), vec3(0.2, 1.5, 0.8), aRandom); 
    vAlpha = mix(0.4, 1.0, aRandom) * min(smoothProg + 0.3, 1.0);
}
`;

const FRAGMENT_SHADER = `
varying vec3 vColor;
varying float vAlpha;
varying float vActivity;

void main() {
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = length(cxy);
    if (r > 1.0) discard;
    
    float core = exp(-r * 8.0);
    float edge = exp(-r * 2.5);
    
    // High activity = super bright white core
    vec3 brightColor = vec3(2.0, 3.0, 2.5) + (vec3(1.5, 2.5, 1.5) * vActivity * 2.0);
    vec3 finalColor = mix(vColor, brightColor, core);
    
    // Massive brightness multiplier to make it glow intensely
    finalColor *= (2.5 + vActivity * 2.0); 
    
    // High activity = higher opacity
    float alpha = vAlpha * edge * mix(1.0, 2.5, core) * mix(1.0, 1.5, vActivity);
    
    gl_FragColor = vec4(finalColor, alpha);
}
`;

export default function ParticleLogo({ scrollProgress }: { scrollProgress: number }) {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { camera, gl } = useThree();
    
    // Stateful tracking for physics
    const [targetMouseVec] = useState(() => new THREE.Vector3(-9999, -9999, 0));
    const [mouseVec] = useState(() => new THREE.Vector3(-9999, -9999, 0));
    const [prevMouseVec] = useState(() => new THREE.Vector3(-9999, -9999, 0));
    
    const [geometryData, setGeometryData] = useState<any>(null);

    useEffect(() => {
        const img = new Image();
        img.src = '/coldune-studio-logo-3.webp';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (!ctx) return;
            
            const w = 240;
            const h = 240;
            canvas.width = w;
            canvas.height = h;
            
            ctx.drawImage(img, 0, 0, w, h);
            const data = ctx.getImageData(0, 0, w, h).data;
            
            const positions = [];
            const targets = [];
            const randoms = [];
            const sizes = [];
            
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const index = (y * w + x) * 4;
                    const r = data[index];
                    const g = data[index + 1];
                    const b = data[index + 2];
                    const alpha = data[index + 3];
                    
                    if (alpha < 50) continue;
                    if (r > 220 && g > 220 && b > 220) continue;
                    
                    if (Math.random() > 0.15) {
                        // Decrease overall size of the logo by 20%
                        const tx = ((x / w - 0.5) * 120.0) * 0.8; 
                        const ty = (-(y / h - 0.5) * 85.0 - 5.0) * 0.8; 
                        const tz = (Math.random() - 0.5) * 5.0; 
                        
                        targets.push(tx, ty, tz);
                        const sizeRand = Math.random();
                        // Decreased particle sizes by 20% per user request
                        const baseSize = sizeRand > 0.92 ? 8.0 + Math.random() * 5.0 : Math.random() * 4.0 + 2.5;
                        const finalSize = baseSize * 0.8;
                        sizes.push(finalSize);  
                        
                        const theta = Math.random() * Math.PI * 2;
                        const phi = Math.acos(Math.random() * 2 - 1);
                        const radius = 10 + Math.random() * 20;
                        
                        const ix = radius * Math.sin(phi) * Math.cos(theta);
                        const iy = radius * Math.sin(phi) * Math.sin(theta);
                        const iz = radius * Math.cos(phi);
                        
                        positions.push(ix, iy, iz);
                        randoms.push(Math.random());
                    }
                }
            }
            
            // Create the flat Float32Arrays for ultra-fast CPU physics
            const numParticles = targets.length / 3;
            const currentPositions = new Float32Array(targets); // Start at target
            const velocities = new Float32Array(targets.length); // Start at 0
            
            setGeometryData({
                positions: new Float32Array(positions), // Initial scatter
                targets: new Float32Array(targets), // Origin anchors
                currentPositions: currentPositions, // Stateful positions
                velocities: velocities, // Stateful velocities
                randoms: new Float32Array(randoms),
                sizes: new Float32Array(sizes),
                count: numParticles
            });
        };
    }, []);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uProgress: { value: 0 }
    }), []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const rect = gl.domElement.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
                targetMouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                targetMouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            } else {
                targetMouseVec.x = -9999;
                targetMouseVec.y = -9999;
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [targetMouseVec, gl]);

    useFrame((state, delta) => {
        if (!materialRef.current || !geometryData || !pointsRef.current) return;
        
        materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        materialRef.current.uniforms.uProgress.value = THREE.MathUtils.lerp(
            materialRef.current.uniforms.uProgress.value,
            scrollProgress,
            0.05
        );

        // Calculate actual 3D Mouse position
        prevMouseVec.copy(mouseVec);
        mouseVec.lerp(targetMouseVec, 0.15); // Smooth tracking
        
        const vec = new THREE.Vector3(mouseVec.x, mouseVec.y, 0.5);
        vec.unproject(camera);
        vec.sub(camera.position).normalize();
        const dist = -camera.position.z / vec.z;
        const pos3D = camera.position.clone().add(vec.multiplyScalar(dist));
        
        prevMouseVec.copy(pos3D); // Store for next frame

        // Extremely fast flat array CPU physics loop
        const { currentPositions, targets, velocities, count } = geometryData;
        const stiffness = 0.18; // High-Elasticity Snap Back
        const friction = 0.82; // Tight damping
        const influenceRadius = 20.0; // Adjusted for local coordinate space
        
        const isMouseActive = pos3D.x > -900;
        
        // Map the world mouse coordinates into the local scaled space of the particles
        const mx = pos3D.x / 0.457;
        const my = pos3D.y / 0.387;
        
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            
            let cx = currentPositions[i3];
            let cy = currentPositions[i3 + 1];
            let cz = currentPositions[i3 + 2];
            
            const tx = targets[i3];
            const ty = targets[i3 + 1];
            const tz = targets[i3 + 2];
            
            let vx = velocities[i3];
            let vy = velocities[i3 + 1];
            let vz = velocities[i3 + 2];
            
            // 1. Organic Fluid Return (Spring force toward anchor)
            const ax = (tx - cx) * stiffness;
            const ay = (ty - cy) * stiffness;
            const az = (tz - cz) * stiffness;
            
            vx += ax;
            vy += ay;
            vz += az;
            
            // 2. Micro-Repulsion Zone
            if (isMouseActive) {
                const dx = cx - mx;
                const dy = cy - my;
                const distanceSq = dx * dx + dy * dy;
                
                if (distanceSq < influenceRadius * influenceRadius) {
                    const distance = Math.sqrt(distanceSq);
                    const force = (influenceRadius - distance) / influenceRadius;
                    
                    // Gentle fluid dent (Subtle displacement away from cursor)
                    // No chaotic velocity explosions, just a clean, premium ripple
                    vx += (dx / distance) * force * 1.5;
                    vy += (dy / distance) * force * 1.5;
                }
            }
            
            // Apply Damping Friction
            vx *= friction;
            vy *= friction;
            vz *= friction;
            
            velocities[i3] = vx;
            velocities[i3 + 1] = vy;
            velocities[i3 + 2] = vz;
            
            currentPositions[i3] = cx + vx;
            currentPositions[i3 + 1] = cy + vy;
            currentPositions[i3 + 2] = cz + vz;
        }
        
        const geo = pointsRef.current.geometry;
        geo.attributes.aCurrentPos.needsUpdate = true;
    });

    if (!geometryData) return null;

    return (
        <group position={[0, 0, 0]} scale={[0.457, 0.387, 0.387]}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    {/* Intro Scattered Position */}
                    <bufferAttribute
                        attach="attributes-position"
                        args={[geometryData.positions, 3]}
                    />
                    {/* Original Anchors */}
                    <bufferAttribute
                        attach="attributes-aTarget"
                        args={[geometryData.targets, 3]}
                    />
                {/* Stateful Current Physics Position */}
                <bufferAttribute
                    attach="attributes-aCurrentPos"
                    args={[geometryData.currentPositions, 3]}
                />
                <bufferAttribute
                    attach="attributes-aRandom"
                    args={[geometryData.randoms, 1]}
                />
                <bufferAttribute
                    attach="attributes-aSize"
                    args={[geometryData.sizes, 1]}
                />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                vertexShader={VERTEX_SHADER}
                fragmentShader={FRAGMENT_SHADER}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
        </group>
    );
}
