// https://www.shadertoy.com/view/4dSfDK
export default `
uniform vec2 iResolution;
uniform float speed;
uniform vec4 backgroundColor;

float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898,12.1414))) * 83758.5453);
}

float noise(vec2 n) {
    const vec2 d = vec2(0.0, 1.0);
    vec2 b = floor(n);
    vec2 f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

vec3 ramp(float t) {
    return t <= .5 ? vec3( 1. - t * 1.4, .2, 1.05 ) / t : vec3( .3 * (1. - t) * 2., .2, 1.05 ) / t;
}
vec2 polarMap(vec2 uv, float shift, float inner) {

    uv = vec2(0.5) - uv;
    
    
    float px = 1.0 - fract(atan(uv.y, uv.x) / 6.28 + 0.25) + shift;
    float py = (sqrt(uv.x * uv.x + uv.y * uv.y) * (1.0 + inner * 2.0) - inner) * 2.0;
    
    return vec2(px, py);
}
float fire(vec2 n) {
    return noise(n) + noise(n * 2.1) * .6 + noise(n * 5.4) * .42;
}

float shade(vec2 uv, float t) {
    uv.x += uv.y < .5 ? 23.0 + t * .035 : -11.0 + t * .03;    
    uv.y = abs(uv.y - .5);
    uv.x *= 35.0;
    
    float q = fire(uv - t * .013) / 2.0;
    vec2 r = vec2(fire(uv + q / 2.0 + t - uv.x - uv.y), fire(uv + q - t));
    
    return pow((r.y + r.y) * max(.0, uv.y) + .1, 4.0);
}

vec3 colorCalc(float grad) {

    float m2 = 1.15;
    grad =sqrt( grad);
    vec3 color2 = vec3(1.0 / (pow(vec3(0.5, 0.0, .1) + 2.61, vec3(2.0))));
    color2 = ramp(grad);
    color2 /= (m2 + max(vec3(0), color2));
    
    return color2;

}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    
    float m1 = 3.6;
    float iTime = czm_frameNumber * speed / 100.0;
    float t = iTime;
    vec2 uv = fragCoord / iResolution.yy;
    float ff = 1.0 - uv.y;
    uv.x -= (iResolution.x / iResolution.y - 1.0) / 2.0;
    vec2 uv2 = uv;
    uv2.y = 1.0 - uv2.y;
    uv = polarMap(uv, 1.3, m1);
    uv2 = polarMap(uv2, 1.9, m1);

    vec3 c1 = colorCalc(shade(uv, t)) * ff;
    vec3 c2 = colorCalc(shade(uv2, t)) * (1.0 - ff);
    
    // 计算火焰强度
    float flameIntensity = length(c1 + c2);
    
    // 正确处理透明度混合
    vec3 flameColor = c1 + c2;
    float alpha = mix(backgroundColor.a, 1.0, flameIntensity);
    vec3 finalColor = mix(backgroundColor.rgb, flameColor, flameIntensity);
    
    fragColor = vec4(finalColor, alpha);
}


czm_material czm_getMaterial(czm_materialInput materialInput) {
    czm_material material = czm_getDefaultMaterial(materialInput);
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    mainImage(color, materialInput.st * iResolution);
    material.diffuse = color.rgb;
    material.alpha = color.a;
    return material;
}
`;
