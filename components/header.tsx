import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className="flex items-center group">
          <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
            Logo
          </span>
        </Link>

        {/* マイページへのリンク */}
        <nav>
          <Link 
            href="/mypage" 
            className="px-6 py-2.5 rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:to-purple-600 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            マイページ
          </Link>
        </nav>
      </div>
    </header>
  );
}