import ZippyZapsMaterial from "../shader/shadertoy/zippy-zaps";

/**
 * Primitive材质 - CircleBlur
 */
export function createBoxZaps(options: { speed?: number; iResolution?: any } = {}) {
	const { speed, iResolution } = options;
	return new Cesium.Material({
		fabric: {
			type: "BoxZaps",
			uniforms: {
				speed: speed ?? 1.0,
				iResolution: iResolution ?? new Cesium.Cartesian2(1024, 1024)
			},
			source: ZippyZapsMaterial
		},
		translucent: function () {
			return true;
		}
	});
}
