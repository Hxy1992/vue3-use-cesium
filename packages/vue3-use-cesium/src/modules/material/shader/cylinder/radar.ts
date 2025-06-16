// https://github.com/jiawanlong/Cesium-Examples/blob/main/examples/cesiumEx/5.3.4%E3%80%81%E5%9C%86%E9%94%A5%E4%BD%93.html#L98
export default `uniform vec4 color;
uniform float repeat;
uniform float offset;
uniform float thickness;
czm_material czm_getMaterial(czm_materialInput materialInput){
    czm_material material = czm_getDefaultMaterial(materialInput);
    float sp = 1.0/repeat;
    vec2 st = materialInput.st;
    float dis = distance(st, vec2(0.5));
    float m = mod(dis + offset-time, sp);
    float a = step(sp*(1.0-thickness), m); 
    material.diffuse = color.rgb;
    material.alpha = a * color.a;
    return material;
}`;
