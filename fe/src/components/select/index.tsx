import {
    Select as SelectRoot,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Select = ({
    options,
    placeholder,
    className,
    name,
    value,
    onChange,
}: SelectProps) => {
    return (
        <SelectRoot name={name} value={value} onValueChange={onChange}>
            <SelectTrigger className={`w-[180px] ${className}`}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
};

export default Select;
