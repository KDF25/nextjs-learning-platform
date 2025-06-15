import axios from "axios";

import { IAddAttachment } from "../types";

export const AttachmentService = {
	async add(data: IAddAttachment) {
		return await axios.post(`/api/courses/${data.id}/attachments`, data);
	},

	async delete(courseId: string, attachmentId: string) {
		return await axios.delete(
			`/api/courses/${courseId}/attachments/${attachmentId}`
		);
	}
};
