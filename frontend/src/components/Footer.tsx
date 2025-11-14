import { Link } from '@tanstack/react-router';
import { SiFacebook, SiX, SiInstagram } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <img src="/assets/generated/sue-mascot-new.png" alt="Sue Mascot" className="h-10 w-10 rounded-full object-cover shadow-md" />
              <div className="flex flex-col">
                <span className="text-base font-bold leading-tight text-primary">School Uniform Exchange (SUE)</span>
                <span className="text-xs font-bold leading-tight text-[oklch(45%_0.12_15)]">secondhandschooluniforms.co.uk</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your friendly marketplace for buying and selling second-hand school uniforms across the UK.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/browse" className="text-muted-foreground transition-colors hover:text-foreground">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/seller-tips" className="text-muted-foreground transition-colors hover:text-foreground">
                  Seller Tips
                </Link>
              </li>
              <li>
                <Link to="/postage-packing" className="text-muted-foreground transition-colors hover:text-foreground">
                  Postage & Packing
                </Link>
              </li>
              <li>
                <Link to="/returns-refunds" className="text-muted-foreground transition-colors hover:text-foreground">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-muted-foreground transition-colors hover:text-foreground">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/create-listing" className="text-muted-foreground transition-colors hover:text-foreground">
                  Sell an Item
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Connect With Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Facebook">
                <SiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="X (Twitter)">
                <SiX className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Instagram">
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="mb-2 font-bold text-foreground text-base">
            School Uniform Exchange (SUE) — <span className="text-[oklch(45%_0.12_15)]">secondhandschooluniforms.co.uk</span>
          </p>
          <p className="flex items-center justify-center gap-1">
            © 2025. Built with <Heart className="h-4 w-4 fill-destructive text-destructive" /> using{' '}
            <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
