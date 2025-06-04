type Option = {
    value: string;
    label: string;
};
type SelectProps = {
    name?: string;
    placeholder?: string;
    options: Option[];
    value?: string;
    className?: string;
    onChange?: (value: string) => void;
};
