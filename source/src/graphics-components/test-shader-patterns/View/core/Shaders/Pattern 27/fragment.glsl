varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main()
{
  // 方法1
  //float strength = length(vUv - 0.5);

  // 方法2
  float strength = distance(vUv, vec2(0.5)); // 可以通过调整后面vec2的数值调整中心点

  gl_FragColor = vec4(strength, strength, strength, 1.0);
}