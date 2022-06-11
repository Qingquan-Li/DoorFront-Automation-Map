import { debounce } from "lodash";
import { generateInfo } from "./GoogleMap/utils/streetViewTool";

/* -------------------------------------------------------------------------- */
/*                             Debounced Function                             */
/* -------------------------------------------------------------------------- */
export const debouncedStreetViewImageChange = debounce(
  (result: ReturnType<typeof generateInfo>, func: any) => {
    if (result.position && result.pov && result.pano && result.zoom) {
      func({ pov: result.pov, zoom: result.zoom });
    }
  },
  100
);
