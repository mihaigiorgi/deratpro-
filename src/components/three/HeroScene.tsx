"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type ReactNode, type RefObject } from "react";
import * as THREE from "three";

import { domeFragmentShader, domeVertexShader, particleFragmentShader, particleVertexShader } from "./shaders";

/*
 * Conceptul — „Casa sub cupolă”
 * -----------------------------
 * O casă low-poly (desenată din linii) stă sub o cupolă de protecție transparentă.
 * Din exterior vin particule portocalii — dăunătorii. Când una atinge cupola:
 *  - devine verde (neutralizată), ricoșează și dispare;
 *  - pe cupolă pornește o undă din punctul de impact.
 * Mouse-ul (sau degetul) împinge dăunătorii, iar scena se înclină ușor după el.
 * Mesajul pentru vizitator: „casa ta e protejată”, fără imagini neplăcute cu insecte.
 */

export interface PointerTarget {
  x: number;
  y: number;
  /** false când mouse-ul a ieșit din hero — scena revine lin în poziția de repaus */
  active: boolean;
}

export interface SceneQuality {
  particles: number;
  domeSegments: number;
}

// ── Dimensiuni (în unități 3D) ────────────────────────────────────────────
const GROUND_Y = -0.95;
const DOME_RADIUS = 1.9;
const DOME_CENTER = new THREE.Vector3(0, GROUND_Y, 0);
const SPAWN_MIN = 3.2;
const SPAWN_MAX = 4.6;
const POINTER_RADIUS = 1.1;
const NEUTRALIZED_LIFE = 1.4; // secunde până dispare o particulă neutralizată

// ── Culori ────────────────────────────────────────────────────────────────
const COLOR_THREAT = new THREE.Color("#f2a93b");
const COLOR_NEUTRAL = new THREE.Color("#b8f24a");
const COLOR_LIME = new THREE.Color("#b8f24a");

