import { Client } from "@hiveio/dhive";

const HIVE_API = "https://api.hive.blog";
const HIVEKINGS_API = "https://api.hivekings.com";
const ANYX_API = "https://anyx.io";
const OPENHIVE_API = "https://api.openhive.network";

const APIS = [HIVE_API, HIVEKINGS_API, ANYX_API, OPENHIVE_API];

export const hive = new Client(APIS);
