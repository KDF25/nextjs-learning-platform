import { useEffect, useState } from "react";

export const useMounted = () => {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	useEffect(() => setIsMounted(true), []);
	return { isMounted };
};
