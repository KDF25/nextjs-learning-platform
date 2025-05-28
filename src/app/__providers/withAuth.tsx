import { ClerkProvider } from "@clerk/nextjs";
import { FC } from "react";

export const withAuth = (Component: FC): FC => {
	const WrappedComponent: FC = () => (
		<ClerkProvider>
			<Component />
		</ClerkProvider>
	);

	WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name || "Component"})`;

	return WrappedComponent;
};
