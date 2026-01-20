'use client';

import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, PawPrint, User } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  //authClient からセッション情報を取得、authClient は better-auth を使用して構築されています
  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className="flex items-center group">
          <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
            Logo
          </span>
        </Link>

        {/* ナビゲーション */}
        <nav className="flex items-center gap-3">
          <Button variant="outline" size="default" asChild>
            <Link href="/pets">
              <PawPrint className="h-4 w-4" />
              ペット一覧
            </Link>
          </Button>
          {/*ログイン状態のときに表示 */}
          {session?.user &&
            <>
              <Button variant="default" size="default" asChild>
                <Link href="/mypage">
                  <User className="h-4 w-4" />
                  マイページ
                </Link>
              </Button>

              <Button variant="destructive" size="default" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                ログアウト
              </Button>
            </>
          }

        </nav>
      </div>
    </header >
  );
}