import React from "react";
import { Chip, VisuallyHidden, tv, useRadio } from "@nextui-org/react";
import { CheckIcon } from "./CheckIcon";

const radio = tv({
  slots: {
    base: "border-default hover:bg-default-200 p-4",
    content: "text-default-500",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-emerald-500 bg-emerald-400 hover:bg-emerald-500 hover:border-emerald-500",
        content: "text-primary-foreground pl-1",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      },
    },
  },
});

export const CustomRadio = (props) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useRadio({
    ...props,
  });

  const styles = radio({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="success"
        startContent={
          isSelected ? <CheckIcon className="ml-1 text-white" /> : null
        }
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};
