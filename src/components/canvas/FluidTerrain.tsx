"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

const VERTEX_SHADER = `
uniform float uTime;

varying float vElevation;
varying vec2 vUv;

// 3D Simplex Noise
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

void main() {
    vUv = uv;
    
    vec3 pos = position;
    
    // Layered noise for deep, organic fluid motion
    float elevation = snoise(vec3(pos.x * 0.15, pos.y * 0.15, uTime * 0.15)) * 2.5;
    elevation += snoise(vec3(pos.x * 0.4, pos.y * 0.4, uTime * 0.3)) * 0.8;
    
    pos.z += elevation;
    vElevation = elevation;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}
`;

const FRAGMENT_SHADER = `
uniform float uTime;

varying float vElevation;
varying vec2 vUv;

// Simple 2D random function for tactile grain
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    // Colors
    vec3 valleyColor = vec3(0.02, 0.02, 0.02); // Pure matte black/dark grey (#050505)
    vec3 midColor = vec3(0.05, 0.18, 0.11); // Deep forest green glow (#0d2e1c)
    vec3 peakColor = vec3(0.0, 1.0, 0.53); // Vibrant electric mint green (#00ff88)
    
    // Normalize elevation (approx -3.3 to 3.3) to 0.0 - 1.0 range
    float mixRatio = (vElevation + 3.3) / 6.6;
    mixRatio = clamp(mixRatio, 0.0, 1.0);
    
    // Non-linear color mapping for dramatic contrast
    // Push the mid-tone deep, and only light up the very top peaks
    vec3 finalColor = mix(valleyColor, midColor, smoothstep(0.2, 0.6, mixRatio));
    finalColor = mix(finalColor, peakColor, smoothstep(0.75, 1.0, mixRatio));
    
    // Add micro-grain for a cinematic obsidian/silk tactile feel
    float grain = random(vUv * 100.0 + uTime) * 0.05;
    finalColor += grain;
    
    // Fade out edges into black to blend with the website body
    float distFromCenter = distance(vUv, vec2(0.5));
    float vignette = smoothstep(0.5, 0.2, distFromCenter);
    
    gl_FragColor = vec4(finalColor * vignette, 1.0);
}
`;

function TerrainMesh() {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    
    const uniforms = useMemo(() => ({
        uTime: { value: 0 }
    }), []);
    
    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <mesh rotation={[-Math.PI / 2 + 0.2, 0, 0]} position={[0, -5, 0]}>
            {/* Extremely dense plane geometry for high-res fluid displacement */}
            <planeGeometry args={[100, 100, 150, 150]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={VERTEX_SHADER}
                fragmentShader={FRAGMENT_SHADER}
                uniforms={uniforms}
                wireframe={false}
            />
        </mesh>
    );
}

export default function FluidTerrain() {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-[-1]" style={{ willChange: 'transform' }}>
            <Canvas camera={{ position: [0, 5, 20], fov: 45 }} dpr={[1, 1.5]}>
                <color attach="background" args={["#000209"]} />
                <TerrainMesh />
            </Canvas>
        </div>
    );
}
