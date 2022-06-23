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
  // 方法1
  // float angel = atan(vUv.x - 0.5, vUv.y - 0.5);
  // angel /= PI * 2.0;
  // angel += 0.5;
  // angel = sin(angel * PI * 2.0 * 16.0);
  
  // float radius = distance(vUv, vec2(0.5)) - 0.25;
  // radius -= angel * 0.2;
  // float strength = step(abs(radius ), 0.01);

  // 方法2 - 多调节参数能有很多变化
  float angel = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
  float radius =  0.25 + sin(angel * PI * 2.0 * 16.0) * 0.02; // 0.02 可以改为 1.2
  float strength = step(abs(distance(vUv, vec2(0.5)) - radius), 0.01);

  gl_FragColor = vec4(strength, strength, strength, 1.0);
}