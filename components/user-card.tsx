import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { User } from "@/types/user";

export function UserCard({ user }: { user: User }) {
	return (
		<Card className="w-80 h-48 max-w-sm mx-auto">
			<CardHeader>
				<div className="flex items-center gap-4">
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					</Avatar>
					<div>
						<h1 className="text-xl font-semibold">{user.name}</h1>
						<p className="text-sm text-muted-foreground break-all max-w-40">
							{user.email}
						</p>
					</div>
				</div>
			</CardHeader>
		</Card>
	);
}
