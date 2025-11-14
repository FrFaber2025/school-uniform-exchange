# School Uniform Exchange (SUE) App

## Overview
A marketplace application where parents can buy and sell second-hand UK school uniform items. The platform facilitates secure transactions between users through integrated payment processing and handles commission collection. The app features "Sue", a friendly mascot who guides users through their experience.

## Production Deployment Requirements
- **Live Production Environment**: Deploy the complete School Uniform Exchange (SUE) application to a live, publicly accessible production environment
- **Domain Integration**: Ensure the application is accessible and properly configured for the secondhandschooluniforms.co.uk domain
- **Production Readiness**: All features, branding, and functionality must be fully operational in the live environment
- **Performance Optimization**: Ensure optimal loading times and responsiveness for public users
- **Security Configuration**: Implement production-level security measures for user data and payment processing
- **Monitoring and Analytics**: Enable production monitoring and error tracking systems
- **SSL/HTTPS**: Ensure secure HTTPS connection for all user interactions and payment processing
- **Database Migration**: Migrate all necessary data structures and configurations to production environment
- **Asset Optimization**: Ensure all images, icons, and static assets are properly optimized and accessible in production
- **Payment System Integration**: Verify Stripe payment integration is configured for live transactions
- **Content Delivery**: Optimize content delivery for UK-based users and global accessibility
- **Complete Feature Deployment**: Deploy all recent updates including blue and red bar text changes, unified branding, homepage layout improvements, and all current functionality
- **Asset Integrity**: Ensure all current assets including the correct Sue mascot (sue-mascot-new.png) and homepage background are properly deployed
- **UI Consistency**: Deploy all current styling including proper colored bars, button styling, and branding visibility improvements

## Branding and Mascot
- App name: "School Uniform Exchange" with "SUE" as the short name
- **Unified branding display**: "School Uniform Exchange (SUE)" with Sue mascot prominently displayed at the top of every page
- **Domain prominence**: "Visit us at secondhandschooluniforms.co.uk" displayed directly beneath or beside the main branding in contrasting but readable style
- **Page titles and meta descriptions**: Use "School Uniform Exchange (SUE)" in all page titles and meta descriptions
- **Domain integration**: Mention "secondhandschooluniforms.co.uk" in About and Contact pages
- **Footer branding**: Footer displays "School Uniform Exchange (SUE) — secondhandschooluniforms.co.uk"
- **Critical branding visibility**: The unified branding "School Uniform Exchange (SUE)" and "secondhandschooluniforms.co.uk" must be visually prominent and clearly visible at the top of every page, in the homepage hero section, and in the footer with proper styling and contrast
- Mascot: "Sue" - a friendly, young woman character who appears throughout the app
- Sue guides users in onboarding, help sections, and key call-to-action areas
- Sue is featured prominently in the hero banner and user flows
- **Critical mascot requirement**: ONLY the new Sue mascot image (sue-mascot-new.png) must be used consistently across ALL components, pages, and modals throughout the entire application
- **Complete removal of old mascots**: All old Sue mascot images (sue-mascot-improved-bg.dim_400x400.png, sue-mascot.dim_400x400.png, sue-mascot-alt-transparent.dim_100x100.png) must be completely removed from all components and replaced with sue-mascot-new.png
- **Proper mascot sizing and positioning**: Sue mascot must be appropriately sized (not oversized) and positioned near her introduction text without covering background children
- **Critical asset loading**: All Sue mascot icons must load correctly without broken image references
- **Consistent placement**: Sue mascot must appear above "Hi! I'm Sue, and I'm here to help you sell outgrown school uniforms and save money on good-quality second-hand uniform items for your children.", in Profile Setup Modal, messaging tips, listing creation tips, and all Sue-related sections using ONLY the correct asset reference (sue-mascot-new.png)
- **Universal mascot replacement**: Every single instance of Sue mascot throughout the application must use sue-mascot-new.png
- **Asset cleanup**: All references to old Sue mascot images must be removed from the codebase and asset references

