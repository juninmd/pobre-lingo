import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { LucideIcon } from "lucide-react";
import {
	Bell,
	BellOff,
	BookOpen,
	Brain,
	CheckCheck,
	Flame,
	Settings2,
	Target,
	Trophy,
	X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications } from "@/contexts/NotificationContext";
import {
	isSafeInternalHref,
	type NotificationCategory,
} from "@/lib/notifications";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<
	NotificationCategory,
	{ icon: LucideIcon; className: string }
> = {
	streak: { icon: Flame, className: "text-orange-500 bg-orange-500/10" },
	review: { icon: Brain, className: "text-amber-500 bg-amber-500/10" },
	quest: { icon: Target, className: "text-red-500 bg-red-500/10" },
	achievement: {
		icon: Trophy,
		className: "text-emerald-500 bg-emerald-500/10",
	},
	content: { icon: BookOpen, className: "text-blue-500 bg-blue-500/10" },
};

export function NotificationCenter() {
	const {
		notifications,
		unreadCount,
		markRead,
		markAllRead,
		remove,
		clearAll,
		permission,
		prefs,
		enableBrowserNotifications,
	} = useNotifications();
	const [open, setOpen] = useState(false);

	const badgeCount = unreadCount > 99 ? "99+" : String(unreadCount);

	const showPermissionPrompt =
		permission === "default" ||
		(permission === "granted" && !prefs.browserEnabled);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					// Same figure as the badge, no parentheses: both are needed for the visible text to match the name (WCAG 2.5.3).
					aria-label={
						unreadCount > 0
							? `Notificações, ${badgeCount} ${unreadCount === 1 ? "não lida" : "não lidas"}`
							: "Notificações"
					}
					className="relative h-11 w-11 md:h-9 md:w-9 text-muted-foreground hover:text-foreground transition-all hover:bg-muted/50 active:scale-95"
				>
					<Bell className={cn("h-5 w-5", unreadCount > 0 && "text-primary")} />
					{unreadCount > 0 && (
						<span
							aria-hidden="true"
							className="absolute -top-0.5 -right-0.5 min-w-[1.05rem] h-[1.05rem] px-1 rounded-full bg-red-600 text-[11px] font-bold text-white flex items-center justify-center shadow-sm ring-2 ring-background tabular-nums"
						>
							{badgeCount}
						</span>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent
				align="end"
				sideOffset={8}
				className="w-[min(24rem,calc(100vw-1.5rem))] p-0 overflow-hidden"
			>
				<div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
					<div className="flex items-center gap-2">
						<Bell className="h-4 w-4 text-primary" />
						<span className="font-semibold text-sm">Notificações</span>
						{unreadCount > 0 && (
							<span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
								{unreadCount} nova{unreadCount === 1 ? "" : "s"}
							</span>
						)}
					</div>
					<div className="flex items-center gap-0.5">
						{unreadCount > 0 && (
							<Button
								variant="ghost"
								size="icon"
								className="h-7 w-7 text-muted-foreground hover:text-foreground"
								title="Marcar todas como lidas"
								onClick={markAllRead}
							>
								<CheckCheck className="h-3.5 w-3.5" />
							</Button>
						)}
						<Button
							asChild
							variant="ghost"
							size="icon"
							className="h-7 w-7 text-muted-foreground hover:text-foreground"
							title="Preferências"
						>
							<Link to="/settings" onClick={() => setOpen(false)}>
								<Settings2 className="h-3.5 w-3.5" />
							</Link>
						</Button>
					</div>
				</div>

				{showPermissionPrompt && (
					<div className="px-4 py-3 border-b bg-primary/5 flex items-start gap-3">
						<BellOff className="h-4 w-4 text-primary mt-0.5 shrink-0" />
						<div className="flex-1 min-w-0">
							<p className="text-xs text-foreground/80 leading-relaxed">
								Ative os avisos do navegador para não perder sua ofensiva nem as
								revisões do dia.
							</p>
							<Button
								size="sm"
								variant="gamified"
								className="mt-2 h-7 text-xs font-bold"
								onClick={() => enableBrowserNotifications()}
							>
								Ativar avisos
							</Button>
						</div>
					</div>
				)}

				{notifications.length === 0 ? (
					<div className="px-6 py-10 text-center space-y-2">
						<div className="mx-auto w-11 h-11 rounded-2xl bg-muted/60 flex items-center justify-center">
							<Bell className="h-5 w-5 text-muted-foreground/60" />
						</div>
						<p className="text-sm font-medium text-foreground/80">
							Tudo em dia por aqui
						</p>
						<p className="text-xs text-muted-foreground">
							Avisos de ofensiva, revisões e conquistas aparecem nesta caixa.
						</p>
					</div>
				) : (
					<>
						<ScrollArea className="max-h-[22rem]">
							<ul className="divide-y divide-border/60">
								{notifications.map((item) => {
									const { icon: Icon, className } =
										CATEGORY_STYLES[item.category];
									const content = (
										<div className="flex gap-3 px-4 py-3">
											<div
												className={cn(
													"h-8 w-8 rounded-xl flex items-center justify-center shrink-0",
													className,
												)}
											>
												<Icon className="h-4 w-4" />
											</div>
											<div className="flex-1 min-w-0 space-y-0.5">
												<p
													className={cn(
														"text-sm leading-snug",
														item.read
															? "text-muted-foreground"
															: "font-semibold text-foreground",
													)}
												>
													{item.title}
												</p>
												<p className="text-xs text-muted-foreground leading-relaxed">
													{item.body}
												</p>
												<p className="text-[11px] uppercase tracking-wider text-muted-foreground/60 pt-0.5">
													{formatDistanceToNow(new Date(item.createdAt), {
														addSuffix: true,
														locale: ptBR,
													})}
												</p>
											</div>
											{!item.read && (
												<span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
											)}
										</div>
									);

									return (
										<li
											key={item.id}
											className={cn(
												"relative group transition-colors",
												item.read ? "bg-transparent" : "bg-primary/[0.03]",
												"hover:bg-muted/50",
											)}
										>
											{isSafeInternalHref(item.href) ? (
												<Link
													to={item.href}
													onClick={() => {
														markRead(item.id);
														setOpen(false);
													}}
													className="block"
												>
													{content}
												</Link>
											) : (
												<button
													type="button"
													onClick={() => markRead(item.id)}
													className="block w-full text-left"
												>
													{content}
												</button>
											)}
											<button
												type="button"
												aria-label="Remover notificação"
												onClick={(e) => {
													e.stopPropagation();
													remove(item.id);
												}}
												className="absolute top-2 right-2 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 focus:opacity-100 transition-opacity text-muted-foreground hover:text-foreground p-1"
											>
												<X className="h-3 w-3" />
											</button>
										</li>
									);
								})}
							</ul>
						</ScrollArea>

						<div className="px-4 py-2 border-t bg-muted/20">
							<button
								type="button"
								onClick={clearAll}
								className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
							>
								Limpar tudo
							</button>
						</div>
					</>
				)}
			</PopoverContent>
		</Popover>
	);
}
