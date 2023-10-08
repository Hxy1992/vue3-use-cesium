import { ImageryTypes } from "./map";

export type ImageryItemTypes = {
	label: string;
	type: ImageryTypes;
	url?: string;
	backgroundImage?: string;
};
export type ImageryListTypes = ImageryItemTypes[];
