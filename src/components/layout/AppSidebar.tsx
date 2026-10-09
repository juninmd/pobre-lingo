import { useEffect } from "react";
import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { NavMenu } from "./NavMenu";

/**
 * Persistent column from md up. Below md the `none` mode would skip the
 * Sheet branch and pin a fixed-width column, so mobile uses `offcanvas`.
 */
export function AppSidebar() {
	const { isMobile, setOpenMobile } = useSidebar();

	// A drawer left open must not reappear when a rotation crosses the breakpoint back.
	useEffect(() => {
		if (!isMobile) setOpenMobile(false);
	}, [isMobile, setOpenMobile]);

	return (
		<Sidebar
			collapsible={isMobile ? "offcanvas" : "none"}
			variant="sidebar"
			side="left"
			role="complementary"
			aria-label="Barra lateral"
			// CSS-hidden below md too, so there is no flash before isMobile resolves.
			className="hidden md:flex border-r border-border/40"
		>
			<NavMenu />
		</Sidebar>
	);
}
