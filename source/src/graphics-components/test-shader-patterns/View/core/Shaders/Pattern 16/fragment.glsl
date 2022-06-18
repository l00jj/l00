varying vec2 vUv;

void main()
{
  // float strength = 1.0 - vUv.x - 0.5;
  // strength = max(strength, vUv.x - 0.5);

  float strength = abs(vUv.x - 0.5);

  gl_FragColor = vec4(strength, strength, strength, 1.0); // 
}