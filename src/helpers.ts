import type {FaunaUser} from "./fauna-types";

export function hasRole(user: FaunaUser | undefined, roles: string | string[]) {
    if (!user) return false;

    const searchRoles = typeof roles === 'string' ? [roles] : Array.from(roles);
    return (user?.roles || []).some(x => searchRoles.includes(x));
}