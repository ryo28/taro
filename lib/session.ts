//ブラウザ側で走らせたくない処理なので、server-onlyをインポート
import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const verifySession = async () => {
	// サーバーコンポーネント内でセッション情報を取得
	const session = await auth.api.getSession({
		// リクエストヘッダーを渡す　headers関数は現在のリクエストのヘッダーを取得するために使用されます
		//リクエストヘッダーとは、クライアントからサーバーに送信される追加情報のことです
		headers: await headers(),
	});
	if (!session) {
		// セッションが存在しない場合、ログインページにリダイレクト
		redirect("/login");
	}
	// セッションが存在する場合、そのセッションを返す
	return session;
};
