import { usePage } from "@inertiajs/react";
import {
    IconLayout2,
    IconTable,
    IconUserBolt,
    IconUserShield,
    IconUsers
} from "@tabler/icons-react";
import hasAnyPermission from "./Permissions";

export default function Menu() {
    // define use page
    const { url } = usePage();

    // define menu navigations
    const menuNavigation = [
        {
            title: "Overview",
            permissions: hasAnyPermission(["dashboard-access"]),
            details: [
                {
                    title: "Dashboard",
                    href: "/apps/dashboard",
                    active: url.startsWith("/apps/dashboard") ? true : false,
                    icon: <IconLayout2 size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["dashboard-access"]),
                },
            ],
        },
        {
            title: "User Management",
            permissions:
                hasAnyPermission(["permissions-access"]) ||
                hasAnyPermission(["roles-access"]) ||
                hasAnyPermission(["users-access"]),
            details: [
                {
                    title: "Pengguna",
                    icon: <IconUsers size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["users-access"]),
                    subdetails: [
                        {
                            title: "Data Pengguna",
                            href: "/apps/users",
                            icon: <IconTable size={20} strokeWidth={1.5} />,
                            active: url === "/apps/users" ? true : false,
                            permissions: hasAnyPermission(["users-data"]),
                        },
                        {
                            title: "Hak Akses",
                            href: "/apps/permissions",
                            active: url.startsWith("/apps/permissions")
                                ? true
                                : false,
                            icon: <IconUserBolt size={20} strokeWidth={1.5} />,
                            permissions: hasAnyPermission([
                                "permissions-access",
                            ]),
                        },
                        {
                            title: "Akses Group",
                            href: "/apps/roles",
                            active: url.startsWith("/apps/roles")
                                ? true
                                : false,
                            icon: (
                                <IconUserShield size={20} strokeWidth={1.5} />
                            ),
                            permissions: hasAnyPermission(["roles-access"]),
                        },
                    ],
                },

                {
                    title: "Members",
                    icon: <IconUsers size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["users-access"]),
                    subdetails: [
                        {
                            title: "Data Sekolah Member",
                            href: "/apps/schools",
                            icon: <IconTable size={20} strokeWidth={1.5} />,
                            active: url === "/apps/schools" ? true : false,
                            permissions: hasAnyPermission(["schools-data"]),
                        },
                    ],
                },
            ],
        },
    ];

    return menuNavigation;
}
