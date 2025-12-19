import {useVariantName} from "../hooks/useVariant.ts";
import type {ReactNode} from "react";

const RequireVariant = (
    {children, variant,}: { children: ReactNode, variant: string }) =>
    variant === useVariantName() ? children : null;

export default RequireVariant;