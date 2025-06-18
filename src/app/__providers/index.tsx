import { ReactNode } from "react";

import { withProviders } from "./providers";
import { ConfettiProvider } from "./withConfetti";
import { ToastProvider } from "./withToast";

interface ProvidersProps {
	children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
	const ProviderApp = withProviders(() => (
		<>
			<ConfettiProvider />
			<ToastProvider />
			{children}
		</>
	));
	return <ProviderApp />;
};

export default Providers;
