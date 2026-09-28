"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type ReactNode, type RefObject } from "react";
import * as THREE from "three";

import {
  particleFragmentShader,
  particleVertexShader,
  shieldFragmentShader,
  shieldVertexShader,
} from "./shaders";

/*
 * Concept — "the protection shield"
 * ---------------------------------
 * A geodesic shield sits at the centre. Warm-coloured particles (the "threats")
 * drift in from the outside. When one touches the shield it is neutralised:
 * it flashes lime, bounces away, fades out and later respawns at the edge.
 * The pointer acts as a second repelling field, so the visitor can "push" the
 * threats away. The metaphor maps directly onto the business: detection,
 * control, elimination — without showing a single bug or rodent.
 */

export interface PointerTarget {
  x: number;
  y: number;
  /** false when the pointer left the hero — the field then eases back to rest */
  active: boolean;
}

export interface SceneQuality {
  particles: number;
  shieldDetail: number;
}

const SHIELD_RADIUS = 1.35;
const SPAWN_MIN = 3.0;
const SPAWN_MAX = 4.6;
const POINTER_RADIUS = 1.1;

const COLOR_THREAT = new THREE.Color("#f2a93b");
const COLOR_NEUTRAL = new THREE.Color("#b8f24a");
const COLOR_SHIELD = new THREE.Color("#b8f24a");

interface ParticleSystemState {
  positions: Float32Array;
  velocities: Float32Array;
  colors: Float32Array;
  alphas: Float32Array;
  sizes: Float32Array;
  /** 0 = incoming threat, >0 = neutralised (seconds left until respawn) */
  neutralized: Float32Array;
  /** 0 → 1 fade-in after (re)spawn */
  spawnFade: Float32Array;
}

function randomSpawn(target: Float32Array, i: number) {
  // Uniform direction on a sphere, flattened a little on Z so the swarm reads well in 2D.
  const u = Math.random() * 2 - 1;
  const theta = Math.random() * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  const r = SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN);
  target[i * 3] = s * Math.cos(theta) * r;
  target[i * 3 + 1] = s * Math.sin(theta) * r * 0.8;
  target[i * 3 + 2] = u * r * 0.6;
}

function createParticleState(count: number): ParticleSystemState {
  const state: ParticleSystemState = {
    positions: new Float32Array(count * 3),
    velocities: new Float32Array(count * 3),
    colors: new Float32Array(count * 3),
    alphas: new Float32Array(count),
    sizes: new Float32Array(count),
    neutralized: new Float32Array(count),
    spawnFade: new Float32Array(count),
  };

  for (let i = 0; i < count; i++) {
    randomSpawn(state.positions, i);
    COLOR_THREAT.toArray(state.colors, i * 3);
    state.sizes[i] = 3.5 + Math.random() * 5;
    state.spawnFade[i] = Math.random(); // staggered start, no "pop" on first frame
  }
  return state;
}

interface ParticlesProps {
  count: number;
  pulse: RefObject<number>;
  pointer: RefObject<PointerTarget>;
}

