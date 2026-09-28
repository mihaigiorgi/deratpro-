/*
 * GLSL for the hero scene. Kept tiny on purpose: two materials, no post-processing.
 */

/** Soft round particles with per-particle color, alpha and size. */
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
    // Size attenuation: farther particles are smaller.
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
    // Bright core + soft falloff = subtle glow without bloom post-processing.
    float strength = smoothstep(0.5, 0.0, d);
    strength = pow(strength, 1.6);
    gl_FragColor = vec4(vColor, strength * vAlpha);
  }
`;

/** Fresnel rim for the energy shield: transparent in the middle, glowing on the edges. */
export const shieldVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-(viewMatrix * worldPosition).xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

export const shieldFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uPulse;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, vViewDir)), 2.6);
    float breathe = 0.85 + 0.15 * sin(uTime * 1.3);
    float alpha = fresnel * 0.55 * breathe + uPulse * 0.18 * fresnel;
    gl_FragColor = vec4(uColor, alpha);
  }
`;