## Homepage Layout and Messaging
- **Updated hero section structure**:
  - Main headline: "Welcome to School Uniform Exchange (SUE)"
  - Subheadline: "The UK's trusted marketplace for second-hand school uniforms — powered by secondhandschooluniforms.co.uk"
  - Sue's introduction text: "Hi! I'm Sue, and I'm here to help you sell outgrown school uniforms and save money on good-quality second-hand uniform items for your children."
- **Critical branding in hero**: The unified branding "School Uniform Exchange (SUE)" and "secondhandschooluniforms.co.uk" must be prominently displayed in the hero section with proper styling, contrast, and visibility
- **Updated blue banner text**: Prominent blue text banner at the top of the homepage stating: "This service is available for all UK schools including leading independent and State-sector schools, for boys and girls."
- **Updated red bar text**: Directly under the blue school availability banner, display a prominent red bar stating: "No upfront fees! The small administration fee and commission are deducted from sale proceeds. The seller is responsible for postage/ delivery to the buyer."
- **Critical colored bars restoration**: The colored bars at the top of the homepage (blue school availability banner and red bar) must display with their intended colors (blue and red respectively), be visually distinct, and match the original design with proper color contrast and visibility
- Primary emphasis on selling uniform items with clear, prominent messaging
- **Critical button styling restoration**: Both primary call-to-action buttons must be restored to their original styling and always visible:
  1. **"Sell an item of Uniform" button - MUST have green background with white text** for strong visual prominence and accessibility
  2. **"Browse items for sale" button - MUST have white background with dark navy text and visible border** as the secondary option with clear contrast
- **Button accessibility and prominence**: Both buttons maintain visual distinction and accessibility with clear spacing, contrast, and prominence on all screen sizes
- **Responsive button consistency**: Button styles must be consistent across ALL responsive breakpoints (mobile, tablet, desktop) and in both light and dark modes
- **Button visibility guarantee**: Both buttons must be always visible with their specified styling regardless of screen size or theme
- **User Authentication Buttons**: Prominent "New User Registration" button positioned alongside the existing user login button on the front page
- **Consistent Authentication Button Styling**: Both the "Register as a new user" button and the Login button must have matching font colors and font weights for consistent appearance at the top of the page
- **Registration Button Font Consistency**: The registration button font weight and color must exactly match the adjacent Login button to ensure visual consistency with non-bold, dark font style for a unified appearance
- **Registration Button Accessibility**: The registration button must maintain proper contrast ratios, clear readability, and visual prominence with appropriate hover and focus states that work across all background variations
- **Registration Button Visibility**: The registration button styling must ensure it remains readable and prominent in both light and dark header themes with sufficient color contrast, matching the Login button's font color and weight
- **Registration-First Process**: Both registration and login buttons are visually distinct and easily accessible on all devices
- **Clear User Flow**: Registration button emphasizes that new users must register before logging in
- Homepage messaging emphasizes helping parents sell outgrown or unneeded school clothing items
- Language consistently uses "items" instead of "uniforms" to clarify individual pieces are sold
- **Critical text verification**: The Sue introduction text must be exactly as specified above and must be visible and correctly styled in the hero section of the homepage
- **Homepage background requirement**: Must use the correct diverse children background image (homepage-diverse-children.dim_1200x400.jpg) showing children of different ages (8-18 years) and genders
- **Sue mascot positioning**: Sue mascot (sue-mascot-new.png) positioned appropriately sized and close to the Sue introduction text on the front page, ensuring it does not block or cover the background image of children
- **Critical visibility requirement**: All homepage text and buttons must use strong overlays, text shadows, or high-contrast color adjustments to ensure maximum visibility and readability against the background image
- **"Ready to get started" section restoration**: The "Ready to get started" text and its description must be restored to the previous visible style without black background overlay, using alternative styling methods (text shadows, contrasting colors, selective backgrounds) to ensure maximum visibility and readability against the background image while maintaining the app's branding and design
- **Homepage style reversion**: Remove or significantly reduce any large black background overlay that obscures homepage content, reverting to the previous visible version where all elements were clearly visible and accessible while maintaining text readability through alternative styling methods
- **Accessibility requirement**: All text elements must have sufficient contrast ratios and be clearly readable at all times
- **Navigation requirement**: Main navigation and all UI elements must render correctly without display issues
- **Asset integrity**: All image and icon references must load properly without broken or missing assets
- **Content language**: All application content must be in English
- **Terms and Conditions Access**: Prominent link to Terms and Conditions document accessible from the homepage footer or main navigation

