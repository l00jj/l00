varying vec2 vUv;

void main()
{
  gl_FragColor = vec4(vUv, 0.0, 1.0); // 调节 Blue 有不同的效果
}