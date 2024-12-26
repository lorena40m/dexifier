import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CheckIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { ScrollArea } from "./scroll-area";

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 text-white bg-card hover:bg-card/80",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string;
    /** The unique value associated with the option. */
    value: string;
    /** Optional icon component to display alongside the option. */
    icon?: string;
    /** The real value associated with the option. */
    realValue?: any;
  }[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange?: (value: string[]) => void;

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the real values associated with new selected values.
   */
  onRealValueChange?: (realValue: any[]) => void;

  /** Config of the component */
  config?: {
    showSelectAll?: boolean;
    showSearch?: boolean;
    showContent?: boolean;
  }

  /** The title of the select box */
  title?: string;

  /** The unit of options */
  unit?: string;

  /** The default selected values when the component mounts. */
  defaultValue?: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      maxCount = 3,
      modalPopover = true,
      asChild = false,
      className,
      config = {
        showContent: true,
        showSearch: true,
        showSelectAll: true,
      },
      unit = '',
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onValueChange && onValueChange(newSelectedValues);
      if (props.onRealValueChange) {
        const newSelectedRealValues = options.filter((option) => newSelectedValues.includes(option.value)).map((option) => option.realValue);
        props.onRealValueChange(newSelectedRealValues);
      }
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange && onValueChange([]);
      if (props.onRealValueChange) {
        props.onRealValueChange([]);
      }
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        setSelectedValues(allValues);
        onValueChange && onValueChange(allValues);
        const allRealValues = options.map((option) => option.realValue);
        if (props.onRealValueChange) {
          props.onRealValueChange(allRealValues);
        }
      }
    };

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              "flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between [&_svg]:pointer-events-auto",
              className
            )}
          >
            {config.showContent ?
              <div className="w-full flex justify-between items-center space-x-1">
                <div className="flex space-x-1 overflow-hidden">
                  <div className="flex -space-x-5">
                    {selectedValues && selectedValues.slice(0, maxCount).map(value => {
                      const option = options.find((option) => option.value === value);
                      return option?.icon && (
                        <Avatar className="size-7">
                          <AvatarImage src={option.icon} />
                          <AvatarFallback>{option.label}</AvatarFallback>
                        </Avatar>
                      )
                    })}
                  </div>
                  <span className="flex items-center text-base">{selectedValues.length ? `${selectedValues.length}/${options.length} ${unit}${selectedValues.length > 1 ? 's' : ''}` : placeholder}</span>
                </div>
                <span>{isPopoverOpen ? "▲" : "▼"}</span>
              </div>
              :
              <span className="flex-1 place-content-center">
                {placeholder}
              </span>
            }
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("border border-gray-300 p-0",
            config.showSearch ? "w-[350px]" : "w-[255px]"
          )}
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command className="bg-primary-dark">
            <div className="flex justify-between items-center py-2 px-4">
              {props.title && <span className="text-gray-500">{props.title}</span>}
              {config.showSelectAll &&
                <div
                  key="all"
                  onClick={toggleAll}
                  className="cursor-pointer"
                >
                  <span className="text-white capitalize hover:underline text-sm">{`${selectedValues.length === options.length ? 'de' : ''}select All`}</span>
                </div>}
            </div>
            <Separator />
            {config.showSearch &&
              <CommandInput
                placeholder={`Search ${unit}...`}
                className="p-0 h-10 text-white text-base border-none"
              />}

            <CommandList className="max-h-60 p-1 overflow-y-scroll">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup className="gap-2">
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      className={cn("cursor-pointer flex rounded-lg gap-1 data-[selected='true']:bg-black/20",
                        config.showSearch ? "justify-between" : "flex-row-reverse justify-end"
                      )}
                    >
                      <div className="flex items-center text-white text-base gap-2">
                        {option.icon && (
                          <Avatar className="size-6">
                            <AvatarImage src={option.icon} />
                            <AvatarFallback>{option.label}</AvatarFallback>
                          </Avatar>
                        )}
                        <span>{option.label}</span>
                      </div>
                      <div
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-sm",
                          isSelected
                            ? "bg-blue-600 text-primary-foreground"
                            : "bg-white [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className="h-4 w-4 text-white" strokeWidth={5} />
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
