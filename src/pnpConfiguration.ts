import { WebPartContext } from "@microsoft/sp-webpart-base";
import { LogLevel, PnPLogging } from "@pnp/logging";
import { SPFI, SPFx, spfi } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";

export function getSP(context?: WebPartContext): SPFI {
    let _sp: SPFI = null;
    if (_sp === null && context !== null) {
        _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Info));
    }
    return _sp;
}
