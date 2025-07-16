import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon, X } from "lucide-react";

export interface RichDropdownMenuSearchProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  autoComplete?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  clearSearch?: (e: React.MouseEvent) => void;
}

export const RichDropdownMenuSearch = ({
  className,
  value,
  placeholder,
  onChange,
  disabled,
  autoComplete,
  onFocus,
  onBlur,
  onKeyDown,
  clearSearch,
}: RichDropdownMenuSearchProps) => {
  return (
    <div className={cn("flex relative items-center border p-0", className)}>
      <Input
        className=" w-full rounded-none pr-8 pl-4 outline-none border-none focus-visible:ring-gray-400 focus-visible:ring-[1px] "
        placeholder={placeholder ?? "Placeholder"}
        {...(value != null && { value })}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        autoComplete={autoComplete}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      {value && clearSearch ? (
        <X
          className="size-4 cursor-pointer absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
          onClick={clearSearch}
        />
      ) : (
        <SearchIcon className="size-4 absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" />
      )}
    </div>
  );
};
