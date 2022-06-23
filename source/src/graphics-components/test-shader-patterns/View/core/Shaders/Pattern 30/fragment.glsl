varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main()
{
  
  // 方法1
  // float strengthY = 0.5;
  // float strengthX = 0.1;
  // float strength = 0.015 / distance(vec2(vUv.x * strengthX, vUv.y * strengthY), vec2(0.5 * strengthX, 0.5 * strengthY));

  // 方法2
  vec2 lightUv = vec2(
    vUv.x * 0.1 + 0.45, // 0.5 * (1.0 - 0.1)
    vUv.y * 0.5 + 0.25 // 0.5 * (1.0 - 0.5)
  );
  float strength = 0.015 / distance(lightUv, vec2(0.5));

  gl_FragColor = vec4(strength, strength, strength, 1.0);
}