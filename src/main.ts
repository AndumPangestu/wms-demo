import { web } from "./application/web";
import { logger } from "./application/logging";
import { APP_PORT } from "./application/config";
import startWatcher from "./application/watcher";

web.listen(APP_PORT, () => {
    logger.info(`🚀 Server running at http://localhost:${APP_PORT}`);
    startWatcher();
});

