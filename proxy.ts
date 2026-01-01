import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

//見せていいページを許可制にするのが一般的です
const publicRoutes = ["/login","register","/"];

export async function proxy(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);
    //現在のパスが公開ルートかどうかを確認
    const isPrivateRoute = !publicRoutes.includes(request.nextUrl.pathname);

    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
    if (!sessionCookie && isPrivateRoute) {// ログインしていないでかつプライベートルートにアクセスした場合は /login にリダイレクト
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    /*
    -/api で始まるパスは除外
    -_next/static や _next/image などの Next.js 固有のパスも除外
    -favicon.ico や画像ファイルも除外
    -llms.txt も除外
    */
   
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|llms.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)"],
};