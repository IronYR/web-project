import { CheckIcon, ChevronsUpDown } from "lucide-react";
import React, { forwardRef, useCallback } from "react";
import { getCountryCallingCode } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { cn } from "../lib/utils";

const InputComponent = forwardRef(({ className, ...props }, ref) => (
  <Input
    className={cn("rounded-e-lg rounded-s-none", className)}
    {...props}
    ref={ref}
  />
));

const CountrySelect = ({ disabled }) => {
    const country = "PK"; // Fixed country as Pakistan
    const countryCode = getCountryCallingCode(
        country
      )
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant={"outline"}
            className={cn("flex gap-1 rounded-e-none rounded-s-lg px-3")}
            disabled={disabled}
          >
            <FlagComponent country={country} countryName={country} />
            <ChevronsUpDown
              className={cn(
                "-mr-2 h-4 w-4 opacity-50",
                disabled ? "hidden" : "opacity-100"
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                <CommandItem className="gap-2">
                  <FlagComponent country={country} countryName={country} />
                  <span className="flex-1 text-sm">Pakistan</span>
                  <span className="text-foreground/50 text-sm">{`+${getCountryCallingCode(
                    country
                  )}`}</span>
                  <CheckIcon className="ml-auto h-4 w-4 opacity-100" />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };
  

const FlagComponent = ({ country, countryName }) => {
  const Flag = flags[country];

  return (
    <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

const PhoneInputComponent = React.forwardRef(({ setPhoneNum,phoneNo,className, onChange, ...props }, ref) => {
    const [countryCode, setCountryCode] = React.useState("+92"); // State to store country code
    
    const handleChange = (value) => {
        const processedValue = value ? value.replace(/\+/g, '') : '';

        if (processedValue.length <= 14) {
          setPhoneNum(processedValue);
          if (onChange) onChange(processedValue);
        }
      };
      
    
    // Callback to receive country code from CountrySelect
    const handleCountryChange = useCallback((code) => {
      setCountryCode(code);
    }, []);
  
    return (
      <PhoneInput
        ref={ref}
        className={cn("flex", className)}
        flagComponent={(props) => <FlagComponent {...props} country={countryCode} />} 
        countrySelectComponent={(props) => <CountrySelect {...props} onChange={handleCountryChange} />}
        inputComponent={InputComponent}
        onChange={handleChange}
        placeholder={phoneNo}
        maxLength={12}
        {...props}
      />
    );
  });
  

export { PhoneInputComponent as PhoneInput };
