import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import Principal "mo:base/Principal";
import OrderedMap "mo:base/OrderedMap";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Array "mo:base/Array";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();

  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  // User Profiles
  public type UserProfile = {
    name : Text;
    email : Text;
    address : Text;
  };

  transient let principalMap = OrderedMap.Make<Principal>(Principal.compare);
  var userProfiles = principalMap.empty<UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view profiles");
    };
    principalMap.get(userProfiles, caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view profiles");
    };

    // Allow viewing own profile
    if (caller == user) {
      return principalMap.get(userProfiles, user);
    };

    // Admins can view any profile
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return principalMap.get(userProfiles, user);
    };

    // For other users, check if there's a completed transaction between them
    // This allows buyers to see seller contact details after payment
    let hasCompletedTransaction = hasCompletedTransactionBetweenUsers(caller, user);
    if (not hasCompletedTransaction) {
      Debug.trap("Unauthorized: Contact details only available after completed payment");
    };

    principalMap.get(userProfiles, user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles := principalMap.put(userProfiles, caller, profile);
  };

  // Storage
  let storage = Storage.new();
  include MixinStorage(storage);

  // Listings
  public type Condition = {
    #newOrAsNew;
    #excellent;
    #slightlyWorn;
  };

  public type Gender = {
    #boys;
    #girls;
  };

  public type ItemType = {
    #trousers;
    #jackets;
    #blazers;
    #shirts;
    #skirts;
    #ties;
    #sportsShorts;
    #sportsShirts;
    #coat;
    #jumper;
    #shoes;
    #other : Text;
  };

  public type SizeMeasurements = {
    waistSize : ?Nat;
    insideLeg : ?Nat;
    chestSize : ?Nat;
    collarSize : ?Nat;
    sleeveLength : ?Nat;
    coatJumperSize : ?Text; // "Large", "Medium", "Small"
    shoeSize : ?Nat; // UK shoe size
  };

  public type Listing = {
    id : Text;
    seller : Principal;
    title : Text;
    description : Text;
    schoolNames : [Text]; // Changed from single Text to array of Text
    gender : Gender;
    schoolYear : Text;
    itemType : ItemType;
    condition : Condition;
    price : Nat;
    photos : [Storage.ExternalBlob];
    sizeMeasurements : SizeMeasurements;
    createdAt : Time.Time;
    isActive : Bool;
  };

  public type PriceSuggestion = {
    retailDiscountPrice : Nat;
    averagePastSalePrice : ?Nat;
  };

  transient let textMap = OrderedMap.Make<Text>(Text.compare);
  var listings = textMap.empty<Listing>();

  // Dynamic school names storage
  var schoolNames : [Text] = ["Various"];

  // Terms and Conditions
  public type TermsAndConditions = {
    version : Text;
    effectiveDate : Time.Time;
    content : Text;
  };

  public type TermsAcceptance = {
    user : Principal;
    version : Text;
    acceptedAt : Time.Time;
  };

  var termsAndConditions : ?TermsAndConditions = ?{
    version = "1.0";
    effectiveDate = 1717977600000000000; // 2024-06-10
    content = "Terms and Conditions\n\n1. Introduction\nWelcome to the School Uniform Marketplace. By using our platform, you agree to these Terms and Conditions. Please read them carefully before registering, buying, or selling items.\n\n2. User Registration\n- You must provide accurate and complete information during registration.\n- You are responsible for maintaining the confidentiality of your account credentials.\n- Users must be at least 18 years old or have parental consent.\n\n3. Listings\n- All items must be school uniforms or related accessories.\n- Listings must include clear photos and accurate descriptions.\n- Sellers are responsible for ensuring items are clean and in good condition.\n- Prohibited items include non-uniform clothing, counterfeit items, and items not suitable for school use.\n\n4. Buying and Selling\n- Buyers must pay for items through the platform's secure payment system.\n- Sellers must dispatch items within 3 business days of receiving payment.\n- Buyers have 7 days to confirm receipt and condition of items.\n- Disputes will be resolved by the platform's support team.\n\n5. Fees and Commissions\n- The platform charges a 5% commission on all sales.\n- A listing fee of £1.50 applies to each item listed.\n- Fees are deducted automatically from the sale price.\n\n6. Payment Processing\n- Payments are processed securely through Stripe.\n- Sellers receive payment once the buyer confirms receipt or after 7 days if no issues are reported.\n- The platform is not responsible for payment delays caused by third-party processors.\n\n7. Returns and Refunds\n- Returns are accepted if items are not as described or damaged.\n- Buyers must initiate return requests within 3 days of receiving items.\n- Refunds are processed once the seller receives the returned item.\n\n8. User Conduct\n- Users must treat each other with respect and communicate professionally.\n- Abusive language, harassment, or fraudulent activity will result in account suspension.\n- The platform reserves the right to remove listings or ban users at its discretion.\n\n9. Privacy Policy\n- User data is collected and processed in accordance with our Privacy Policy.\n- Personal information is not shared with third parties without consent.\n\n10. Limitation of Liability\n- The platform is not responsible for lost or damaged items during shipping.\n- Users are responsible for verifying the authenticity and condition of items.\n- The platform's liability is limited to the amount paid for the item.\n\n11. Changes to Terms\n- The platform reserves the right to update these Terms and Conditions at any time.\n- Users will be notified of changes and must accept the new terms to continue using the platform.\n\n12. Governing Law\n- These Terms and Conditions are governed by the laws of the United Kingdom.\n- Any disputes will be resolved in UK courts.\n\nBy using the School Uniform Marketplace, you acknowledge that you have read, understood, and agree to these Terms and Conditions. If you do not agree, please do not use the platform.";
  };
  var termsAcceptances = textMap.empty<TermsAcceptance>();

  public shared ({ caller }) func setTermsAndConditions(terms : TermsAndConditions) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set terms and conditions");
    };
    termsAndConditions := ?terms;
  };

  // Public access - Terms and Conditions must be viewable by all users including guests
  public query func getTermsAndConditions() : async TermsAndConditions {
    switch (termsAndConditions) {
      case null {
        Debug.trap("Terms and Conditions are currently unavailable. Please try again later.");
      };
      case (?terms) {
        terms;
      };
    };
  };

  public shared ({ caller }) func acceptTermsAndConditions(version : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can accept terms and conditions");
    };

    // Verify the version being accepted matches the current terms
    switch (termsAndConditions) {
      case null {
        Debug.trap("No terms and conditions available to accept");
      };
      case (?terms) {
        if (terms.version != version) {
          Debug.trap("Terms version mismatch: Please accept the current version");
        };
      };
    };

    let acceptance = {
      user = caller;
      version;
      acceptedAt = Time.now();
    };

    termsAcceptances := textMap.put(termsAcceptances, Principal.toText(caller), acceptance);
  };

  public query ({ caller }) func hasAcceptedTermsAndConditions(version : Text) : async Bool {
    switch (textMap.get(termsAcceptances, Principal.toText(caller))) {
      case null false;
      case (?acceptance) acceptance.version == version;
    };
  };

  public query ({ caller }) func getTermsAcceptance() : async ?TermsAcceptance {
    textMap.get(termsAcceptances, Principal.toText(caller));
  };

  // Admin-only function to check user acceptance status
  public query ({ caller }) func getTermsAcceptanceForUser(user : Principal) : async ?TermsAcceptance {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view other users' terms acceptance");
    };
    textMap.get(termsAcceptances, Principal.toText(user));
  };

  // Helper function to verify current terms acceptance
  private func hasAcceptedCurrentTerms(user : Principal) : Bool {
    switch (termsAndConditions) {
      case null {
        // If no terms exist, no acceptance required
        true;
      };
      case (?terms) {
        switch (textMap.get(termsAcceptances, Principal.toText(user))) {
          case null false;
          case (?acceptance) acceptance.version == terms.version;
        };
      };
    };
  };

  public shared ({ caller }) func createListing(listing : Listing) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can create listings");
    };
    if (listing.seller != caller) {
      Debug.trap("Unauthorized: Cannot create listings for other users");
    };
    if (listing.photos.size() == 0) {
      Debug.trap("At least one photo is required for each listing");
    };

    // CRITICAL: Verify seller has accepted current Terms and Conditions
    if (not hasAcceptedCurrentTerms(caller)) {
      Debug.trap("Unauthorized: You must accept the current Terms and Conditions before publishing a listing");
    };

    // Add new school names if not already present
    for (schoolName in listing.schoolNames.vals()) {
      let schoolExists = Array.find<Text>(schoolNames, func(s) { s == schoolName });
      switch (schoolExists) {
        case null {
          schoolNames := Array.append(schoolNames, [schoolName]);
        };
        case (?_) {};
      };
    };

    listings := textMap.put(listings, listing.id, listing);
  };

  public shared ({ caller }) func updateListing(listing : Listing) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can update listings");
    };
    switch (textMap.get(listings, listing.id)) {
      case null {
        Debug.trap("Listing not found");
      };
      case (?existingListing) {
        if (existingListing.seller != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Debug.trap("Unauthorized: Can only update your own listings");
        };
        if (listing.seller != existingListing.seller) {
          Debug.trap("Unauthorized: Cannot change listing owner");
        };
        if (listing.photos.size() == 0) {
          Debug.trap("At least one photo is required for each listing");
        };

        // Add new school names if not already present
        for (schoolName in listing.schoolNames.vals()) {
          let schoolExists = Array.find<Text>(schoolNames, func(s) { s == schoolName });
          switch (schoolExists) {
            case null {
              schoolNames := Array.append(schoolNames, [schoolName]);
            };
            case (?_) {};
          };
        };

        listings := textMap.put(listings, listing.id, listing);
      };
    };
  };

  public shared ({ caller }) func deleteListing(listingId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can delete listings");
    };
    switch (textMap.get(listings, listingId)) {
      case null {
        Debug.trap("Listing not found");
      };
      case (?listing) {
        if (listing.seller != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Debug.trap("Unauthorized: Can only delete your own listings");
        };
        listings := textMap.delete(listings, listingId);
      };
    };
  };

  // Public access - Guests can browse listings
  public query func getListings() : async [Listing] {
    Iter.toArray(textMap.vals(listings));
  };

  // Public access - Guests can view individual listings
  public query func getListing(listingId : Text) : async ?Listing {
    textMap.get(listings, listingId);
  };

  // Public access - Guests can view school names for browsing
  public query func getSchoolNames() : async [Text] {
    schoolNames;
  };

  // Public access - Guests can search listings
  public query func searchListings(searchTerm : Text, itemType : ?ItemType, gender : ?Gender, schoolYear : ?Text, schoolName : ?Text, condition : ?Condition) : async [Listing] {
    Iter.toArray(
      Iter.filter(
        textMap.vals(listings),
        func(l : Listing) : Bool {
          let matchesSearchTerm = Text.contains(Text.toLowercase(l.title), #text(Text.toLowercase(searchTerm))) or Text.contains(Text.toLowercase(l.description), #text(Text.toLowercase(searchTerm)));
          let matchesItemType = switch (itemType) {
            case null true;
            case (?t) t == l.itemType;
          };
          let matchesGender = switch (gender) {
            case null true;
            case (?g) g == l.gender;
          };
          let matchesSchoolYear = switch (schoolYear) {
            case null true;
            case (?y) y == l.schoolYear;
          };
          let matchesSchoolName = switch (schoolName) {
            case null true;
            case (?n) Array.find<Text>(l.schoolNames, func(s) { Text.contains(Text.toLowercase(s), #text(Text.toLowercase(n))) }) != null;
          };
          let matchesCondition = switch (condition) {
            case null true;
            case (?c) c == l.condition;
          };
          matchesSearchTerm and matchesItemType and matchesGender and matchesSchoolYear and matchesSchoolName and matchesCondition;
        },
      )
    );
  };

  // Public access - Guests can get price suggestions before registration
  public query func getPriceSuggestion(retailPrice : Nat, itemType : ItemType, schoolName : Text, gender : Gender, schoolYear : Text) : async PriceSuggestion {
    let retailDiscountPrice = retailPrice / 2;

    let similarListings = Iter.toArray(
      Iter.filter(
        textMap.vals(listings),
        func(l : Listing) : Bool {
          l.itemType == itemType and Array.find<Text>(l.schoolNames, func(s) { s == schoolName }) != null and l.gender == gender and l.schoolYear == schoolYear and l.isActive == false
        },
      )
    );

    let averagePastSalePrice = if (similarListings.size() > 0) {
      let total = Array.foldLeft<Listing, Nat>(similarListings, 0, func(acc, l) { acc + l.price });
      ?(total / similarListings.size());
    } else {
      null;
    };

    {
      retailDiscountPrice;
      averagePastSalePrice;
    };
  };

  // Transactions - Track completed payments
  public type TransactionStatus = {
    #pending;
    #completed;
    #failed;
    #refunded;
    #dispatched;
    #received;
    #paymentReleased;
  };

  public type Transaction = {
    id : Text;
    listingId : Text;
    buyer : Principal;
    seller : Principal;
    amount : Nat;
    commission : Nat;
    listingFee : Nat;
    stripeSessionId : Text;
    status : TransactionStatus;
    createdAt : Time.Time;
    completedAt : ?Time.Time;
    dispatchedAt : ?Time.Time;
    receivedAt : ?Time.Time;
    paymentReleasedAt : ?Time.Time;
  };

  var transactions = textMap.empty<Transaction>();

  public shared ({ caller }) func recordTransaction(transaction : Transaction) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can record transactions");
    };

    // Only the buyer can create the initial transaction record
    if (transaction.buyer != caller) {
      Debug.trap("Unauthorized: Only the buyer can initiate a transaction");
    };

    // CRITICAL: Verify buyer has accepted current Terms and Conditions
    if (not hasAcceptedCurrentTerms(caller)) {
      Debug.trap("Unauthorized: You must accept the current Terms and Conditions before completing a purchase");
    };

    // Verify the listing exists and seller matches
    switch (textMap.get(listings, transaction.listingId)) {
      case null {
        Debug.trap("Listing not found");
      };
      case (?listing) {
        if (listing.seller != transaction.seller) {
          Debug.trap("Transaction seller does not match listing seller");
        };
        // Verify the buyer is not the seller
        if (transaction.buyer == transaction.seller) {
          Debug.trap("Cannot purchase your own listing");
        };
        // Verify the listing is active
        if (not listing.isActive) {
          Debug.trap("Cannot purchase inactive listing");
        };
      };
    };

    // Verify transaction doesn't already exist
    switch (textMap.get(transactions, transaction.id)) {
      case null {
        transactions := textMap.put(transactions, transaction.id, transaction);
      };
      case (?_) {
        Debug.trap("Transaction already exists");
      };
    };
  };

  public shared ({ caller }) func updateTransactionStatus(transactionId : Text, status : TransactionStatus, completedAt : ?Time.Time, dispatchedAt : ?Time.Time, receivedAt : ?Time.Time, paymentReleasedAt : ?Time.Time) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can update transactions");
    };

    switch (textMap.get(transactions, transactionId)) {
      case null {
        Debug.trap("Transaction not found");
      };
      case (?transaction) {
        // Verify caller is involved in the transaction or is admin
        if (transaction.buyer != caller and transaction.seller != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Debug.trap("Unauthorized: Can only update your own transactions");
        };

        // Enforce role-based status transitions
        switch (status) {
          case (#dispatched) {
            // Only seller can mark as dispatched
            if (transaction.seller != caller and not AccessControl.isAdmin(accessControlState, caller)) {
              Debug.trap("Unauthorized: Only the seller can mark item as dispatched");
            };
            // Must be in completed status first
            if (transaction.status != #completed) {
              Debug.trap("Invalid status transition: Item must be paid for before dispatch");
            };
          };
          case (#received) {
            // Only buyer can mark as received
            if (transaction.buyer != caller and not AccessControl.isAdmin(accessControlState, caller)) {
              Debug.trap("Unauthorized: Only the buyer can confirm receipt");
            };
            // Must be in dispatched status first
            if (transaction.status != #dispatched) {
              Debug.trap("Invalid status transition: Item must be dispatched before receipt confirmation");
            };
          };
          case (#paymentReleased) {
            // Only admin can mark payment as released (this should be automated)
            if (not AccessControl.isAdmin(accessControlState, caller)) {
              Debug.trap("Unauthorized: Only admins can release payments");
            };
            // Must be in received status first
            if (transaction.status != #received) {
              Debug.trap("Invalid status transition: Item must be received before payment release");
            };
          };
          case (#completed) {
            // Payment completion should be handled by Stripe webhook/admin
            if (not AccessControl.isAdmin(accessControlState, caller)) {
              Debug.trap("Unauthorized: Only admins can mark payment as completed");
            };
          };
          case (#failed or #refunded) {
            // Only admin can mark as failed or refunded
            if (not AccessControl.isAdmin(accessControlState, caller)) {
              Debug.trap("Unauthorized: Only admins can mark transactions as failed or refunded");
            };
          };
          case (#pending) {
            // Cannot revert to pending
            Debug.trap("Invalid status transition: Cannot revert to pending status");
          };
        };

        let updatedTransaction = {
          id = transaction.id;
          listingId = transaction.listingId;
          buyer = transaction.buyer;
          seller = transaction.seller;
          amount = transaction.amount;
          commission = transaction.commission;
          listingFee = transaction.listingFee;
          stripeSessionId = transaction.stripeSessionId;
          status;
          createdAt = transaction.createdAt;
          completedAt;
          dispatchedAt;
          receivedAt;
          paymentReleasedAt;
        };

        transactions := textMap.put(transactions, transactionId, updatedTransaction);
      };
    };
  };

  public query ({ caller }) func getTransaction(transactionId : Text) : async ?Transaction {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view transactions");
    };

    switch (textMap.get(transactions, transactionId)) {
      case null null;
      case (?transaction) {
        // Only buyer, seller, or admin can view
        if (transaction.buyer != caller and transaction.seller != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Debug.trap("Unauthorized: Can only view your own transactions");
        };
        ?transaction;
      };
    };
  };

  public query ({ caller }) func getTransactionsForUser() : async [Transaction] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view transactions");
    };

    Iter.toArray(
      Iter.filter(
        textMap.vals(transactions),
        func(t : Transaction) : Bool {
          t.buyer == caller or t.seller == caller;
        },
      )
    );
  };

  public query ({ caller }) func hasCompletedPaymentForListing(listingId : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can check payment status");
    };

    let completedTransaction = Array.find<Transaction>(
      Iter.toArray(textMap.vals(transactions)),
      func(t : Transaction) : Bool {
        t.listingId == listingId and t.buyer == caller and (t.status == #completed or t.status == #dispatched or t.status == #received or t.status == #paymentReleased)
      },
    );

    switch (completedTransaction) {
      case null false;
      case (?_) true;
    };
  };

  // Helper function to check if there's a completed transaction between two users
  private func hasCompletedTransactionBetweenUsers(user1 : Principal, user2 : Principal) : Bool {
    let completedTransaction = Array.find<Transaction>(
      Iter.toArray(textMap.vals(transactions)),
      func(t : Transaction) : Bool {
        (t.status == #completed or t.status == #dispatched or t.status == #received or t.status == #paymentReleased) and (
          (t.buyer == user1 and t.seller == user2) or (t.buyer == user2 and t.seller == user1)
        )
      },
    );

    switch (completedTransaction) {
      case null false;
      case (?_) true;
    };
  };

  // Messaging - Restricted until payment completion
  public type Message = {
    id : Text;
    sender : Principal;
    recipient : Principal;
    listingId : Text;
    content : Text;
    timestamp : Time.Time;
    isRead : Bool;
  };

  var messages = textMap.empty<Message>();

  public shared ({ caller }) func sendMessage(message : Message) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can send messages");
    };
    if (message.sender != caller) {
      Debug.trap("Unauthorized: Cannot send messages as another user");
    };

    // Verify the listing exists
    switch (textMap.get(listings, message.listingId)) {
      case null {
        Debug.trap("Listing not found");
      };
      case (?listing) {
        // Check if there's a completed payment for this listing
        // The buyer must have paid for the listing to message the seller
        let hasCompletedPayment = Array.find<Transaction>(
          Iter.toArray(textMap.vals(transactions)),
          func(t : Transaction) : Bool {
            t.listingId == message.listingId and (t.status == #completed or t.status == #dispatched or t.status == #received or t.status == #paymentReleased) and ((t.buyer == caller and t.seller == message.recipient) or (t.seller == caller and t.buyer == message.recipient))
          },
        );

        switch (hasCompletedPayment) {
          case null {
            Debug.trap("Unauthorized: Messaging is only available after completed payment through the platform");
          };
          case (?_) {
            // Payment verified, allow message
            messages := textMap.put(messages, message.id, message);
          };
        };
      };
    };
  };

  public query ({ caller }) func getMessagesForUser() : async [Message] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view messages");
    };
    Iter.toArray(
      Iter.filter(
        textMap.vals(messages),
        func(m : Message) : Bool {
          m.sender == caller or m.recipient == caller;
        },
      )
    );
  };

  public query ({ caller }) func getMessagesForListing(listingId : Text) : async [Message] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view messages");
    };

    // Verify payment before showing messages
    let hasCompletedPayment = Array.find<Transaction>(
      Iter.toArray(textMap.vals(transactions)),
      func(t : Transaction) : Bool {
        t.listingId == listingId and (t.status == #completed or t.status == #dispatched or t.status == #received or t.status == #paymentReleased) and (t.buyer == caller or t.seller == caller)
      },
    );

    switch (hasCompletedPayment) {
      case null {
        Debug.trap("Unauthorized: Messages only available after completed payment");
      };
      case (?_) {
        Iter.toArray(
          Iter.filter(
            textMap.vals(messages),
            func(m : Message) : Bool {
              m.listingId == listingId and (m.sender == caller or m.recipient == caller);
            },
          )
        );
      };
    };
  };

  // Payments
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // Track session ownership for authorization
  var sessionOwners = textMap.empty<Principal>();

  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can perform this action");
    };
    stripeConfig := ?config;
  };

  private func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case null Debug.trap("Stripe needs to be first configured");
      case (?value) value;
    };
  };

  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view session status");
    };

    // Verify session ownership
    switch (textMap.get(sessionOwners, sessionId)) {
      case null {
        Debug.trap("Session not found or unauthorized");
      };
      case (?owner) {
        if (owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Debug.trap("Unauthorized: Can only view your own session status");
        };
      };
    };

    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can create checkout sessions");
    };

    // CRITICAL: Verify buyer has accepted current Terms and Conditions before checkout
    if (not hasAcceptedCurrentTerms(caller)) {
      Debug.trap("Unauthorized: You must accept the current Terms and Conditions before completing a purchase");
    };

    let sessionId = await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);

    // Track session ownership
    sessionOwners := textMap.put(sessionOwners, sessionId, caller);

    sessionId;
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Seller Ratings and Reviews
  public type Review = {
    id : Text;
    seller : Principal;
    buyer : Principal;
    rating : Nat; // 1-5 stars
    comment : Text;
    transactionId : Text;
    createdAt : Time.Time;
  };

  var reviews = textMap.empty<Review>();

  public shared ({ caller }) func submitReview(review : Review) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can submit reviews");
    };
    if (review.buyer != caller) {
      Debug.trap("Unauthorized: Cannot submit reviews as another user");
    };
    if (review.rating < 1 or review.rating > 5) {
      Debug.trap("Rating must be between 1 and 5 stars");
    };

    // Verify the transaction exists and is completed
    switch (textMap.get(transactions, review.transactionId)) {
      case null {
        Debug.trap("Transaction not found");
      };
      case (?transaction) {
        if (transaction.buyer != caller) {
          Debug.trap("Unauthorized: Can only review your own purchases");
        };
        if (transaction.seller != review.seller) {
          Debug.trap("Review seller does not match transaction seller");
        };
        if (transaction.status != #completed and transaction.status != #dispatched and transaction.status != #received and transaction.status != #paymentReleased) {
          Debug.trap("Cannot review incomplete transactions");
        };
      };
    };

    // Prevent duplicate reviews for the same transaction
    let existingReview = Array.find<Review>(
      Iter.toArray(textMap.vals(reviews)),
      func(r : Review) : Bool {
        r.transactionId == review.transactionId
      },
    );

    switch (existingReview) {
      case null {
        reviews := textMap.put(reviews, review.id, review);
      };
      case (?_) {
        Debug.trap("Review already submitted for this transaction");
      };
    };
  };

  // Public access - Guests can view seller reviews for marketplace transparency
  public query func getReviewsForSeller(seller : Principal) : async [Review] {
    Iter.toArray(
      Iter.filter(
        textMap.vals(reviews),
        func(r : Review) : Bool {
          r.seller == seller;
        },
      )
    );
  };

  // Public access - Guests can view seller ratings for marketplace transparency
  public query func getAverageRatingForSeller(seller : Principal) : async ?Nat {
    let sellerReviews = Iter.toArray(
      Iter.filter(
        textMap.vals(reviews),
        func(r : Review) : Bool {
          r.seller == seller;
        },
      )
    );

    if (sellerReviews.size() == 0) {
      return null;
    };

    let total = Array.foldLeft<Review, Nat>(sellerReviews, 0, func(acc, r) { acc + r.rating });
    ?(total / sellerReviews.size());
  };

  // Public access - Guests can view review counts for marketplace transparency
  public query func getReviewCountForSeller(seller : Principal) : async Nat {
    let sellerReviews = Iter.toArray(
      Iter.filter(
        textMap.vals(reviews),
        func(r : Review) : Bool {
          r.seller == seller;
        },
      )
    );

    sellerReviews.size();
  };

  // Public access - Guests can view recent reviews for marketplace transparency
  public query func getRecentReviewsForSeller(seller : Principal, count : Nat) : async [Review] {
    let sellerReviews = Iter.toArray(
      Iter.filter(
        textMap.vals(reviews),
        func(r : Review) : Bool {
          r.seller == seller;
        },
      )
    );

    let sortedReviews = Array.sort<Review>(
      sellerReviews,
      func(a : Review, b : Review) : { #less; #equal; #greater } {
        if (a.createdAt > b.createdAt) { #less } else if (a.createdAt < b.createdAt) { #greater } else {
          #equal;
        };
      },
    );

    let takeCount = if (count > sortedReviews.size()) { sortedReviews.size() } else { count };
    Array.tabulate<Review>(takeCount, func(i) { sortedReviews[i] });
  };

  // Public access - Fee calculation is public information
  public query func calculateCommissionAndFee(amount : Nat) : async {
    commission : Nat;
    listingFee : Nat;
    totalDeductions : Nat;
    sellerReceives : Nat;
  } {
    let commission = (amount * 5) / 100; // 5% commission
    let listingFee = 150; // £1.50 listing fee in pence
    let totalDeductions = commission + listingFee;
    let sellerReceives = if (amount >= totalDeductions) { amount - totalDeductions } else { 0 };

    {
      commission;
      listingFee;
      totalDeductions;
      sellerReceives;
    };
  };
};