## User Authentication
- User registration and login system with Sue providing guidance
- **Registration-First Flow**: Clear navigation and modal flows that reinforce the registration-first process for new users
- **Distinct Authentication Options**: Registration and login buttons are visually distinct and prominently displayed
- User profiles for buyers and sellers

## Terms and Conditions System
- **Comprehensive Terms and Conditions Document**: Detailed legal document covering:
  - Platform duties, obligations, rights, and responsibilities
  - Buyer duties, obligations, rights, and responsibilities
  - Seller duties, obligations, rights, and responsibilities
  - Main risks and liabilities for all parties
  - Postage and delivery policy (seller responsibility)
  - Payment processing and commission structure
  - Returns and refunds policy
  - Platform limitations and disclaimers
  - User conduct and prohibited activities
- **CRITICAL: Guaranteed Terms and Conditions Display**: The Terms and Conditions page/tab must ALWAYS display the complete, up-to-date Terms and Conditions document content retrieved from the backend, NEVER showing placeholder messages like "still being prepared", "unable to load", or any other temporary content
- **CRITICAL: Robust Backend Terms and Conditions Retrieval**: The backend must ALWAYS provide the full Terms and Conditions document content including version information and effective date for display on the frontend with robust error handling and fallback mechanisms
- **CRITICAL: Resilient Frontend Terms and Conditions Rendering**: The frontend must implement robust error handling and retry mechanisms to fetch and render the complete Terms and Conditions document from the backend, ensuring the full document is visible to all users at all times with proper fallback strategies
- **CRITICAL: No Placeholder or Error Messages**: The Terms and Conditions page must never display "being prepared", "unable to load", "coming soon", or any other placeholder/error messages - the full document must be available and visible immediately with comprehensive error recovery
- **CRITICAL: Bulletproof Document Availability**: Implement multiple fallback mechanisms to ensure the Terms and Conditions document is always accessible, including cached versions, retry logic, and graceful error recovery
- **Version and Date Display**: The Terms and Conditions page must display the document version and effective date retrieved from the backend
- **Complete Document Availability**: The full Terms and Conditions document must be accessible and viewable at all times through the Terms and Conditions tab or page without any preparation delays or error states
- **Mandatory Agreement for Sellers**: Sellers must explicitly agree to Terms and Conditions before publishing any listing
- **Mandatory Agreement for Buyers**: Buyers must explicitly agree to Terms and Conditions before completing any purchase
- **Easy Access**: Terms and Conditions accessible from homepage, listing creation pages, and checkout pages
- **Version Control**: Terms and Conditions include effective date and version information
- **Clear Acceptance UI**: Checkbox and confirmation system for user agreement with clear language

## Postage and Packing Policy
- **Seller Responsibility Section**: Dedicated section explaining postage and packing responsibilities
- **Clear Policy Statement**: Sellers are fully responsible for arranging and paying for delivery of sold items
- **Pricing Guidance**: Delivery charges should be included in the asking price of items
- **Platform Disclaimer**: Platform is not responsible for delivery arrangements, lost items, or delivery-related issues
- **No Postage Refunds**: Platform will not refund postage costs or provide indemnification for lost items
- **Delivery Best Practices**: Sue provides guidance on reliable delivery methods and packaging tips
- **Integration with Listing Creation**: Postage policy reminder displayed during listing creation process
- **Buyer Awareness**: Clear communication to buyers about delivery arrangements and seller responsibility

