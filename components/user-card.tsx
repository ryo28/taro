import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { User } from "@/types/user";

export function UserCard({ user }: { user: User }) {
	return (
		<Card className="max-w-sm mx-auto">
			<CardHeader>
				<div className="flex flex-col items-center gap-4 p-6">
					<Avatar className="w-16 h-16 border">
						<AvatarImage src={`https://api.dicebear.com/7.x/micah/svg?seed=${user.id}`} alt={user.name} />
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
