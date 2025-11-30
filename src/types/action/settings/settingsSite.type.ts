export interface PublicSettingType {
	config: string;
	values: any[]
}

export interface PublicSettingsColorsType {
	id: number;
	key: string;
	value?: string;
	created_at: string;
	updated_at: string;
}

export interface PublicSettingsMenusType {
	id: number;
	name: string;
	title: string;
	path: string;
	link: string;
	created_at: string;
	updated_at: string;
}