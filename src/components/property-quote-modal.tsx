"use client";

import { cn } from "@/lib/utils";
import type React from "react";

import { useState } from "react";
import { ActionButton } from "@/components/action-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Home, X } from "lucide-react";
import { PropertyQuoteForm } from "./property-quote-form";

interface PropertyQuoteModalProps {
  className?: string;
  children?: React.ReactNode;
}

export function PropertyQuoteModal({
  className,
  children,
}: PropertyQuoteModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <ActionButton className={cn("text-lg", className)}>
            Get free quote
          </ActionButton>
        )}
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[600px] max-h-[80vh] !w-full border-0 overflow-y-auto p-0 gap-0"
      >
        <div className=" text-primary-foreground p-2 md:p-3 pb-0 md:pb-0 sticky top-0 z-10">
          <DialogHeader className="p-2 md:p-3 bg-primary rounded-2xl flex flex-row items-center justify-between">
            <div className="flex items-center gap-3 bg-primary">
              <div className="bg-primary-foreground/20 hidden md:flex p-2 rounded-lg">
                <Home className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-primary-foreground text-sm text-start bg-primary">
                  Get a cash offer in 24 hours
                </DialogTitle>
              </div>
            </div>
            <ActionButton
              variant="ghost"
              size="icon"
              className=" text-primary-foreground"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </ActionButton>
          </DialogHeader>
        </div>
        <div className="p-3 md:p-8 pt-3 h-fit">
          {/* El key={String(isOpen)} asegura que el formulario se resetee cada vez que se abre el modal */}
          <PropertyQuoteForm
            key={String(isOpen)}
            onFormSubmitSuccess={() => setIsOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
