import { treaty } from "@elysiajs/eden";

import type { Server } from "@/server/index";

const api = treaty<Server>(window.location.origin).api;

export default api;