function Particles({ count, pulse, pointer }: ParticlesProps) {
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport, gl } = useThree();

  const state = useMemo(() => createParticleState(count), [count]);

  const uniforms = useMemo(() => ({ uPixelRatio: { value: gl.getPixelRatio() } }), [gl]);

  // Scratch objects reused every frame — zero allocations inside useFrame.
  const pointerWorld = useMemo(() => new THREE.Vector3(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  useFrame((_, rawDelta) => {
    const geometry = geometryRef.current;
    const points = pointsRef.current;
    if (!geometry || !points) return;

    const dt = Math.min(rawDelta, 1 / 30); // stay stable after tab switches / frame drops
    const { positions, velocities, colors, alphas, neutralized, spawnFade } = state;

    // Pointer → world (z = 0 plane) → particle-local space.
    const hasPointer = pointer.current.active;
    pointerWorld.set((pointer.current.x * viewport.width) / 2, (pointer.current.y * viewport.height) / 2, 0);
    points.worldToLocal(pointerWorld);

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      let x = positions[ix];
      let y = positions[ix + 1];
      let z = positions[ix + 2];
      let vx = velocities[ix];
      let vy = velocities[ix + 1];
      let vz = velocities[ix + 2];
      const r = Math.hypot(x, y, z) || 0.0001;

      if (neutralized[i] > 0) {
        // Neutralised: drift outward and fade away.
        neutralized[i] -= dt;
        const life = Math.max(neutralized[i], 0) / 1.6;
        alphas[i] = life * 0.95;
        vx *= 0.97;
        vy *= 0.97;
        vz *= 0.97;

        if (neutralized[i] <= 0) {
          randomSpawn(positions, i);
          velocities[ix] = velocities[ix + 1] = velocities[ix + 2] = 0;
          COLOR_THREAT.toArray(colors, ix);
          spawnFade[i] = 0;
          alphas[i] = 0;
          continue;
        }
      } else {
        // Incoming: slow pull toward the shield + tangential swirl around the Y axis.
        const pull = 0.22;
        vx += (-x / r) * pull * dt;
        vy += (-y / r) * pull * dt;
        vz += (-z / r) * pull * dt;
        vx += (-z / r) * 0.12 * dt;
        vz += (x / r) * 0.12 * dt;

        // Pointer repulsion field.
        const dx = x - pointerWorld.x;
        const dy = y - pointerWorld.y;
        const dz = z - pointerWorld.z;
        const dist = Math.hypot(dx, dy, dz);
        if (hasPointer && dist < POINTER_RADIUS && dist > 0.0001) {
          const force = ((POINTER_RADIUS - dist) / POINTER_RADIUS) * 3.2 * dt;
          vx += (dx / dist) * force;
          vy += (dy / dist) * force;
          vz += (dz / dist) * force;
        }

        // Damping keeps the motion calm.
        const damping = 1 - 0.9 * dt;
        vx *= damping;
        vy *= damping;
        vz *= damping;

        // Fade in after spawn, fade out towards the outer boundary.
        spawnFade[i] = Math.min(spawnFade[i] + dt * 0.5, 1);
        const edgeFade = THREE.MathUtils.clamp((SPAWN_MAX + 0.4 - r) / 1.2, 0, 1);
        alphas[i] = spawnFade[i] * edgeFade;

        // Warm → slightly desaturated as they approach (they are "detected").
        const proximity = THREE.MathUtils.clamp((r - SHIELD_RADIUS) / (SPAWN_MAX - SHIELD_RADIUS), 0, 1);
        tmpColor.copy(COLOR_THREAT).lerp(COLOR_NEUTRAL, (1 - proximity) * 0.25);
        tmpColor.toArray(colors, ix);

        // Contact with the shield → neutralise.
        if (r < SHIELD_RADIUS * 1.04) {
          neutralized[i] = 1.6;
          COLOR_NEUTRAL.toArray(colors, ix);
          const bounce = 0.9 + Math.random() * 0.5;
          vx = (x / r) * bounce;
          vy = (y / r) * bounce;
          vz = (z / r) * bounce;
          pulse.current = Math.min(pulse.current + 0.35, 1);
        }
      }

      x += vx * dt;
      y += vy * dt;
      z += vz * dt;

      // Safety net: never let a particle wander off forever.
      if (Math.hypot(x, y, z) > SPAWN_MAX + 1.5) {
        randomSpawn(positions, i);
        velocities[ix] = velocities[ix + 1] = velocities[ix + 2] = 0;
        spawnFade[i] = 0;
        neutralized[i] = 0;
        COLOR_THREAT.toArray(colors, ix);
        continue;
      }

      positions[ix] = x;
      positions[ix + 1] = y;
      positions[ix + 2] = z;
      velocities[ix] = vx;
      velocities[ix + 1] = vy;
      velocities[ix + 2] = vz;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.aColor.needsUpdate = true;
    geometry.attributes.aAlpha.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[state.positions, 3]} usage={THREE.DynamicDrawUsage} />
        <bufferAttribute attach="attributes-aColor" args={[state.colors, 3]} usage={THREE.DynamicDrawUsage} />
        <bufferAttribute attach="attributes-aAlpha" args={[state.alphas, 1]} usage={THREE.DynamicDrawUsage} />
        <bufferAttribute attach="attributes-aSize" args={[state.sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Shield({ detail, pulse }: { detail: number; pulse: RefObject<number> }) {
  const shellRef = useRef<THREE.Group>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(SHIELD_RADIUS, detail), [detail]);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 1), [geometry]);

  const uniforms = useMemo(
    () => ({
      uColor: { value: COLOR_SHIELD.clone() },
      uTime: { value: 0 },
      uPulse: { value: 0 },
    }),
    [],
  );

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 1 / 30);
    const t = state.clock.elapsedTime;

    pulse.current = Math.max(pulse.current - dt * 1.4, 0);
    uniforms.uTime.value = t;
    uniforms.uPulse.value = pulse.current;

    if (shellRef.current) {
      shellRef.current.rotation.y += dt * 0.12;
      shellRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
    if (ringARef.current) ringARef.current.rotation.z += dt * 0.5;
    if (ringBRef.current) ringBRef.current.rotation.z -= dt * 0.32;
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 2) * 0.06 + pulse.current * 0.12;
      coreRef.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <group ref={shellRef}>
        {/* Fresnel energy field */}
        <mesh geometry={geometry}>
          <shaderMaterial
            vertexShader={shieldVertexShader}
            fragmentShader={shieldFragmentShader}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        {/* Geodesic lattice */}
        <lineSegments geometry={edges}>
          <lineBasicMaterial color={COLOR_SHIELD} transparent opacity={0.16} depthWrite={false} />
        </lineSegments>
        {/* Lattice nodes */}
        <points geometry={geometry}>
          <pointsMaterial color={COLOR_SHIELD} size={0.035} sizeAttenuation transparent opacity={0.7} depthWrite={false} />
        </points>
      </group>

      {/* Scanner rings — suggest detection / monitoring */}
      <mesh ref={ringARef} rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[SHIELD_RADIUS * 1.32, 0.004, 8, 160, Math.PI * 1.4]} />
        <meshBasicMaterial color={COLOR_SHIELD} transparent opacity={0.55} />
      </mesh>
      <mesh ref={ringBRef} rotation={[Math.PI / 1.8, -0.4, 0.6]}>
        <torusGeometry args={[SHIELD_RADIUS * 1.55, 0.003, 8, 160, Math.PI * 0.8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </mesh>

      {/* Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshBasicMaterial color={COLOR_SHIELD} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshBasicMaterial color={COLOR_SHIELD} transparent opacity={0.06} depthWrite={false} />
      </mesh>
    </group>
  );
}

/** Gentle parallax: the whole rig leans toward the pointer. */
function Rig({ children, pointer }: { children: ReactNode; pointer: RefObject<PointerTarget> }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, rawDelta) => {
    if (!ref.current) return;
    const dt = Math.min(rawDelta, 1 / 30);
    const k = 1 - Math.exp(-dt * 2.5); // frame-rate independent easing
    const { x, y, active } = pointer.current;
    const targetY = active ? THREE.MathUtils.clamp(x, -1, 1) * 0.25 : 0;
    const targetX = active ? -THREE.MathUtils.clamp(y, -1, 1) * 0.18 : 0;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * k;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * k;
  });

  return <group ref={ref}>{children}</group>;
}

interface HeroSceneProps {
  quality: SceneQuality;
  frameloop: "always" | "demand" | "never";
  /**
   * Pointer position normalised to the canvas (-1…1), tracked by the parent on the
   * whole hero section — so the text layer never blocks the interaction.
   */
  pointer: RefObject<PointerTarget>;
  onReady?: () => void;
}

export default function HeroScene({ quality, frameloop, pointer, onReady }: HeroSceneProps) {
  const pulse = useRef(0);

  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, quality.particles > 400 ? 2 : 1.5]}
      camera={{ position: [0, 0, 8.4], fov: 40, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => onReady?.()}
      fallback={null}
      aria-hidden
    >
      <Rig pointer={pointer}>
        <Shield detail={quality.shieldDetail} pulse={pulse} />
        <Particles count={quality.particles} pulse={pulse} pointer={pointer} />
      </Rig>
    </Canvas>
  );
}
