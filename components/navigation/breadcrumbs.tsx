import { ChevronRight, Home } from "lucide-react"
import { Link, useLocation } from "react-router-dom";

export function Breadcrumbs() {
    const location = useLocation();
    const pathname = location.pathname;

    // const getBreadcrumbs = () => {
    //     const paths = pathname.split("/").filter(Boolean)
    //     const breadcrumbs = [{ label: "Home", href: "/dashboard", icon: Home }]

    //     paths.forEach((path, index) => {
    //         const href = "/" + paths.slice(0, index + 1).join("/")
    //         let label = path.charAt(0).toUpperCase() + path.slice(1)

    //         // Customize labels for specific routes
    //         if (path === "dashboard") {
    //             label = "Dashboard"
    //         } else if (path === "portfolio") {
    //             label = "Portfolio"
    //         }

    //         breadcrumbs.push({ label, href })
    //     })

    //     return breadcrumbs
    // }
    const getBreadcrumbs = () => {
        const paths = pathname.split("/").filter(Boolean);
        const breadcrumbs = [{ label: "Home", href: "/" }];

        paths.forEach((path, index) => {
            const href = "/" + paths.slice(0, index + 1).join("/");
            let label = path.charAt(0).toUpperCase() + path.slice(1);

            // Customize labels for specific routes
            if (path === "dashboard") label = "Dashboard";
            else if (path === "portfolio") label = "Portfolio";

            breadcrumbs.push({ label, href });
        });

        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs()

    if (breadcrumbs.length <= 1) {
        return null
    }

    return (
        <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
            <Home className="h-4 w-4 text-foreground" />
            {breadcrumbs.map((breadcrumb, index) => {
                const isLast = index === breadcrumbs.length - 1

                return (
                    <div key={breadcrumb.href} className="flex items-center">
                        {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}

                        {isLast ? (
                            <span className="text-foreground font-medium flex items-center">
                                {breadcrumb.label}
                            </span>
                        ) : (
                            <Link to={breadcrumb.href} className="hover:text-foreground transition-colors flex items-center">
                                {breadcrumb.label}
                            </Link>
                        )}
                    </div>
                )
            })}
        </nav>
    )
}

// import { Link, useLocation } from "react-router-dom";

// interface Breadcrumb {
//   label: string;
//   href: string;
// }

// export function Breadcrumbs() {
//   const location = useLocation();
//   const pathname = location.pathname;

//   const getBreadcrumbs = (): Breadcrumb[] => {
//     const paths = pathname.split("/").filter(Boolean);
//     const breadcrumbs: Breadcrumb[] = [{ label: "Home", href: "/" }];

//     paths.forEach((path, index) => {
//       const href = "/" + paths.slice(0, index + 1).join("/");
//       let label = path.charAt(0).toUpperCase() + path.slice(1);

//       // Customize labels for specific routes
//       if (path === "dashboard") label = "Dashboard";
//       else if (path === "portfolio") label = "Portfolio";

//       breadcrumbs.push({ label, href });
//     });

//     return breadcrumbs;
//   };

//   const breadcrumbs = getBreadcrumbs();

//   if (breadcrumbs.length <= 1) return null;

//   return (
//     <nav className="flex items-center text-sm text-gray-500 mb-4" aria-label="breadcrumb">
//       {breadcrumbs.map((breadcrumb, index) => {
//         const isLast = index === breadcrumbs.length - 1;

//         return (
//           <div key={breadcrumb.href} className="flex items-center">
//             {index > 0 && <span className="mx-1">/</span>}

//             {isLast ? (
//               <span className="text-gray-900 font-medium">{breadcrumb.label}</span>
//             ) : (
//               <Link
//                 to={breadcrumb.href}
//                 className="hover:text-gray-900 transition-colors"
//               >
//                 {breadcrumb.label}
//               </Link>
//             )}
//           </div>
//         );
//       })}
//     </nav>
//   );
// }
