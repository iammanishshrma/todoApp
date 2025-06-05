import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router";

const PageHeader = ({
    title,
    ctaButton,
    showBackButton = false,
}: PageHeaderProps) => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between mb-4">
            <div className="flex items-center gap-2 mb-4">
                {showBackButton && (
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 cursor-pointer"
                    >
                        <ArrowBigLeft />
                    </button>
                )}
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            {ctaButton && ctaButton}
        </div>
    );
};

export default PageHeader;
