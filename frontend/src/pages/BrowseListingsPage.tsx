import { useState, useMemo } from 'react';
import { useGetListings } from '../hooks/useQueries';
import ListingCard from '../components/ListingCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

const itemTypeOptions = [
  { value: 'trousers', label: 'Trousers' },
  { value: 'jackets', label: 'Jackets' },
  { value: 'blazers', label: 'Blazers' },
  { value: 'shirts', label: 'Shirts' },
  { value: 'skirts', label: 'Skirts' },
  { value: 'ties', label: 'Ties' },
  { value: 'sportsShorts', label: 'Sports Shorts' },
  { value: 'sportsShirts', label: 'Sports Shirts' },
  { value: 'coat', label: 'Coat' },
  { value: 'jumper', label: 'Jumper' },
  { value: 'shoes', label: 'Shoes' },
];

const schoolYearOptions = [
  'Years 3-4',
  'Years 5-6',
  'Years 7-8',
  'Years 9-10',
  'Years 11-13',
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

export default function BrowseListingsPage() {
  const { data: listings = [], isLoading } = useGetListings();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemType, setSelectedItemType] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedSchoolYear, setSelectedSchoolYear] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [schoolNameFilter, setSchoolNameFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredAndSortedListings = useMemo(() => {
    let filtered = listings.filter((listing) => {
      if (!listing.isActive) return false;

      const matchesSearch =
        searchQuery === '' ||
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesItemType = selectedItemType === 'all' || listing.itemType.__kind__ === selectedItemType;
      const matchesGender = selectedGender === 'all' || listing.gender === selectedGender;
      const matchesSchoolYear = selectedSchoolYear === 'all' || listing.schoolYear === selectedSchoolYear;
      const matchesCondition = selectedCondition === 'all' || listing.condition === selectedCondition;
      const matchesSchoolName = schoolNameFilter === '' || listing.schoolNames.some(school => 
        school.toLowerCase().includes(schoolNameFilter.toLowerCase())
      );

      return matchesSearch && matchesItemType && matchesGender && matchesSchoolYear && matchesCondition && matchesSchoolName;
    });

    // Sort listings
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return Number(b.createdAt) - Number(a.createdAt);
        case 'oldest':
          return Number(a.createdAt) - Number(b.createdAt);
        case 'price-low':
          return Number(a.price) - Number(b.price);
        case 'price-high':
          return Number(b.price) - Number(a.price);
        default:
          return 0;
      }
    });

    return filtered;
  }, [listings, searchQuery, selectedItemType, selectedGender, selectedSchoolYear, selectedCondition, schoolNameFilter, sortBy]);

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Browse School Uniforms</h1>

      <div className="mb-8 space-y-4 rounded-lg border bg-card p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
  type="text"
  placeholder="Filter by school name..."
  value={schoolNameFilter}
  onChange={(e) => setSchoolNameFilter(e.target.value)}
  className="border border-gray-300 rounded px-2 py-1 w-full"
/>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>School Name</Label>
            <input
  type="text"
  placeholder="Filter by school name..."
  value={schoolNameFilter}
  onChange={(e) => setSchoolNameFilter(e.target.value)}
  className="border border-gray-300 rounded px-2 py-1 w-full"
/>
          </div>

          <div className="space-y-2">
            <Label>Item Type</Label>
            <Select value={selectedItemType} onValueChange={setSelectedItemType}>
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {itemTypeOptions.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>School Year</Label>
            <Select value={selectedSchoolYear} onValueChange={setSelectedSchoolYear}>
              <SelectTrigger>
                <SelectValue placeholder="All years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All years</SelectItem>
                {schoolYearOptions.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Condition</Label>
            <Select value={selectedCondition} onValueChange={setSelectedCondition}>
              <SelectTrigger>
                <SelectValue placeholder="All conditions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All conditions</SelectItem>
                <SelectItem value="newOrAsNew">New or As New</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="slightlyWorn">Slightly Worn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <Select value={selectedGender} onValueChange={setSelectedGender}>
              <SelectTrigger>
                <SelectValue placeholder="All genders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All genders</SelectItem>
                <SelectItem value={Gender.boys}>Boys</SelectItem>
                <SelectItem value={Gender.girls}>Girls</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-96 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : filteredAndSortedListings.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <p className="mb-2 text-lg font-medium">No uniforms found</p>
          <p className="text-muted-foreground">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {filteredAndSortedListings.length} {filteredAndSortedListings.length === 1 ? 'item' : 'items'}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
