import {useCurrentUser} from '../hooks/useEndpoints.ts';
import {hasRole} from "../helpers.ts";
import type {ReactNode} from "react";

const RequireRole = ({children, roles,}: { children: ReactNode, roles: string | string[] }) => {
    const {data: user} = useCurrentUser();
    return hasRole(user, roles) ? children : null;
};

export default RequireRole;
