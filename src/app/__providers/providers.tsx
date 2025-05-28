import compose from "compose-function";

import { withAuth } from "./withAuth";

export const withProviders = compose(withAuth);
