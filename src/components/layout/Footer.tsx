import { memo } from "react";
import Icon from "@/components/ui/icon";

function Footer() {
  return (
    <footer className="bg-muted/30 mt-auto h-footer border-t">
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon icon="lucide:copyright" size={16} />
            <span>2024 AI MCP Web Template. All rights reserved.</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Icon icon="lucide:github" size={16} />
              GitHub
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Icon icon="lucide:mail" size={16} />
              Contact
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Icon icon="lucide:help-circle" size={16} />
              Help
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