## Seller Ratings and Reviews System
- Buyers can rate sellers after completing a transaction (1-5 star rating)
- Buyers can leave written reviews for sellers after purchase completion
- Only buyers who have completed a purchase through the platform can submit reviews
- Seller profiles display average rating and recent reviews
- Listing pages show seller's average rating and review count
- Reviews include buyer's rating, written feedback, and transaction date
- Sellers cannot review themselves or manipulate ratings

## Item Listings
- Sellers can create listings for school uniform items with Sue's assistance
- **Terms and Conditions Agreement**: Sellers must agree to Terms and Conditions before publishing listings
- Photo upload requirements:
  - At least one photo is mandatory for each listing
  - Multiple images allowed per listing
  - Validation enforced in both frontend and backend
- Each listing includes:
  - Item photos (at least one required, multiple allowed)
  - Item description
  - **School name (multiple selection allowed)**: Users can select multiple schools from dropdown, enter new school names as freeform entries, and select "Various" option (alone or in combination with other schools)
  - Gender specification (boys or girls)
  - School year (required dropdown): "Years 3-4", "Years 5-6", "Years 7-8", "Years 9-10", "Years 11-13"
  - **Enhanced item type options**: "Trousers", "Jackets", "Blazers", "Shirts", "Skirts", "Ties", "Sports Shorts", "Sports Shirts", "Coat", "Jumper", "Shoes", "Other"
  - **Enhanced size measurements** (based on item type):
    - Trousers: "Waist Size (inches)" and "Inside Leg (inches)"
    - Jackets and Blazers: "Chest Size (inches)"
    - Shirts: "Collar Size (inches)" and "Sleeve Length (inches)"
    - Skirts: "Waist Size (inches)"
    - Sports Shorts: "Waist Size (inches)"
    - Sports Shirts: "Chest Size (inches)"
    - **Coat and Jumper**: Size selection dropdown with "Large", "Medium", "Small" options
    - **Shoes**: UK shoe size input field
  - Condition rating: "New or As New", "Excellent", "Slightly Worn"
  - Price (with reminder to include delivery costs)
  - Seller's average rating and review count displayed on listing
- Sellers manage their own listings (edit, delete)
- Clear notice displayed during listing creation that all items must be washed or dry-cleaned if necessary and must match the described condition
- **Postage Reminder**: Clear reminder during listing creation that delivery costs should be included in the asking price

## Price Suggestion Feature
- Pricing assistance for sellers during listing creation with Sue's helpful tips
- Two pricing suggestions provided:
  - Recommended price based on 50% discount from new retail price (seller inputs or selects the new price for reference)
  - Average price from past sales of similar items (matching item type, school, gender, and school year where possible)
- Clear explanations provided for each pricing suggestion
- Sue provides guidance on how to use the pricing suggestions effectively
- Sellers can choose to use, modify, or ignore the suggested prices
- **Delivery Cost Reminder**: Pricing suggestions include reminder to factor in delivery costs

## Seller Tips & Guides Section
- Comprehensive help section for sellers with Sue as the friendly guide
- Accessible from listing creation page and dedicated help section in main navigation
- Includes practical advice on:
  - How to photograph uniform items effectively (lighting, angles, staging)
  - Writing compelling and accurate item descriptions
  - Setting competitive and fair prices (including delivery costs)
  - Proper packaging and shipping methods for uniforms
  - Best practices for item condition assessment
  - Tips for faster sales and better buyer experience
  - **Name Tag Removal Guidance**: Sellers should ensure any name tags are removed before selling items, and if there are markings that cannot be easily removed, sellers should mention this in the item description and include a photo of the marking among the item photos
  - **Postage and Delivery Best Practices**: Guidance on reliable delivery services, packaging tips, and cost-effective shipping options
- Sue provides encouraging and helpful guidance throughout all tips and guides
- Content organized in easy-to-read sections with clear headings and actionable advice

## Browse and Search
- Browse all available listings
- Search functionality for finding specific items
- Filter listings by:
  - School name (first filter) - supports multiple school selection
  - Item type (second filter) - includes new item types (Coat, Jumper, Shoes)
  - School year (third filter)
  - Condition rating (fourth filter)
  - Gender (boys or girls)
