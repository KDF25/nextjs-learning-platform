import z from "zod";

import { formSchemaCourseCreate, formSchemaCourseCustom } from "../helpers";

export type ICourseCreateForm = z.infer<typeof formSchemaCourseCreate>;

export type ICourseCustomForm = z.infer<typeof formSchemaCourseCustom>;
