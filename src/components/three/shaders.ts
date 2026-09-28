/*
 * GLSL — programele care rulează direct pe placa video (GPU).
 * Două materiale: particulele (dăunătorii) și cupola de protecție.
 */

/** Particule rotunde, cu culoare, transparență și mărime proprii fiecăreia. */
export const particleVertexShader = /* glsl */ `
  attribute vec3 aColor;
  attribute float aAlpha;
  attribute float aSize;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    // Perspectivă: particulele mai îndepărtate sunt mai mici.
    gl_PointSize = aSize * uPixelRatio * (10.0 / -mvPosition.z);
    vColor = aColor;
    vAlpha = aAlpha;
  }
`;

export const particleFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    // Centru luminos + margine moale = glow fără post-procesare.
    float strength = pow(smoothstep(0.5, 0.0, d), 1.6);
    gl_FragColor = vec4(vColor, strength * vAlpha);
  }
`;

/**
 * Cupola: transparentă în mijloc, luminoasă pe margini (efect fresnel),
 * plus o undă care pornește din punctul unde a lovit ultimul dăunător.
 */
export const domeVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vLocal;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-(viewMatrix * worldPosition).xyz);
    vLocal = normalize(position);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

export const domeFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform vec3 uHitDir;
  uniform float uHitAge;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vLocal;

  void main() {
    // Fresnel: marginile (unde privim „pe lângă” suprafață) strălucesc.
    float fresnel = pow(1.0 - abs(dot(vNormal, vViewDir)), 2.4);
    float breathe = 0.85 + 0.15 * sin(uTime * 1.2);

    // Unda de impact: un inel care se extinde pe suprafața cupolei.
    float angle = acos(clamp(dot(vLocal, uHitDir), -1.0, 1.0));
    float front = uHitAge * 1.8;
    float ring = smoothstep(0.22, 0.0, abs(angle - front)) * (1.0 - smoothstep(0.0, 1.2, uHitAge));

    // Baza cupolei puțin mai luminoasă, ca un „câmp” care pornește din pământ.
    float base = smoothstep(0.35, 0.0, vLocal.y) * 0.18;

    float alpha = fresnel * 0.5 * breathe + ring * 0.55 + base;
    gl_FragColor = vec4(uColor, alpha);
  }
`;