- Sort listings by various criteria including seller rating
- View detailed listing pages with all item information and seller ratings
- Browse section text: "Find the perfect uniform items by school, item type, school year and condition. I'll help you filter through all the options!"

## Payment System and Transaction Security
- £1.50 flat listing fee charged when creating a listing with Sue explaining the process
- 5% commission taken on completed sales
- **Mandatory Stripe Integration**: All payments between buyers and sellers must be processed through the platform's Stripe integration
- **No Direct Payment Arrangements**: Direct payment arrangements between users are strictly prohibited
- **Secure Transaction Flow**: Clear UI instructions that all transactions must be completed through the platform for security and commission collection
- **Terms and Conditions Agreement**: Buyers must agree to Terms and Conditions before completing purchase
- Payment processing for all transactions with automatic commission deduction
- Transaction history for users with payment status tracking
- **Payment Release System**: Payment is held by the platform until buyer confirms receipt of the item
- Commission and listing fee are deducted from the seller's payment after buyer confirms receipt

## Order Fulfillment and Payment Release System
- **Dispatch Confirmation**: Sellers can confirm to both the buyer and platform that the item has been dispatched
- **Receipt Confirmation**: Buyers can confirm receipt of the item, which triggers the release of payment to the seller
- **Payment Hold**: Payment is held by the platform until buyer confirms receipt
- **Automatic Deductions**: After buyer confirms receipt, the £1.50 listing fee and 5% commission are automatically deducted from the payment before releasing funds to the seller
- **Transaction Status Tracking**: Clear status indicators for both buyers and sellers showing dispatch confirmation, delivery status, and payment release
- **Messaging Integration**: Dispatch and receipt confirmations are integrated with the messaging system for clear communication
- **Delivery Responsibility Reminder**: Clear communication that sellers are responsible for delivery arrangements

## Returns and Refunds Policy
- **Returns and Refunds Section**: Dedicated section in the app explaining the returns and refunds policy
- **Buyer-Seller Negotiation**: Returns and refunds must be negotiated directly between buyer and seller
- **Platform Commission Refund**: The exchange will only refund its commission if both buyer and seller agree to cancel the transaction
- **Administration Fee Retention**: The £1.50 administration fee is retained by the platform even in cases of agreed cancellation
- **No Postage Refunds**: Platform does not refund postage costs or provide compensation for delivery issues
- **Clear Policy Communication**: Policy is clearly communicated to users during the transaction process and accessible in help sections

## Messaging System and Contact Restrictions
- **Restricted Messaging**: Direct messaging between buyers and sellers is restricted or hidden until after successful payment completion via Stripe
- **Post-Payment Communication**: Messaging system becomes available only after payment is confirmed through the platform
- **Dispatch and Receipt Messaging**: Integrated messaging for dispatch confirmations and receipt confirmations within the transaction flow
- **Contact Detail Protection**: Seller's contact details are only displayed to the buyer after payment is confirmed through the platform
- Message threads associated with specific listings (available post-payment)
- Notification system for new messages (post-payment)
- Sue provides tips on secure transaction practices

