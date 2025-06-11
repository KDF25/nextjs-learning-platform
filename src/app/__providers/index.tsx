import { ReactNode } from "react";

import { withProviders } from "./providers";
import { ToastProvider } from "./withToast";

interface ProvidersProps {
	children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
	const ProviderApp = withProviders(() => (
		<>
			<ToastProvider />
			{children}
		</>
	));
	return <ProviderApp />;
};

export default Providers;
