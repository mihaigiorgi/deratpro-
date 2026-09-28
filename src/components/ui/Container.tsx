import type { ElementType, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

/** Aceeași lățime maximă și aceleași margini laterale pe toată pagina. */
export function Container({ as: Component = "div", className, ...props }: ContainerProps) {
  return <Component className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)} {...props} />;
}