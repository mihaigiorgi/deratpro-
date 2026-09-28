export const particleVertexShader = `
  attribute vec3 aColor;
  attribute float aAlpha;
  attribute float aSize;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * (10.0 / -mvPosition.z);
    vColor = aColor;
    vAlpha = aAlpha;
  }
`;

export const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float strength = pow(smoothstep(0.5, 0.0, d), 1.6);
    gl_FragColor = vec4(vColor, strength * vAlpha);
  }
`;

export const domeVertexShader = `
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

export const domeFragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform vec3 uHitDir;
  uniform float uHitAge;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vLocal;

  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, vViewDir)), 2.4);
    float breathe = 0.85 + 0.15 * sin(uTime * 1.2);

    float angle = acos(clamp(dot(vLocal, uHitDir), -1.0, 1.0));
    float front = uHitAge * 1.8;
    float ring = smoothstep(0.22, 0.0, abs(angle - front)) * (1.0 - smoothstep(0.0, 1.2, uHitAge));

    float base = smoothstep(0.35, 0.0, vLocal.y) * 0.18;

    float alpha = fresnel * 0.5 * breathe + ring * 0.55 + base;
    gl_FragColor = vec4(uColor, alpha);
  }
`;
