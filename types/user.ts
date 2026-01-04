import { authClient } from "@/lib/auth-client";
// User型をauthClientのセッション情報から推論してエクスポート
export type User = typeof authClient.$Infer.Session["user"];
