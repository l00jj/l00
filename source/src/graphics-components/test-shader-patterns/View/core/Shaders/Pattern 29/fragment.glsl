varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main()
{
  
  // 需要注意的是，边缘永不为0，需要其他处理
  float strength = 0.015 / distance(vUv, vec2(0.5));

  gl_FragColor = vec4(strength, strength, strength, 1.0);
}