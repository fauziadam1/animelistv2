import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HeaderUser({
  user,
}: {
  user: {
    id: string;
    name: string;
    username: string;
    image: string;
  };
}) {
  return (
    <div className="flex items-center justify-center gap-10 py-4 border-b">
      <Avatar>
        <AvatarImage src="" alt="" className="grayscale" />
        <AvatarFallback>
          {user.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
