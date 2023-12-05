import { TerrainTypes } from "../../interfaces/map";

interface TerrainOptions {
	url: string;
	requestVertexNormals?: boolean;
	requestWaterMask?: boolean;
	ellipsoid?: any;
	credit?: any;
}
interface EllipsoidTerrainOptions {
	tilingScheme: any;
	ellipsoid: any;
}
interface ArcGISTerrainOptions {
	url: string;
	token: string;
	ellipsoid?: any;
}
interface GoogleTerrainOptions {
	url: string;
	credit?: any;
	ellipsoid?: any;
}
interface VRTerrainOptions {
	url: string;
	tilingScheme?: any;
	ellipsoid?: any;
}

/**
 * 地形
 */
export class TerrainFactory {
	/**
	 *
	 * @param options
	 */
	static createEllipsoidTerrain(options?: EllipsoidTerrainOptions) {
		return Promise.resolve(new Cesium.EllipsoidTerrainProvider(options));
	}

	/**
	 * Create url terrain
	 * @param options
	 */
	static createUrlTerrain(options: TerrainOptions): Promise<any> {
		return Cesium.CesiumTerrainProvider.fromUrl(options.url, options);
	}

	/**
	 * Create google terrain
	 * @param options
	 */
	static createGoogleTerrain(options: GoogleTerrainOptions): Promise<any> {
		return Cesium.GoogleEarthEnterpriseTerrainProvider.fromUrl(options.url, options);
	}

	/**
	 * Create arcgis terrain
	 * @param options
	 */
	static createArcgisTerrain(options: ArcGISTerrainOptions): Promise<any> {
		return Cesium.ArcGISTiledElevationTerrainProvider.fromUrl(options.url, options);
	}

	/**
	 * Create vr terrain
	 * @param options
	 */
	static createVRTerrain(options: VRTerrainOptions): Promise<any> {
		return Cesium.VRTheWorldTerrainProvider.fromUrl(options.url, options);
	}

	/**
	 * Create Terrain
	 * @param type
	 * @param options
	 */
	static createTerrain(
		type: TerrainTypes,
		options: TerrainOptions | EllipsoidTerrainOptions | GoogleTerrainOptions | ArcGISTerrainOptions | VRTerrainOptions
	): Promise<any> {
		let promise: Promise<any> = Promise.resolve(null);
		switch (type) {
			case "none":
				promise = this.createEllipsoidTerrain(options as EllipsoidTerrainOptions);
				break;
			case "xyz":
				promise = this.createUrlTerrain(options as TerrainOptions);
				break;
			case "google":
				promise = this.createGoogleTerrain(options as GoogleTerrainOptions);
				break;
			case "arcgis":
				promise = this.createArcgisTerrain(options as ArcGISTerrainOptions);
				break;
			case "vr":
				promise = this.createVRTerrain(options as VRTerrainOptions);
				break;
			default:
				break;
		}
		return promise;
	}
}
