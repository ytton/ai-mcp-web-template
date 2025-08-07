import { memo } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <Header />

      {/* Main Content - 占据剩余空间，顶部留出header高度 */}
      <main className={`pt-header h-screen ${className}`}>
        {children}
        <Footer />
      </main>
    </div>
  );
}

export default memo(Layout);
