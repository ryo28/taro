import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-6">
                <nav className="flex justify-center gap-8">
                    <Link
                        href="/mypage"
                        className="text-sm font-medium hover:underline"
                    >
                        マイページ
                    </Link>
                    <Link
                        href="/credit"
                        className="text-sm font-medium hover:underline"
                    >
                        クレジット
                    </Link>
                    <Link
                        href="/pets"
                        className="text-sm font-medium hover:underline"
                    >
                        ペット
                    </Link>
                </nav>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Taro. All rights reserved.
                </div>
            </div>
        </footer>
    );
}