"use client";

import {
  Content,
  Item,
  Portal,
  Root,
  Separator,
  Trigger,
} from "@radix-ui/react-dropdown-menu";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { cn } from "./cn";

const DropdownMenu = Root;
const DropdownMenuTrigger = Trigger;
const DropdownMenuContentPrimitive = Content;
const DropdownMenuItemPrimitive = Item;
const DropdownMenuSeparatorPrimitive = Separator;
const DropdownMenuPortal = Portal;

const DropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownMenuContentPrimitive>,
  ComponentPropsWithoutRef<typeof DropdownMenuContentPrimitive>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPortal>
    <DropdownMenuContentPrimitive
      className={cn(
        "z-50 min-w-36 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 animate-in",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </DropdownMenuPortal>
));
DropdownMenuContent.displayName = DropdownMenuContentPrimitive.displayName;

type DropdownMenuItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuItemPrimitive
> & {
  inset?: boolean;
};

const DropdownMenuItem = forwardRef<
  ElementRef<typeof DropdownMenuItemPrimitive>,
  DropdownMenuItemProps
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuItemPrimitive
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    ref={ref}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuItemPrimitive.displayName;

const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof DropdownMenuSeparatorPrimitive>,
  ComponentPropsWithoutRef<typeof DropdownMenuSeparatorPrimitive>
>(({ className, ...props }, ref) => (
  <DropdownMenuSeparatorPrimitive
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    ref={ref}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuSeparatorPrimitive.displayName;

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
};
