import { useState, useEffect } from 'react';
import { useNavigate, useSearch, Link } from '@tanstack/react-router';
import { useCreateListing, useUpdateListing, useGetListing, useGetPriceSuggestion, useGetSchoolNames, useGetTermsAndConditions, useHasAcceptedTermsAndConditions, useAcceptTermsAndConditions } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import ImageUpload from '../components/ImageUpload';
import TermsAcceptanceCheckbox from '../components/TermsAcceptanceCheckbox';
import { toast } from 'sonner';
import { ArrowLeft, AlertCircle, Lightbulb, TrendingUp, Calculator, BookOpen, X, Package } from 'lucide-react';

const itemTypeOptions: { value: string; label: string; type: ItemType }[] = [
  { value: 'trousers', label: 'Trousers', type: { __kind__: 'trousers', trousers: null } },
  { value: 'jackets', label: 'Jackets', type: { __kind__: 'jackets', jackets: null } },
  { value: 'blazers', label: 'Blazers', type: { __kind__: 'blazers', blazers: null } },
  { value: 'shirts', label: 'Shirts', type: { __kind__: 'shirts', shirts: null } },
  { value: 'skirts', label: 'Skirts', type: { __kind__: 'skirts', skirts: null } },
  { value: 'ties', label: 'Ties', type: { __kind__: 'ties', ties: null } },
  { value: 'sportsShorts', label: 'Sports Shorts', type: { __kind__: 'sportsShorts', sportsShorts: null } },
  { value: 'sportsShirts', label: 'Sports Shirts', type: { __kind__: 'sportsShirts', sportsShirts: null } },
  { value: 'coat', label: 'Coat', type: { __kind__: 'coat', coat: null } },
  { value: 'jumper', label: 'Jumper', type: { __kind__: 'jumper', jumper: null } },
  { value: 'shoes', label: 'Shoes', type: { __kind__: 'shoes', shoes: null } },
];

const schoolYearOptions = [
  'Years 3-4',
  'Years 5-6',
  'Years 7-8',
  'Years 9-10',
  'Years 11-13',
];

