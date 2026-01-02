import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"
import Image from "next/image"
import coverImage from"./login-form-cover.jpg"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">ようこそ</h1>
                <p className="text-muted-foreground text-balance">
                  ゲストとしてログインしてください
                </p>
              </div>
              <Field>
                <Button type="submit" className="w-full">ゲストでログイン</Button>
              </Field>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src={coverImage}
              alt="Login form cover"
              placeholder="blur"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        続行することで、<a href="#">利用規約</a>と<a href="#">プライバシーポリシー</a>に同意したものとみなされます。
      </FieldDescription>
    </div>
  )
}
