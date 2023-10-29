uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  vec2 position = gl_FragCoord.xy/u_resolution;
  vec2 mouse = u_mouse.xy/u_resolution;

  float r = (position.x + mouse.x) * 0.5;
  float g = (position.y + mouse.y) * 0.5;
  float b = abs(sin(u_time));
  float a = 1.0;

  gl_FragColor = vec4(r,g,b,a);
}
