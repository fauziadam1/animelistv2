import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
      <form>
        <div className="border flex items-center rounded-xl w-150">
          <Select defaultValue="all">
            <SelectTrigger className="outline-none border-none rounded-none">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="author">Author</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
              <input type="text" placeholder="Search.." className="border-l w-full h-9 px-5 text-sm placeholder:text-sm outline-0" />
              <Search className="-translate-x-3 text-gray-500"/>
        </div>
      </form>
  );
}
