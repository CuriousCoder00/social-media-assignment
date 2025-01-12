"use client";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

import { cva, VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";

const spinnerColors = {
  black: "black",
  dark: "slate",
  light: "white",
  blue: "blue",
  red: "red",
  green: "green",
  yellow: "yellow",
  cyan: "cyan",
  gray: "gray",
  emerald: "emerald",
  rose: "rose",
  amber: "amber",
  orange: "orange",
  pink: "pink",
  purple: "purple",
  indigo: "indigo",
  teal: "teal",
  lime: "lime",
  sky: "sky",
};

type SpinnerColors = keyof typeof spinnerColors;

const colorClasses = {
  blue: " text-blue-600",
  red: " text-red-600",
  green: " text-green-600",
  yellow: " text-yellow-600",
  cyan: " text-cyan-600",
  gray: " text-gray-600",
  emerald: " text-emerald-600",
  rose: " text-rose-600",
  amber: " text-amber-600",
  orange: " text-orange-600",
  pink: " text-pink-600",
  purple: " text-purple-600",
  indigo: " text-indigo-600",
  teal: " text-teal-600",
  lime: " text-lime-600",
  sky: " text-sky-600",
  black: " text-black dark:text-slate-400",
  dark: " dark:text-slate-300 text-slate-700",
  light: " text-slate-900 dark:text-white",
};

const spinnerVariants = cva(
  ["inline-block", "rounded-[100%]", "animate-spin"],
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-5 w-5",
        md: "h-7 w-7",
        lg: "h-9 w-9",
        xl: "h-11 w-11",
      },
      color: Object.keys(spinnerColors).reduce(
        (acc, key) => ({
          ...acc,
          [key]: colorClasses[key as SpinnerColors],
        }),
        {} as Record<SpinnerColors, string>
      ),
    },
    compoundVariants: (Object.keys(spinnerColors) as SpinnerColors[]).flatMap(
      (scheme) => [
        {
          color: scheme,
        },
      ]
    ),
    defaultVariants: {
      size: "xl",
      color: "blue",
    },
  }
);

type SpinnerProps = VariantProps<typeof spinnerVariants> & {
  color?: SpinnerColors;
  size?: string;
  className?: string;
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, color, size }) => (
    <LoaderCircle
      className={cn(className, spinnerVariants({ size, className, color }))}
    />
  )
);

Spinner.displayName = "Spinner";
