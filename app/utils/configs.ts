export interface Configs {
  API_KEY: string;
  BASE_URL?: string;
}

let configs: Configs = {
  API_KEY: process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC || "30a7dc74-0886-4c5d-bc18-dc04e6280a96",
};

export function getConfig(name: keyof Configs) {
  return configs[name] || "";
}