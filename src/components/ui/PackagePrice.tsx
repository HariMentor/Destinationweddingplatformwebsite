import { useUserCurrency } from "@/lib/hooks/useUserCurrency";

interface PackagePriceProps {
    price?: {
        amount: number;
        currency: string;
    };
    size?: string;
    inline?: boolean;
}

export default function PackagePrice({ price, size = "2xl", inline = false }: PackagePriceProps) {
    const sourceCurrency = price?.currency;
    const amount = price?.amount;

    const { convertedPrice, currency } = useUserCurrency(sourceCurrency, amount);
    if (!convertedPrice || !currency) return <span>—</span>;

    // Round logic from user or standard? User code had: Math.floor(convertedPrice * 2) / 2
    // But also used `maximumFractionDigits: 0`. 
    // I'll stick to user logic but maybe improve the rounding if needed, for now just pass to formatter.
    const roundedPrice = Math.floor(convertedPrice * 2) / 2;

    return (
        <span className={`${inline ? "inline-block" : "block"} text-${size} font-semibold`} style={{ fontFamily: "Volkhov, serif" }}>
            {new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: currency,
                currencyDisplay: "narrowSymbol",
                maximumFractionDigits: 0,
            }).format(roundedPrice)}
        </span>
    );
}
