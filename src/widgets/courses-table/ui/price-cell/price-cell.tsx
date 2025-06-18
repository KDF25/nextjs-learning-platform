import { FC } from "react";

import { formatPrice } from "@/shared/lib";

interface IPriceCellProps {
	price: number;
}

export const PriceCell: FC<IPriceCellProps> = ({ price }) => {
	return <div>{formatPrice(price)}</div>;
};