export default function CreateListingPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: '/create-listing' });
  const editListingId = (search as any)?.edit;
  const { data: existingListing } = useGetListing(editListingId || '');
  const { data: schoolNames = [] } = useGetSchoolNames();
  const { data: terms } = useGetTermsAndConditions();
  const { data: hasAccepted } = useHasAcceptedTermsAndConditions(terms?.version || null);
  const acceptTerms = useAcceptTermsAndConditions();
  
  const createListing = useCreateListing();
  const updateListing = useUpdateListing();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [customSchoolName, setCustomSchoolName] = useState('');
  const [gender, setGender] = useState<string>('');
  const [schoolYear, setSchoolYear] = useState('');
  const [itemType, setItemType] = useState<string>('');
  const [otherItemType, setOtherItemType] = useState('');
  const [condition, setCondition] = useState<Condition>(Condition.newOrAsNew);
  const [price, setPrice] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  const [photos, setPhotos] = useState<ExternalBlob[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Size measurements
  const [waistSize, setWaistSize] = useState('');
  const [insideLeg, setInsideLeg] = useState('');
  const [chestSize, setChestSize] = useState('');
  const [collarSize, setCollarSize] = useState('');
  const [sleeveLength, setSleeveLength] = useState('');
  const [coatJumperSize, setCoatJumperSize] = useState('');
  const [shoeSize, setShoeSize] = useState('');

  const isEditing = !!editListingId;

  // Build ItemType for price suggestion
  let selectedItemType: ItemType | null = null;
  if (itemType === 'other' && otherItemType.trim()) {
    selectedItemType = { __kind__: 'other', other: otherItemType.trim() };
  } else if (itemType && itemType !== 'other') {
    const option = itemTypeOptions.find(opt => opt.value === itemType);
    selectedItemType = option ? option.type : null;
  }

  // Build Gender for price suggestion
  const selectedGender: Gender | null = gender === 'boys' ? Gender.boys : gender === 'girls' ? Gender.girls : null;

  // Parse numeric values
  const retailPriceNum = retailPrice ? parseFloat(retailPrice) : 0;
  const firstSchoolName = selectedSchools.length > 0 ? selectedSchools[0] : '';

  // Fetch price suggestion (using first school for suggestion)
  const { data: priceSuggestion, isLoading: loadingSuggestion } = useGetPriceSuggestion(
    retailPriceNum,
    selectedItemType,
    firstSchoolName,
    selectedGender,
    schoolYear,
    !isEditing // Only fetch for new listings
  );

  useEffect(() => {
    if (existingListing && isEditing) {
      setTitle(existingListing.title);
      setDescription(existingListing.description);
      setSelectedSchools(existingListing.schoolNames);
      setGender(existingListing.gender);
      setSchoolYear(existingListing.schoolYear);
      
      // Handle item type
      if (existingListing.itemType.__kind__ === 'other') {
        setItemType('other');
        setOtherItemType(existingListing.itemType.other);
      } else {
        setItemType(existingListing.itemType.__kind__);
      }
      
      setCondition(existingListing.condition);
      setPrice((Number(existingListing.price) / 100).toString());
      setPhotos(existingListing.photos);

      // Set size measurements
      if (existingListing.sizeMeasurements.waistSize !== undefined) {
        setWaistSize(Number(existingListing.sizeMeasurements.waistSize).toString());
      }
      if (existingListing.sizeMeasurements.insideLeg !== undefined) {
        setInsideLeg(Number(existingListing.sizeMeasurements.insideLeg).toString());
      }
      if (existingListing.sizeMeasurements.chestSize !== undefined) {
        setChestSize(Number(existingListing.sizeMeasurements.chestSize).toString());
      }
      if (existingListing.sizeMeasurements.collarSize !== undefined) {
        setCollarSize(Number(existingListing.sizeMeasurements.collarSize).toString());
      }
      if (existingListing.sizeMeasurements.sleeveLength !== undefined) {
        setSleeveLength(Number(existingListing.sizeMeasurements.sleeveLength).toString());
      }
      if (existingListing.sizeMeasurements.coatJumperSize !== undefined) {
        setCoatJumperSize(existingListing.sizeMeasurements.coatJumperSize);
      }
      if (existingListing.sizeMeasurements.shoeSize !== undefined) {
        setShoeSize(Number(existingListing.sizeMeasurements.shoeSize).toString());
      }
    }
  }, [existingListing, isEditing]);

  // Set terms accepted if already accepted
  useEffect(() => {
    if (hasAccepted) {
      setTermsAccepted(true);
    }
  }, [hasAccepted]);

  if (!identity) {
    return (
      <div className="container flex min-h-[400px] items-center justify-center py-8">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold">Login Required</h2>
          <p className="text-muted-foreground">Please log in to create a listing</p>
        </div>
      </div>
    );
  }

  const handleAddSchool = (schoolName: string) => {
    if (schoolName && !selectedSchools.includes(schoolName)) {
      setSelectedSchools([...selectedSchools, schoolName]);
    }
  };

  const handleRemoveSchool = (schoolName: string) => {
    setSelectedSchools(selectedSchools.filter(s => s !== schoolName));
  };

  const handleAddCustomSchool = () => {
    const trimmed = customSchoolName.trim();
    if (trimmed && !selectedSchools.includes(trimmed)) {
      setSelectedSchools([...selectedSchools, trimmed]);
      setCustomSchoolName('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || selectedSchools.length === 0 || !gender || !schoolYear || !itemType || !price) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (itemType === 'other' && !otherItemType.trim()) {
      toast.error('Please specify the item type');
      return;
    }

    if (photos.length === 0) {
      toast.error('Please add at least one photo');
      return;
    }

    const priceInPence = Math.round(parseFloat(price) * 100);
    if (isNaN(priceInPence) || priceInPence <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    // Check terms acceptance for new listings
    if (!isEditing && !termsAccepted) {
      toast.error('You must accept the Terms and Conditions before publishing a listing');
      return;
    }

    // Accept terms if not already accepted
    if (!isEditing && termsAccepted && !hasAccepted && terms) {
      try {
        await acceptTerms.mutateAsync(terms.version);
      } catch (error: any) {
        toast.error('Failed to accept Terms and Conditions. Please try again.');
        console.error(error);
        return;
      }
    }

    // Build ItemType
    let finalItemType: ItemType;
    if (itemType === 'other') {
      finalItemType = { __kind__: 'other', other: otherItemType.trim() };
    } else {
      const option = itemTypeOptions.find(opt => opt.value === itemType);
      finalItemType = option!.type;
    }

    // Build Gender - use enum value
    const finalGender: Gender = gender === 'boys' ? Gender.boys : Gender.girls;

    // Build size measurements
    const sizeMeasurements: SizeMeasurements = {
      waistSize: waistSize ? BigInt(parseInt(waistSize)) : undefined,
      insideLeg: insideLeg ? BigInt(parseInt(insideLeg)) : undefined,
      chestSize: chestSize ? BigInt(parseInt(chestSize)) : undefined,
      collarSize: collarSize ? BigInt(parseInt(collarSize)) : undefined,
      sleeveLength: sleeveLength ? BigInt(parseInt(sleeveLength)) : undefined,
      coatJumperSize: coatJumperSize || undefined,
      shoeSize: shoeSize ? BigInt(parseInt(shoeSize)) : undefined,
    };

    const listing: Listing = {
      id: isEditing ? editListingId : `listing-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      seller: identity.getPrincipal(),
      title,
      description,
      schoolNames: selectedSchools,
      gender: finalGender,
      schoolYear,
      itemType: finalItemType,
      condition,
      price: BigInt(priceInPence),
      photos,
      sizeMeasurements,
      createdAt: BigInt(Date.now() * 1000000),
      isActive: true,
    };

    try {
      if (isEditing) {
        await updateListing.mutateAsync(listing);
        toast.success('Listing updated successfully!');
      } else {
        await createListing.mutateAsync(listing);
        toast.success('Listing created successfully!');
      }
      navigate({ to: '/my-listings' });
    } catch (error: any) {
      if (error.message?.includes('Terms and Conditions')) {
        toast.error('You must accept the current Terms and Conditions before publishing a listing');
      } else {
        toast.error(isEditing ? 'Failed to update listing' : 'Failed to create listing');
      }
      console.error(error);
    }
  };

  const handleUseSuggestedPrice = (suggestedPrice: number) => {
    setPrice(suggestedPrice.toFixed(2));
    toast.success('Price updated with suggestion');
  };

  // Determine which size fields to show based on item type
  const showWaistSize = itemType === 'trousers' || itemType === 'skirts' || itemType === 'sportsShorts';
  const showInsideLeg = itemType === 'trousers';
  const showChestSize = itemType === 'jackets' || itemType === 'blazers' || itemType === 'sportsShirts';
  const showCollarSize = itemType === 'shirts';
  const showSleeveLength = itemType === 'shirts';
  const showCoatJumperSize = itemType === 'coat' || itemType === 'jumper';
  const showShoeSize = itemType === 'shoes';

  return (
    <div className="container py-8">
      <Button variant="ghost" onClick={() => navigate({ to: '/my-listings' })} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to My Listings
      </Button>

      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-start gap-4 rounded-lg border bg-muted/30 p-4">
          <img 
            src="/assets/generated/sue-mascot-new.png" 
            alt="Sue" 
            className="h-16 w-16 flex-shrink-0 rounded-full border-2 border-primary/20 object-cover"
          />
          <div className="flex-1">
            <h3 className="mb-1 font-semibold text-primary">Sue's Tips for Creating a Great Listing</h3>
            <p className="text-sm text-muted-foreground">
              Include clear photos, accurate descriptions, and all the details buyers need. Use the pricing suggestions below to help set a competitive price!
            </p>
            <Link to="/seller-tips">
              <Button variant="link" size="sm" className="mt-1 h-auto p-0 text-primary">
                <BookOpen className="mr-1 h-3 w-3" />
                View Full Seller Tips & Guides
              </Button>
            </Link>
          </div>
        </div>

        <Alert className="mb-6 border-primary/30 bg-primary/5">
          <AlertCircle className="h-4 w-4 text-primary" />
          <AlertDescription className="text-sm">
            <strong>Important:</strong> All items must be washed or dry-cleaned if necessary before listing. Items must match the condition you describe. We do not accept damaged or very worn items on the platform. A £1.50 listing fee applies to each item.
          </AlertDescription>
        </Alert>

        <Alert className="mb-6 border-primary/30 bg-primary/5">
          <Package className="h-4 w-4 text-primary" />
          <AlertDescription className="text-sm">
            <strong>Postage Reminder:</strong> You are responsible for arranging and paying for delivery. Please include delivery costs in your asking price. <Link to="/postage-packing" className="text-primary underline hover:text-primary/80">Learn more about postage policy</Link>
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Listing' : 'Create New Listing'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Navy Blue School Blazer"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the item, including brand, size, and any relevant details..."
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>School Names * (select multiple or add custom)</Label>
                <div className="space-y-3">
                  {/* Selected schools display */}
                  {selectedSchools.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedSchools.map((school) => (
                        <Badge key={school} variant="secondary" className="gap-1 pr-1">
                          {school}
                          <button
                            type="button"
                            onClick={() => handleRemoveSchool(school)}
                            className="ml-1 rounded-full hover:bg-muted"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* School dropdown */}
                  <Select value="" onValueChange={handleAddSchool}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select school(s) from list" />
                    </SelectTrigger>
                    <SelectContent>
                      {schoolNames.map((name) => (
                        <SelectItem 
                          key={name} 
                          value={name}
                          disabled={selectedSchools.includes(name)}
                        >
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Custom school input */}
                  <div className="flex gap-2">
                    <Input
                      value={customSchoolName}
                      onChange={(e) => setCustomSchoolName(e.target.value)}
                      placeholder="Or enter custom school name"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomSchool();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddCustomSchool}
                      disabled={!customSchoolName.trim()}
                    >
                      Add
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You can select multiple schools or add custom school names
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={gender} onValueChange={setGender} required>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boys">Boys</SelectItem>
                      <SelectItem value="girls">Girls</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolYear">School Year *</Label>
                  <Select value={schoolYear} onValueChange={setSchoolYear} required>
                    <SelectTrigger id="schoolYear">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {schoolYearOptions.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="itemType">Item Type *</Label>
                <Select value={itemType} onValueChange={setItemType} required>
                  <SelectTrigger id="itemType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {itemTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {itemType === 'other' && (
                <div className="space-y-2">
                  <Label htmlFor="otherItemType">Specify Item Type *</Label>
                  <Input
                    id="otherItemType"
                    value={otherItemType}
                    onChange={(e) => setOtherItemType(e.target.value)}
                    placeholder="e.g., Hat, Scarf, etc."
                    required
                  />
                </div>
              )}

              {/* Size measurements based on item type */}
              {(showWaistSize || showInsideLeg || showChestSize || showCollarSize || showSleeveLength || showCoatJumperSize || showShoeSize) && (
                <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
                  <h4 className="font-semibold">Size Measurements</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {showWaistSize && (
                      <div className="space-y-2">
                        <Label htmlFor="waistSize">Waist Size (inches)</Label>
                        <Input
                          id="waistSize"
                          type="number"
                          min="1"
                          value={waistSize}
                          onChange={(e) => setWaistSize(e.target.value)}
                          placeholder="e.g., 28"
                        />
                      </div>
                    )}
                    {showInsideLeg && (
                      <div className="space-y-2">
                        <Label htmlFor="insideLeg">Inside Leg (inches)</Label>
                        <Input
                          id="insideLeg"
                          type="number"
                          min="1"
                          value={insideLeg}
                          onChange={(e) => setInsideLeg(e.target.value)}
                          placeholder="e.g., 30"
                        />
                      </div>
                    )}
                    {showChestSize && (
                      <div className="space-y-2">
                        <Label htmlFor="chestSize">Chest Size (inches)</Label>
                        <Input
                          id="chestSize"
                          type="number"
                          min="1"
                          value={chestSize}
                          onChange={(e) => setChestSize(e.target.value)}
                          placeholder="e.g., 36"
                        />
                      </div>
                    )}
                    {showCollarSize && (
                      <div className="space-y-2">
                        <Label htmlFor="collarSize">Collar Size (inches)</Label>
                        <Input
                          id="collarSize"
                          type="number"
                          min="1"
                          value={collarSize}
                          onChange={(e) => setCollarSize(e.target.value)}
                          placeholder="e.g., 15"
                        />
                      </div>
                    )}
                    {showSleeveLength && (
                      <div className="space-y-2">
                        <Label htmlFor="sleeveLength">Sleeve Length (inches)</Label>
                        <Input
                          id="sleeveLength"
                          type="number"
                          min="1"
                          value={sleeveLength}
                          onChange={(e) => setSleeveLength(e.target.value)}
                          placeholder="e.g., 32"
                        />
                      </div>
                    )}
                    {showCoatJumperSize && (
                      <div className="space-y-2">
                        <Label htmlFor="coatJumperSize">Size</Label>
                        <Select value={coatJumperSize} onValueChange={setCoatJumperSize}>
                          <SelectTrigger id="coatJumperSize">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Large">Large</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Small">Small</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {showShoeSize && (
                      <div className="space-y-2">
                        <Label htmlFor="shoeSize">UK Shoe Size</Label>
                        <Input
                          id="shoeSize"
                          type="number"
                          min="1"
                          step="0.5"
                          value={shoeSize}
                          onChange={(e) => setShoeSize(e.target.value)}
                          placeholder="e.g., 8"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="condition">Condition *</Label>
                <Select value={condition} onValueChange={(value) => setCondition(value as Condition)} required>
                  <SelectTrigger id="condition">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Condition.newOrAsNew}>New or As New</SelectItem>
                    <SelectItem value={Condition.excellent}>Excellent</SelectItem>
                    <SelectItem value={Condition.slightlyWorn}>Slightly Worn</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {!isEditing && (
                <div className="space-y-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <div className="flex-1">
                      <h4 className="mb-1 font-semibold text-primary">Sue's Pricing Assistant</h4>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Let me help you set a competitive price! Enter the retail price below to see pricing suggestions. Remember to include delivery costs in your price.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="retailPrice">New Retail Price (£)</Label>
                    <Input
                      id="retailPrice"
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={retailPrice}
                      onChange={(e) => setRetailPrice(e.target.value)}
                      placeholder="e.g., 40.00"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the original retail price when new to get pricing suggestions
                    </p>
                  </div>

                  {priceSuggestion && retailPriceNum > 0 && (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-start gap-3 rounded-md border bg-background p-3">
                        <Calculator className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <div className="flex-1">
                          <div className="mb-1 flex items-center justify-between">
                            <h5 className="font-medium">Retail Discount Price</h5>
                            <span className="text-lg font-bold text-primary">
                              £{(Number(priceSuggestion.retailDiscountPrice) / 100).toFixed(2)}
                            </span>
                          </div>
                          <p className="mb-2 text-xs text-muted-foreground">
                            Based on 50% discount from retail price
                          </p>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleUseSuggestedPrice(Number(priceSuggestion.retailDiscountPrice) / 100)}
                          >
                            Use This Price
                          </Button>
                        </div>
                      </div>

                      {priceSuggestion.averagePastSalePrice !== undefined && (
                        <div className="flex items-start gap-3 rounded-md border bg-background p-3">
                          <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <div className="flex-1">
                            <div className="mb-1 flex items-center justify-between">
                              <h5 className="font-medium">Average Market Price</h5>
                              <span className="text-lg font-bold text-primary">
                                £{(Number(priceSuggestion.averagePastSalePrice) / 100).toFixed(2)}
                              </span>
                            </div>
                            <p className="mb-2 text-xs text-muted-foreground">
                              Based on past sales of similar items from the same school
                            </p>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => handleUseSuggestedPrice(Number(priceSuggestion.averagePastSalePrice) / 100)}
                            >
                              Use This Price
                            </Button>
                          </div>
                        </div>
                      )}

                      {priceSuggestion.averagePastSalePrice === undefined && (
                        <div className="rounded-md border border-muted bg-muted/30 p-3">
                          <p className="text-xs text-muted-foreground">
                            <strong>Note:</strong> No past sales data available for similar items. The retail discount price is a good starting point!
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {loadingSuggestion && retailPriceNum > 0 && selectedItemType && selectedGender && firstSchoolName && schoolYear && (
                    <div className="rounded-md border bg-background p-3 text-center text-sm text-muted-foreground">
                      Loading pricing suggestions...
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="price">Your Price (£) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="10.00"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Set your final selling price including delivery costs. You can use the suggestions above or set your own price.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Photos * (at least 1 required, up to 5)</Label>
                <ImageUpload images={photos} onChange={setPhotos} maxImages={5} />
                <p className="text-sm text-muted-foreground">
                  At least one photo is required. Clear photos help your items sell faster!
                </p>
              </div>

              {!isEditing && terms && (
                <TermsAcceptanceCheckbox
                  checked={termsAccepted}
                  onCheckedChange={setTermsAccepted}
                  context="listing"
                />
              )}

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => navigate({ to: '/my-listings' })} className="flex-1">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={createListing.isPending || updateListing.isPending || acceptTerms.isPending || (!isEditing && !termsAccepted)}
                >
                  {createListing.isPending || updateListing.isPending || acceptTerms.isPending
                    ? isEditing
                      ? 'Updating...'
                      : 'Creating...'
                    : isEditing
                    ? 'Update Listing'
                    : 'Create Listing'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
