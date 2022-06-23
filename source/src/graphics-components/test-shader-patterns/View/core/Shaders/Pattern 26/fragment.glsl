varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main()
{

  // 方法1
  //float strength = distance(vec2(vUv), vec2(0.0, 0.0));
  
  // 方法2
  //float strength = sqrt(dot(vUv, vUv));//可其他效果 float strength = sqrt(dot(vUv.x, vUv.y))

  // 方法3
  float strength = length(vUv);

  gl_FragColor = vec4(strength, strength, strength, 1.0); // 
}