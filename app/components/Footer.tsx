import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <div className="footer">
      <Separator />
      <p className="pt-2 text-center text-sm font-light">not copyright 2024</p>
      <a
        href="https://github.com/Croixed/croixblog"
        className="block w-full pb-2 pt-0 text-center text-primary underline"
      >
        Source on github
      </a>
    </div>
  );
}