## Data Storage (Backend)
- User accounts and profiles
- **Terms and Conditions Acceptance Records**: Track user agreement to Terms and Conditions with timestamps and version information
- **CRITICAL: Bulletproof Terms and Conditions Document Storage**: Store the full, up-to-date Terms and Conditions document content with version and effective date that can be retrieved and displayed immediately at all times with multiple redundancy mechanisms, caching layers, and failsafe retrieval methods to prevent any unavailability
- **CRITICAL: Resilient Document Retrieval System**: Implement robust backend systems with multiple fallback mechanisms, caching strategies, and error recovery to ensure the Terms and Conditions document is always available for immediate retrieval without any preparation delays, error states, or placeholder content
- **Enhanced item listings**: All associated data including multiple school names, gender, school year, detailed item type (including new types: Coat, Jumper, Shoes), and enhanced size measurements
- **Multiple school name storage**: Support for multiple school selections per listing and dynamic school name storage (new schools added automatically to dropdown options)
- Photo validation requirements for listings
- **Enhanced Transaction Records**: Payment information, Stripe transaction IDs, payment status, commission tracking, and payment release status
- **Order Fulfillment Tracking**: Dispatch confirmation status, receipt confirmation status, and payment release timestamps
- **Fee Structure Data**: £1.50 listing fee and 5% commission rate storage and calculation
- **Secure Contact Management**: Seller contact details with access control based on payment status
- **Restricted Message Storage**: Message threads and conversation history (accessible only post-payment)
- **Seller Ratings and Reviews**: Store buyer ratings (1-5 stars), written reviews, reviewer information, and transaction references
- **Review Validation Data**: Track completed transactions to verify review eligibility
- **Returns and Refunds Data**: Policy information and transaction cancellation records
- **Terms and Conditions Document**: Store current and historical versions of Terms and Conditions with version numbers and effective dates
- **Postage Policy Data**: Store postage and delivery policy information
- Fee and commission tracking with automated calculation
- Historical sales data for price suggestion calculations

## Key Operations (Backend)
- User registration and authentication
- **Terms and Conditions Management**: Store, version, and track user acceptance of Terms and Conditions
- **CRITICAL: Bulletproof Terms and Conditions Retrieval**: Provide full Terms and Conditions document content with version and effective date for display in the Terms and Conditions tab immediately at all times with comprehensive error handling, retry mechanisms, caching strategies, and multiple fallback systems to ensure 100% availability
- **CRITICAL: Failsafe Document Availability**: Implement multiple redundant systems, cached document storage, automatic retry logic, and graceful error recovery to guarantee the Terms and Conditions document is always ready for retrieval and display without any "being prepared" states, error messages, or temporary unavailability
- **Agreement Validation**: Verify Terms and Conditions acceptance before allowing listing publication and purchase completion
- **Enhanced listing management**: Create, update, delete item listings with multiple school selection, enhanced item types (Coat, Jumper, Shoes), and corresponding size measurements
- Validate that listings have at least one photo before allowing creation
- **Terms and Conditions Enforcement**: Prevent listing publication without Terms and Conditions acceptance
- **Multiple school management**: Handle multiple school selections per listing and manage dynamic school name dropdown (add new schools automatically when entered as freeform)
- Calculate pricing suggestions based on retail discount and historical sales data
- Analyze past sales data to generate average prices for similar items matching item type, school, gender, and school year
- **Stripe Payment Processing**: Handle all payments through Stripe integration with automatic commission deduction
- **Payment Status Management**: Track payment completion and unlock messaging/contact features accordingly
- **Terms and Conditions Purchase Validation**: Ensure buyers have accepted Terms and Conditions before payment processing
- **Order Fulfillment Management**: Process dispatch confirmations from sellers and receipt confirmations from buyers
- **Payment Release Processing**: Release payments to sellers after buyer confirms receipt, automatically deducting £1.50 listing fee and 5% commission
- **Transaction Status Updates**: Update and track transaction status throughout the fulfillment process
- **Contact Access Control**: Manage seller contact detail visibility based on payment confirmation
- **Secure Messaging Control**: Enable/disable messaging functionality based on payment status
- **Rating and Review Management**: Process buyer ratings and reviews, calculate seller averages, validate review eligibility based on completed purchases
- **Review Access Control**: Ensure only verified buyers can submit reviews for completed transactions
- **Returns and Refunds Processing**: Handle agreed transaction cancellations, commission refunds, and administration fee retention
- Handle messaging between users (post-payment only) including dispatch and receipt confirmations
- **Enhanced search and filtering**: Search and filter listings by multiple criteria including multiple school names, gender, school year, enhanced item types, and seller rating
- Sort listings by various parameters including seller rating
- Track transaction history and sales data for pricing analysis with enhanced payment security

