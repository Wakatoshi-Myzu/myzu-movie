"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface ResponsiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function ResponsiveModal({
  open,
  onOpenChange,
  children,
  className,
  title = "Media Viewer",
}: ResponsiveModalProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent
          className={cn(
            "max-h-[90dvh] overflow-hidden border-t-[3px] border-[var(--nb-shadow)]",
            className
          )}
        >
          <DrawerTitle className="sr-only">{title}</DrawerTitle>
          <div className="relative">
            <DrawerClose
              className="nb-shadow-sm absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full border-[2.5px] border-[var(--nb-shadow)] bg-background transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_var(--nb-shadow)]"
            >
              <Icon icon="mdi:close" className="size-4" />
            </DrawerClose>
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-4xl gap-0 border-[3px] border-[var(--nb-shadow)] bg-background p-0 sm:max-w-4xl",
          className
        )}
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogClose
          className="nb-shadow-sm absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full border-[2.5px] border-[var(--nb-shadow)] bg-background transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_var(--nb-shadow)]"
        >
          <Icon icon="mdi:close" className="size-4" />
        </DialogClose>
        {children}
      </DialogContent>
    </Dialog>
  );
}
