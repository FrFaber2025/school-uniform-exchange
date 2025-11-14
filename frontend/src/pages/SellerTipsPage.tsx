import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, Camera, FileText, DollarSign, Package, CheckCircle, Lightbulb, AlertCircle } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function SellerTipsPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-8">
      <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-start gap-4 rounded-lg border bg-primary/5 p-6">
          <img 
            src="/assets/generated/sue-mascot-new.png" 
            alt="Sue" 
            className="h-20 w-20 flex-shrink-0 rounded-full border-2 border-primary/20 object-cover"
          />
          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-bold text-primary">Sue's Seller Tips & Guides</h1>
            <p className="text-lg text-muted-foreground">
              Hi! I'm here to help you become a successful seller on the School Uniform Exchange. Follow these tips to create great listings, attract buyers, and complete sales quickly!
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-6 w-6 text-primary" />
                How to Photograph Your Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="mb-2 font-semibold text-primary">Sue's Photography Essentials</h4>
                <p className="text-sm text-muted-foreground">
                  Great photos are the key to selling quickly! Here's how to make your items look their best:
                </p>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="lighting">
                  <AccordionTrigger>Natural Lighting is Best</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5 text-sm">
                      <li>Take photos near a window during daylight hours for the best natural light</li>
                      <li>Avoid harsh direct sunlight - diffused light works better</li>
                      <li>If using artificial light, use bright white bulbs and avoid yellow-tinted lighting</li>
                      <li>Never use flash - it creates harsh shadows and washes out colors</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="background">
                  <AccordionTrigger>Clean, Simple Backgrounds</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5 text-sm">
                      <li>Use a plain white, light grey, or neutral-colored background</li>
                      <li>Hang items on a hanger against a plain wall or door</li>
                      <li>Lay flat items on a clean, wrinkle-free sheet or surface</li>
                      <li>Remove clutter and distracting objects from the frame</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="angles">
                  <AccordionTrigger>Multiple Angles & Details</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5 text-sm">
                      <li>Take at least 3-5 photos showing different angles (front, back, side)</li>
                      <li>Include close-up shots of important details like logos, buttons, or embroidery</li>
                      <li>Show the care label with size and washing instructions</li>
                      <li>If there are any minor marks or wear, photograph them honestly</li>
                      <li>For trousers and skirts, show the waistband and hem</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="presentation">
                  <AccordionTrigger>Presentation Matters</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5 text-sm">
                      <li>Iron or steam items before photographing - wrinkles make items look worn</li>
                      <li>Ensure items are clean and freshly laundered</li>
                      <li>Button up shirts and blazers properly</li>
                      <li>Smooth out any creases or folds</li>
                      <li>Use a mannequin or lay items flat in a neat, organized way</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="flex items-start gap-2 text-sm">
                  <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span><strong>Sue's Pro Tip:</strong> Take photos in portrait mode and fill the frame with the item. Buyers want to see the uniform clearly, not your entire room!</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Writing Great Descriptions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="mb-2 font-semibold text-primary">Sue's Description Guidelines</h4>
                <p className="text-sm text-muted-foreground">
                  A detailed, honest description helps buyers make confident decisions and reduces questions!
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="essential-info">
                  <AccordionTrigger>Include Essential Information</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5 text-sm">
                      <li><strong>Brand:</strong> Mention the manufacturer or brand name if known</li>
                      <li><strong>Size:</strong> Include all measurements (waist, chest, collar, etc.)</li>
                      <li><strong>Age/Fit:</strong> Mention which school year it's suitable for</li>
                      <li><strong>Color:</strong> Describe the exact color (navy blue, burgundy, etc.)</li>
                      <li><strong>Material:</strong> Note the fabric type (polyester, cotton blend, wool, etc.)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="condition">
                  <AccordionTrigger>Be Honest About Condition</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5 text-sm">
                      <li>Accurately describe the condition using our categories (New/As New, Excellent, Slightly Worn)</li>
                      <li>Mention any minor marks, fading, or wear honestly</li>
                      <li>Note if items have been altered (hemmed, taken in, etc.)</li>
                      <li>Describe how many times the item was worn or washed</li>
                      <li>Honesty builds trust and prevents returns or disputes!</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="features">
                  <AccordionTrigger>Highlight Special Features</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5 text-sm">
                      <li>Mention school-specific details (embroidered logo, house colors, etc.)</li>
                      <li>Note practical features (adjustable waist, reinforced knees, stain-resistant)</li>
                      <li>Include care instructions if special washing is required</li>
                      <li>Mention if the item comes from a smoke-free or pet-free home</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="writing-style">
                  <AccordionTrigger>Writing Style Tips</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5 text-sm">
                      <li>Use clear, simple language - avoid jargon</li>
                      <li>Write in short paragraphs for easy reading</li>
                      <li>Use bullet points for lists of features</li>
                      <li>Check spelling and grammar - it shows you care</li>
                      <li>Be friendly and approachable in your tone</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <p className="flex items-start gap-2 text-sm">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                  <span><strong>Important - Name Tags & Markings:</strong> Please ensure any name tags are removed before selling items. If there are permanent markings (such as written names or labels) that cannot be easily removed, you must mention this clearly in your description and include a photo of the marking among your item photos. This helps buyers make informed decisions and prevents disputes.</span>
                </p>
              </div>

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="flex items-start gap-2 text-sm">
                  <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span><strong>Sue's Pro Tip:</strong> Think about what YOU would want to know if you were buying this item. Answer those questions in your description!</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-primary" />
                Setting the Right Price
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="mb-2 font-semibold text-primary">Sue's Pricing Strategy</h4>
                <p className="text-sm text-muted-foreground">
                  Price your items competitively to sell quickly while getting fair value!
                </p>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-semibold">Use My Pricing Assistant</h4>
                  <p className="text-sm text-muted-foreground">
                    When creating a listing, I'll suggest prices based on:
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                    <li>50% discount from retail price (a good starting point)</li>
                    <li>Average prices of similar items that have sold</li>
                  </ul>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-semibold">Consider These Factors</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm">
                    <li><strong>Condition:</strong> New/As New items can be priced higher than Slightly Worn</li>
                    <li><strong>Brand:</strong> Premium brands can command higher prices</li>
                    <li><strong>Demand:</strong> Popular schools and common sizes sell faster</li>
                    <li><strong>Season:</strong> Price slightly lower at the end of the school year</li>
                    <li><strong>Competition:</strong> Check similar listings and price competitively</li>
                  </ul>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-semibold">Pricing Guidelines</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm">
                    <li><strong>New/As New:</strong> 40-60% of retail price</li>
                    <li><strong>Excellent:</strong> 30-45% of retail price</li>
                    <li><strong>Slightly Worn:</strong> 20-35% of retail price</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="flex items-start gap-2 text-sm">
                  <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span><strong>Sue's Pro Tip:</strong> Price items to sell! It's better to sell quickly at a fair price than to wait months for a slightly higher price. Remember, you're helping other families while decluttering!</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-6 w-6 text-primary" />
                Packaging & Shipping Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="mb-2 font-semibold text-primary">Sue's Shipping Best Practices</h4>
                <p className="text-sm text-muted-foreground">
                  Proper packaging ensures items arrive in perfect condition and creates happy buyers!
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="packaging">
                  <AccordionTrigger>Packaging Materials</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5 text-sm">
                      <li>Use clean, sturdy poly mailers or cardboard boxes</li>
                      <li>Fold items neatly and place in a clear plastic bag first (protects from moisture)</li>
                      <li>Use tissue paper or bubble wrap for delicate items</li>
                      <li>Seal packages securely with strong packing tape</li>
                      <li>Reuse packaging materials when possible - it's eco-friendly!</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="shipping-method">
                  <AccordionTrigger>Choosing a Shipping Method</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5 text-sm">
                      <li>Royal Mail 2nd Class is economical for most uniform items</li>
                      <li>Use tracked services for valuable items (blazers, multiple items)</li>
                      <li>Consider offering 1st Class as an option for urgent buyers</li>
                      <li>Weigh items before listing to estimate shipping costs</li>
                      <li>Communicate shipping costs clearly with buyers</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="timing">
                  <AccordionTrigger>Shipping Timing</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5 text-sm">
                      <li>Ship within 1-2 business days after payment is confirmed</li>
                      <li>Communicate with the buyer if there will be any delay</li>
                      <li>Provide tracking information when available</li>
                      <li>Keep proof of postage until the buyer confirms receipt</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="presentation">
                  <AccordionTrigger>Professional Presentation</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5 text-sm">
                      <li>Write addresses clearly and legibly</li>
                      <li>Include a thank you note - it creates goodwill!</li>
                      <li>Ensure items are clean and freshly laundered before shipping</li>
                      <li>Fold items neatly to minimize wrinkles</li>
                      <li>Double-check you're sending the correct item to the right buyer</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="flex items-start gap-2 text-sm">
                  <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span><strong>Sue's Pro Tip:</strong> Fast, professional shipping leads to happy buyers and great reviews. Good reviews help you sell more items in the future!</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                Quick Checklist for Success
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                  <div>
                    <h4 className="font-semibold">Before Listing</h4>
                    <p className="text-sm text-muted-foreground">Wash/dry-clean items, remove name tags, iron them, take great photos, measure accurately</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                  <div>
                    <h4 className="font-semibold">Creating Your Listing</h4>
                    <p className="text-sm text-muted-foreground">Write detailed descriptions, mention any permanent markings, use my pricing assistant, add multiple photos, be honest about condition</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                  <div>
                    <h4 className="font-semibold">After a Sale</h4>
                    <p className="text-sm text-muted-foreground">Respond promptly, package carefully, ship quickly, communicate tracking info</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                  <div>
                    <h4 className="font-semibold">Building Your Reputation</h4>
                    <p className="text-sm text-muted-foreground">Provide excellent service, encourage reviews, maintain high standards</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-lg border border-primary bg-primary/5 p-6 text-center">
            <img 
              src="/assets/generated/sue-mascot-new.png" 
              alt="Sue" 
              className="mx-auto mb-4 h-16 w-16 rounded-full object-cover"
            />
            <h3 className="mb-2 text-xl font-bold text-primary">Ready to Start Selling?</h3>
            <p className="mb-4 text-muted-foreground">
              Follow these tips and you'll be a successful seller in no time! I'm here to help you every step of the way.
            </p>
            <Button 
              size="lg" 
              className="bg-success text-white hover:bg-success/90"
              onClick={() => navigate({ to: '/create-listing' })}
            >
              Create Your First Listing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
