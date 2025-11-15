import { Link } from '@tanstack/react-router';
import { Search, ShoppingBag, MessageSquare, Shield, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Prominent blue banner at the top */}
      <div className="bg-[oklch(35%_0.08_250)] py-4 text-center shadow-md">
        <div className="container">
          <p className="text-sm font-bold text-white md:text-base">
            🎓 This service is available for all UK schools including leading independent and State-sector schools, for boys and girls.
          </p>
        </div>
      </div>

      {/* Prominent red bar about seller fees */}
      <div className="bg-[oklch(45%_0.12_15)] py-4 text-center shadow-md">
        <div className="container">
          <p className="text-sm font-bold text-white md:text-base">
            💰 No upfront fees! The small administration fee and commission are deducted from sale proceeds. The seller is responsible for postage/ delivery to the buyer.
          </p>
        </div>
      </div>

      <section
        className="relative flex min-h-[500px] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/homepage-diverse-children.dim_1200x400.jpg)' }}
      >
        {/* Very light overlay to maintain readability while showing background */}
        <div className="absolute inset-0 bg-white/10" />
        <div className="container relative z-10">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="text-white">
              <h1 className="mb-4 text-4xl font-bold md:text-6xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_6px_rgb(0_0_0_/_80%)]">
                Welcome to School Uniform Exchange (SUE)
              </h1>
              <p className="mb-6 text-lg md:text-xl font-semibold drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_5px_rgb(0_0_0_/_75%)]">
                The UK's trusted marketplace for second-hand school uniforms — powered by <span className="font-bold text-[oklch(65%_0.12_15)]">secondhandschooluniforms.co.uk</span>
              </p>
              <div className="mb-8 flex items-start gap-3">
                <img 
                  src="/assets/generated/sue-mascot-new.png" 
                  alt="Sue - Your friendly guide" 
                  className="h-20 w-20 flex-shrink-0 rounded-full object-cover drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]"
                />
                <p className="text-base md:text-lg drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_5px_rgb(0_0_0_/_75%)]">
                  Hi! I'm Sue, and I'm here to help you sell outgrown school uniforms and save money on good-quality second-hand uniform items for your children.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/create-listing">
                  <button className="bg-burgundy text-white px-4 py-2 rounded">Get Started</button>
                </Link>
                <Link to="/browse">
                  <button className="bg-burgundy text-white px-4 py-2 rounded">Get Started</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground">How It Works</h2>
          <p className="text-muted-foreground">Sue will guide you through every step!</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">Sell Your Items</h3>
            <p className="text-muted-foreground">
              List your outgrown uniform items quickly and easily. I'll help you price them fairly and create great listings!
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">Browse & Search</h3>
            <p className="text-muted-foreground">
              Find the perfect uniform items by school, item type, school year and condition. I'll help you filter through all the options!
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">Connect & Complete</h3>
            <p className="text-muted-foreground">
              Message buyers or sellers directly and complete secure transactions. I'll keep your conversations organized!
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary/5 py-16">
        <div className="container">
          <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-2">
            <div className="flex justify-center md:justify-start">
              <img 
                src="/assets/generated/sue-mascot-new.png" 
                alt="Sue - Your trusted guide" 
                className="h-32 w-32 object-contain drop-shadow-lg"
              />
            </div>
            <div className="text-center md:text-left">
              <TrendingUp className="mx-auto mb-4 h-12 w-12 text-primary md:mx-0" />
              <h2 className="mb-4 text-3xl font-bold text-foreground">Turn Outgrown Items into Cash</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Your children have outgrown their uniforms? Don't let them gather dust! I'll help you sell them quickly and easily, putting money back in your pocket while helping other families save.
              </p>
              <Link to="/create-listing">
                <button className="bg-burgundy text-white px-4 py-2 rounded">Get Started</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="mb-12 text-center">
          <Shield className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h2 className="mb-4 text-3xl font-bold text-foreground">Safe & Trusted Platform</h2>
          <p className="text-lg text-muted-foreground">
            I ensure quality by only allowing items in good condition. All transactions are secure, and I keep your communication safe and organized.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
            <ShoppingBag className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h3 className="mb-2 text-xl font-semibold text-foreground">For Sellers</h3>
            <p className="mb-4 text-muted-foreground">
              List your items with photos, set your price with my guidance, and connect with interested buyers. Direct shipping means no hassle!
            </p>
            <Link to="/create-listing">
              <button className="bg-burgundy text-white px-4 py-2 rounded">Get Started</button>
            </Link>
          </div>
          <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
            <Search className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h3 className="mb-2 text-xl font-semibold text-foreground">For Buyers</h3>
            <p className="mb-4 text-muted-foreground">
              Browse quality second-hand uniform items at great prices. Filter by school, size, and condition to find exactly what you need.
            </p>
            <Link to="/browse">
              <button className="bg-burgundy text-white px-4 py-2 rounded">Get Started</button>
            </Link>
          </div>
        </div>
      </section>

      {/* "Ready to Get Started" section with white card for maximum readability */}
      <section className="bg-gradient-to-br from-[oklch(35%_0.08_250)] to-[oklch(45%_0.12_15)] py-16 text-white">
        <div className="container">
          <div className="rounded-2xl bg-white/95 backdrop-blur-sm p-8 text-center md:p-12 shadow-2xl border-4 border-white">
            <h2 className="mb-4 text-3xl font-bold text-[oklch(35%_0.08_250)] md:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mb-2 text-lg font-semibold text-[oklch(30%_0.08_250)] md:text-xl">
              Whether you're selling outgrown items or looking for affordable uniform pieces, I'm here to help!
            </p>
            <p className="mb-8 text-base font-medium text-[oklch(40%_0.06_250)] md:text-lg">
              Join our community of parents helping each other save money and reduce waste.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/create-listing">
                <button className="bg-burgundy text-white px-4 py-2 rounded">Sell an Item with Sue</button>
              </Link>
              <Link to="/browse">
                <button className="bg-burgundy text-white px-4 py-2 rounded">Browse Available Items</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