## Important Notes
- **Production Environment**: The application must be deployed to a live, publicly accessible production environment with all features fully operational
- **Domain Configuration**: Proper configuration and integration with secondhandschooluniforms.co.uk domain
- **Security and Performance**: Production-level security measures, SSL/HTTPS, and optimized performance for public users
- **Complete Current Feature Set**: Deploy all current features including recent updates to blue and red bar text, unified branding, homepage layout improvements, and all existing functionality
- Platform handles all payments securely through Stripe integration - direct payments are prohibited
- Seller contact information is protected until payment is completed
- Messaging is restricted until successful payment through the platform
- Clear UI messaging enforces platform-only transactions for security and commission collection
- Platform does not handle physical goods - sellers ship directly to buyers after payment confirmation
- **Sellers are fully responsible for postage and delivery arrangements**
- **Delivery costs should be included in item asking prices**
- **Platform provides no delivery guarantees or compensation for lost items**
- No damaged or very worn items allowed on the platform
- All items must be washed or dry-cleaned if necessary and must match the described condition
- All content and communication in English
- Sue mascot provides friendly guidance throughout the user experience including secure payment processes and seller tips
- At least one photo is required for every listing
- Pricing suggestions are indicative only and sellers have full control over final pricing
- **Multiple school support**: School names can be selected from dropdown (multiple selections allowed), added as new entries, or "Various" can be selected alone or in combination
- **Enhanced size measurements**: Size measurements are required based on item type selection, including new options for Coat/Jumper (Large/Medium/Small) and Shoes (UK size input)
- Only verified buyers who completed purchases can leave reviews for sellers
- Seller ratings and reviews help build trust and improve the marketplace experience
- **Payment Release**: Payments are held until buyer confirms receipt, then £1.50 listing fee and 5% commission are deducted before releasing funds to seller
- **Returns Policy**: Returns and refunds are negotiated between users; platform only refunds commission if both parties agree to cancel, administration fee is always retained
- **Terms and Conditions Mandatory**: Users must accept Terms and Conditions before listing items or making purchases
- **CRITICAL: Terms and Conditions Always Available**: The complete Terms and Conditions document must be accessible and viewable at all times, never showing placeholder, error, or preparation messages - the full document must be immediately available to all users with bulletproof reliability and comprehensive error recovery
- **CRITICAL: Terms and Conditions Backend Integration**: The backend must store and provide the complete Terms and Conditions document content for frontend display immediately with multiple failsafe mechanisms and robust error handling
- **Frontend accessibility**: All UI elements must be clearly visible and accessible without display issues
- **Mascot consistency**: ONLY the new Sue mascot image (sue-mascot-new.png) must be used uniformly across ALL application components, pages, and modals at appropriate size to maintain visual consistency
- **Asset reliability**: All image and icon asset references must be verified to load correctly without broken links or missing files
- **Complete mascot replacement**: ALL references to old Sue mascot images must be removed and replaced with sue-mascot-new.png throughout the entire application
- **Proper positioning**: Sue mascot must not overlap or obscure important content and must be positioned as previously approved
- **Homepage background integrity**: The homepage must display the correct background image (homepage-diverse-children.dim_1200x400.jpg) at all times
- **Codebase cleanup**: All old Sue mascot asset references must be completely removed from the codebase
- **Registration-First UI**: Navigation and modal flows must clearly reinforce that new users should register before attempting to log in
- **Authentication Button Accessibility**: Both registration and login buttons must be easily accessible on all devices with clear visual distinction
- **Authentication Button Consistency**: Both registration and login buttons must have matching font weights and colors for a unified appearance
- **Unified branding consistency**: "School Uniform Exchange (SUE)" and "secondhandschooluniforms.co.uk" must be prominently displayed together across all pages for brand recognition and domain awareness with proper styling, contrast, and visibility
- **Critical colored bars display**: The colored bars at the top of the homepage must display with their intended colors (blue and red respectively) and be visually distinct as originally designed
- **Production Asset Deployment**: All current assets including sue-mascot-new.png and homepage-diverse-children.dim_1200x400.jpg must be properly deployed and accessible in production
- **Current UI State Deployment**: Deploy the current state of all UI improvements including proper button styling, colored bars, and branding visibility