/** Punctul de impact pentru unda de pe cupolă — scris de particule, citit de cupolă. */
interface HitState {
  dir: THREE.Vector3;
  age: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// Casa
// ═══════════════════════════════════════════════════════════════════════════

const W = 1.15; // lățime (x)
const D = 0.95; // adâncime (z)
const H = 0.72; // înălțimea pereților
const ROOF = 0.52; // înălțimea acoperișului
const EAVE = 0.1; // cât iese acoperișul peste pereți

/** Liniile casei, ca perechi de puncte [x1,y1,z1, x2,y2,z2, ...]. */
function buildHouseLines(): Float32Array {
  const g = GROUND_Y;
  const x = W / 2;
  const z = D / 2;
  const top = g + H;
  const ex = x + EAVE;
  const ez = z + EAVE;
  const ridge = top + ROOF;

  const segments: number[][] = [
    // pereții — bază și partea de sus
    [-x, g, -z, x, g, -z], [x, g, -z, x, g, z], [x, g, z, -x, g, z], [-x, g, z, -x, g, -z],
    [-x, top, -z, x, top, -z], [x, top, -z, x, top, z], [x, top, z, -x, top, z], [-x, top, z, -x, top, -z],
    // colțurile verticale
    [-x, g, -z, -x, top, -z], [x, g, -z, x, top, -z], [x, g, z, x, top, z], [-x, g, z, -x, top, z],
    // acoperișul: streașina, coama și pantele
    [-ex, top, ez, ex, top, ez], [-ex, top, -ez, ex, top, -ez],
    [-ex, ridge, 0, ex, ridge, 0],
    [-ex, top, ez, -ex, ridge, 0], [ex, top, ez, ex, ridge, 0],
    [-ex, top, -ez, -ex, ridge, 0], [ex, top, -ez, ex, ridge, 0],
    // ușa (fața din față, z = +D/2)
    [-0.13, g, z, -0.13, g + 0.4, z], [0.13, g, z, 0.13, g + 0.4, z], [-0.13, g + 0.4, z, 0.13, g + 0.4, z],
    // fereastra din dreapta, cu cruce
    [0.28, g + 0.3, z, 0.46, g + 0.3, z], [0.46, g + 0.3, z, 0.46, g + 0.48, z],
    [0.46, g + 0.48, z, 0.28, g + 0.48, z], [0.28, g + 0.48, z, 0.28, g + 0.3, z],
    [0.37, g + 0.3, z, 0.37, g + 0.48, z], [0.28, g + 0.39, z, 0.46, g + 0.39, z],
  ];
  return new Float32Array(segments.flat());
}

/** Suprafețele închise ale casei (pereți + acoperiș), ca să ascundă particulele din spate. */
function buildHouseBody(): THREE.BufferGeometry {
  const g = GROUND_Y;
  const x = W / 2;
  const z = D / 2;
  const top = g + H;
  const ex = x + EAVE;
  const ez = z + EAVE;
  const ridge = top + ROOF;

  // prettier-ignore
  const vertices = new Float32Array([
    // pereți (4 fețe × 2 triunghiuri)
    -x, g, z,  x, g, z,  x, top, z,   -x, g, z,  x, top, z,  -x, top, z,
    x, g, -z,  -x, g, -z,  -x, top, -z,   x, g, -z,  -x, top, -z,  x, top, -z,
    x, g, z,  x, g, -z,  x, top, -z,   x, g, z,  x, top, -z,  x, top, z,
    -x, g, -z,  -x, g, z,  -x, top, z,   -x, g, -z,  -x, top, z,  -x, top, -z,
    // frontoanele (triunghiurile din laterale)
    x, top, z,  x, top, -z,  x, ridge, 0,
    -x, top, -z,  -x, top, z,  -x, ridge, 0,
    // cele două pante ale acoperișului
    -ex, top, ez,  ex, top, ez,  ex, ridge, 0,   -ex, top, ez,  ex, ridge, 0,  -ex, ridge, 0,
    ex, top, -ez,  -ex, top, -ez,  -ex, ridge, 0,   ex, top, -ez,  -ex, ridge, 0,  ex, ridge, 0,
  ]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  return geometry;
}

function House() {
  const lines = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(buildHouseLines(), 3));
    return geometry;
  }, []);
  const body = useMemo(buildHouseBody, []);

  return (
    // Rotită ușor, ca să vedem casa „din trei sferturi”: fațada, o latură și acoperișul.
    <group rotation={[0, -0.6, 0]}>
      <mesh geometry={body}>
        {/* polygonOffset împinge pereții puțin „în spate”, ca liniile de pe ei să nu pâlpâie */}
        <meshBasicMaterial color="#0a1120" side={THREE.DoubleSide} polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />
      </mesh>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color={COLOR_LIME} transparent opacity={0.85} />
      </lineSegments>
      {/* „Lumina aprinsă” în fereastră — casa e locuită, deci merită protejată */}
      <mesh position={[0.37, GROUND_Y + 0.39, D / 2 + 0.002]}>
        <planeGeometry args={[0.17, 0.17]} />
        <meshBasicMaterial color={COLOR_LIME} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Pământul — grilă polară sub cupolă
// ═══════════════════════════════════════════════════════════════════════════

function Ground() {
  const geometry = useMemo(() => {
    const points: number[] = [];
    // cercuri concentrice
    for (const radius of [0.7, 1.3, DOME_RADIUS, 2.6, 3.3]) {
      const steps = 96;
      for (let i = 0; i < steps; i++) {
        const a1 = (i / steps) * Math.PI * 2;
        const a2 = ((i + 1) / steps) * Math.PI * 2;
        points.push(Math.cos(a1) * radius, GROUND_Y, Math.sin(a1) * radius);
        points.push(Math.cos(a2) * radius, GROUND_Y, Math.sin(a2) * radius);
      }
    }
    // raze
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      points.push(Math.cos(a) * 0.7, GROUND_Y, Math.sin(a) * 0.7);
      points.push(Math.cos(a) * 3.3, GROUND_Y, Math.sin(a) * 3.3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(points), 3));
    return g;
  }, []);

  return (
    <group>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color={COLOR_LIME} transparent opacity={0.1} depthWrite={false} />
      </lineSegments>
      {/* Lumină difuză pe pământ, sub cupolă */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, GROUND_Y - 0.001, 0]}>
        <circleGeometry args={[DOME_RADIUS, 64]} />
        <meshBasicMaterial color={COLOR_LIME} transparent opacity={0.05} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Cupola de protecție
// ═══════════════════════════════════════════════════════════════════════════

function Dome({ segments, hit }: { segments: number; hit: RefObject<HitState> }) {
  // Semisferă: doar jumătatea de sus a unei sfere (thetaLength = π/2).
  const geometry = useMemo(
    () => new THREE.SphereGeometry(DOME_RADIUS, segments, Math.round(segments / 2), 0, Math.PI * 2, 0, Math.PI / 2),
    [segments],
  );

  // Rețeaua cupolei: câteva paralele și meridiane.
  const grid = useMemo(() => {
    const points: number[] = [];
    const steps = 96;
    for (const lat of [0.25, 0.5, 0.75]) {
      const y = Math.sin(lat * (Math.PI / 2)) * DOME_RADIUS;
      const r = Math.cos(lat * (Math.PI / 2)) * DOME_RADIUS;
      for (let i = 0; i < steps; i++) {
        const a1 = (i / steps) * Math.PI * 2;
        const a2 = ((i + 1) / steps) * Math.PI * 2;
        points.push(Math.cos(a1) * r, y, Math.sin(a1) * r, Math.cos(a2) * r, y, Math.sin(a2) * r);
      }
    }
    for (let m = 0; m < 12; m++) {
      const a = (m / 12) * Math.PI * 2;
      for (let i = 0; i < 24; i++) {
        const t1 = (i / 24) * (Math.PI / 2);
        const t2 = ((i + 1) / 24) * (Math.PI / 2);
        points.push(
          Math.cos(t1) * Math.cos(a) * DOME_RADIUS, Math.sin(t1) * DOME_RADIUS, Math.cos(t1) * Math.sin(a) * DOME_RADIUS,
          Math.cos(t2) * Math.cos(a) * DOME_RADIUS, Math.sin(t2) * DOME_RADIUS, Math.cos(t2) * Math.sin(a) * DOME_RADIUS,
        );
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(points), 3));
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uColor: { value: COLOR_LIME.clone() },
      uTime: { value: 0 },
      uHitDir: { value: new THREE.Vector3(0, 1, 0) },
      uHitAge: { value: 10 },
    }),
    [],
  );

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 1 / 30);
    hit.current.age += dt;
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uHitAge.value = hit.current.age;
    uniforms.uHitDir.value.copy(hit.current.dir);
  });

  return (
    <group position={DOME_CENTER}>
      <mesh geometry={geometry}>
        <shaderMaterial
          vertexShader={domeVertexShader}
          fragmentShader={domeFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <lineSegments geometry={grid}>
        <lineBasicMaterial color={COLOR_LIME} transparent opacity={0.12} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Particulele — dăunătorii
// ═══════════════════════════════════════════════════════════════════════════

interface ParticleState {
  positions: Float32Array;
  velocities: Float32Array;
  colors: Float32Array;
  alphas: Float32Array;
  sizes: Float32Array;
  /** 0 = dăunător activ; > 0 = neutralizat (secunde rămase până dispare) */
  neutralized: Float32Array;
  /** 0 → 1: apariția treptată după (re)spawn */
  spawnFade: Float32Array;
}

/** Poziție aleatoare pe o „coajă” în jurul cupolei, deasupra pământului. */
function randomSpawn(target: Float32Array, i: number) {
  const angle = Math.random() * Math.PI * 2;
  const elevation = Math.random() * Math.PI * 0.42; // de la sol până sus, pe diagonală
  const r = SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN);
  target[i * 3] = Math.cos(elevation) * Math.cos(angle) * r;
  target[i * 3 + 1] = GROUND_Y + 0.1 + Math.sin(elevation) * r;
  target[i * 3 + 2] = Math.cos(elevation) * Math.sin(angle) * r;
}

function createParticleState(count: number): ParticleState {
  const state: ParticleState = {
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
    state.sizes[i] = 3.5 + Math.random() * 4.5;
    state.spawnFade[i] = Math.random(); // apariție eșalonată, fără „pop” la început
  }
  return state;
}

interface ParticlesProps {
  count: number;
  hit: RefObject<HitState>;
  pointer: RefObject<PointerTarget>;
}

function Particles({ count, hit, pointer }: ParticlesProps) {
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport, gl } = useThree();

  const state = useMemo(() => createParticleState(count), [count]);
  const uniforms = useMemo(() => ({ uPixelRatio: { value: gl.getPixelRatio() } }), [gl]);

  // Obiecte refolosite la fiecare cadru — zero alocări în useFrame.
  const pointerWorld = useMemo(() => new THREE.Vector3(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  useFrame((_, rawDelta) => {
    const geometry = geometryRef.current;
    const points = pointsRef.current;
    if (!geometry || !points) return;

    const dt = Math.min(rawDelta, 1 / 30); // stabil după schimbarea tab-ului
    const { positions, velocities, colors, alphas, neutralized, spawnFade } = state;
    const target = GROUND_Y + 0.7; // spre ce înălțime „țintesc” dăunătorii (casa)

    // Mouse → lumea 3D (planul z = 0) → spațiul local al particulelor.
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

      // Distanța față de centrul cupolei.
      const dx0 = x - DOME_CENTER.x;
      const dy0 = y - DOME_CENTER.y;
      const dz0 = z - DOME_CENTER.z;
      const r = Math.hypot(dx0, dy0, dz0) || 0.0001;

      if (neutralized[i] > 0) {
        // Neutralizat: se îndepărtează și dispare treptat.
        neutralized[i] -= dt;
        alphas[i] = (Math.max(neutralized[i], 0) / NEUTRALIZED_LIFE) * 0.95;
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
        // Activ: atras spre casă + o mișcare în spirală în jurul ei.
        const tx = -x;
        const ty = target - y;
        const tz = -z;
        const tl = Math.hypot(tx, ty, tz) || 0.0001;
        const pull = 0.24;
        vx += (tx / tl) * pull * dt;
        vy += (ty / tl) * pull * dt;
        vz += (tz / tl) * pull * dt;
        vx += (-z / r) * 0.14 * dt;
        vz += (x / r) * 0.14 * dt;

        // Câmpul de respingere al mouse-ului.
        const px = x - pointerWorld.x;
        const py = y - pointerWorld.y;
        const pz = z - pointerWorld.z;
        const dist = Math.hypot(px, py, pz);
        if (hasPointer && dist < POINTER_RADIUS && dist > 0.0001) {
          const force = ((POINTER_RADIUS - dist) / POINTER_RADIUS) * 3.2 * dt;
          vx += (px / dist) * force;
          vy += (py / dist) * force;
          vz += (pz / dist) * force;
        }

        // Frânare ușoară — mișcare calmă.
        const damping = 1 - 0.9 * dt;
        vx *= damping;
        vy *= damping;
        vz *= damping;

        // Apariție lină și estompare spre marginea exterioară.
        spawnFade[i] = Math.min(spawnFade[i] + dt * 0.5, 1);
        const edgeFade = THREE.MathUtils.clamp((SPAWN_MAX + 0.4 - r) / 1.2, 0, 1);
        alphas[i] = spawnFade[i] * edgeFade;

        // Pe măsură ce se apropie, culoarea „se răcește” puțin (sunt detectați).
        const proximity = THREE.MathUtils.clamp((r - DOME_RADIUS) / (SPAWN_MAX - DOME_RADIUS), 0, 1);
        tmpColor.copy(COLOR_THREAT).lerp(COLOR_NEUTRAL, (1 - proximity) * 0.2);
        tmpColor.toArray(colors, ix);

        // Contact cu cupola → neutralizat.
        if (r < DOME_RADIUS * 1.03) {
          neutralized[i] = NEUTRALIZED_LIFE;
          COLOR_NEUTRAL.toArray(colors, ix);
          const bounce = 0.9 + Math.random() * 0.5;
          vx = (dx0 / r) * bounce;
          vy = Math.abs(dy0 / r) * bounce;
          vz = (dz0 / r) * bounce;
          // O singură undă la un moment dat, ca să apuce să se vadă complet.
          if (hit.current.age > 1.2) {
            hit.current.dir.set(dx0 / r, Math.max(dy0 / r, 0.05), dz0 / r).normalize();
            hit.current.age = 0;
          }
        }
      }

      x += vx * dt;
      y += vy * dt;
      z += vz * dt;

      // Pământul: dăunătorii nu trec prin sol.
      if (y < GROUND_Y + 0.04) {
        y = GROUND_Y + 0.04;
        vy = Math.abs(vy) * 0.5;
      }

      // Plasă de siguranță: nicio particulă nu pleacă la infinit.
      if (Math.hypot(x, y - GROUND_Y, z) > SPAWN_MAX + 1.5) {
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

// ═══════════════════════════════════════════════════════════════════════════
// Rig — rotație lentă + înclinare după mouse
// ═══════════════════════════════════════════════════════════════════════════

function Rig({ children, pointer }: { children: ReactNode; pointer: RefObject<PointerTarget> }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, rawDelta) => {
    if (!ref.current) return;
    const dt = Math.min(rawDelta, 1 / 30);
    const k = 1 - Math.exp(-dt * 2.5); // interpolare independentă de FPS
    const { x, y, active } = pointer.current;
    const auto = Math.sin(state.clock.elapsedTime * 0.15) * 0.35; // se rotește încet stânga-dreapta
    const targetY = auto + (active ? THREE.MathUtils.clamp(x, -1, 1) * 0.3 : 0);
    const targetX = active ? -THREE.MathUtils.clamp(y, -1, 1) * 0.12 : 0;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * k;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * k;
  });

  return <group ref={ref}>{children}</group>;
}

interface HeroSceneProps {
  quality: SceneQuality;
  frameloop: "always" | "demand" | "never";
  /**
   * Poziția mouse-ului normalizată la canvas (-1…1), urmărită de părinte pe tot hero-ul,
   * ca textul să nu blocheze interacțiunea.
   */
  pointer: RefObject<PointerTarget>;
  onReady?: () => void;
}

export default function HeroScene({ quality, frameloop, pointer, onReady }: HeroSceneProps) {
  const hit = useRef<HitState>({ dir: new THREE.Vector3(0, 1, 0), age: 10 });

  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, quality.particles > 300 ? 2 : 1.5]}
      camera={{ position: [0, 2.3, 8.4], fov: 38, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ camera }) => {
        camera.lookAt(0, -0.35, 0);
        onReady?.();
      }}
      fallback={null}
      aria-hidden
    >
      <Rig pointer={pointer}>
        <Ground />
        <House />
        <Dome segments={quality.domeSegments} hit={hit} />
        <Particles count={quality.particles} hit={hit} pointer={pointer} />
      </Rig>
    </Canvas>
  );
}
