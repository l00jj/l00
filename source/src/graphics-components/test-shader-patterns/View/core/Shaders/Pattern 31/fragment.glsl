varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main()
{
  
  // 方法1
  // float lightXStrengthY = 2.0;
  // float lightXStrengthX = 0.4;
  // float lightZ = 0.15;
  // float lightXStrength = lightZ / distance(vec2(vUv.x * lightXStrengthX, vUv.y * lightXStrengthY), vec2(0.5 * lightXStrengthX, 0.5 * lightXStrengthY));

  // float lightYStrengthY = lightXStrengthX;
  // float lightYStrengthX = lightXStrengthY;
  // float lightYStrength = lightZ / distance(vec2(vUv.x * lightYStrengthX, vUv.y * lightYStrengthY), vec2(0.5 * lightYStrengthX, 0.5 * lightYStrengthY));

  // float strength = lightYStrength * lightXStrength;

  // 方法2
  // float strength = 0.15 / distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5));
  // strength *= 0.15 / distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5));

  // 方法2 - 可调节版本
  float lightStrength = 0.15; // 中心大小
  float elongation = 5.0; // 拉伸程度 - 越大越尖锐
  float strength = lightStrength / distance(vec2(vUv.x, (vUv.y - 0.5) * elongation + 0.5), vec2(0.5));
  strength *= lightStrength / distance(vec2(vUv.y, (vUv.x - 0.5) * elongation + 0.5), vec2(0.5));

  gl_FragColor = vec4(strength, strength, strength, 1.0);
}