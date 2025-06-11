import z from "zod";

import { formSchema } from "../helpers";

export type ICourseForm = z.infer<typeof formSchema>;
