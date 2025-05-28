import { ReactNode } from "react";

import { withProviders } from "./providers";

interface ProvidersProps {
	children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
	const ProviderApp = withProviders(() => <>{children}</>);
	return <ProviderApp />;
};

export default Providers;
