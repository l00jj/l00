#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}


// 默认使用的旋转方案
// 优化版本的旋转函数可以使用 sincos(float3 a, out float3 s, float3 out c)
// 另外可以缓存cos和sin的结果避免多次运算
// https://developer.download.nvidia.com/cg/sincos.html
vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main()
{
  float frequency = 30.0; // 10.0
  float range = 0.1;
  vec2 waveUv = vec2(vUv.x, sin(vUv.x * frequency) * range + vUv.y);
  float strength = step(abs(distance(waveUv, vec2(0.5)) - 0.25), 0.01);

  gl_FragColor = vec4(strength, strength, strength, 1.0);
}