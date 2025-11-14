import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Listing, Condition, ItemType, Gender } from '../backend';
import { useState, useEffect } from 'react';

interface ListingCardProps {
  listing: Listing;
}

const conditionLabels: Record<Condition, string> = {
  newOrAsNew: 'New or As New',
  excellent: 'Excellent',
  slightlyWorn: 'Slightly Worn',
};

const conditionColors: Record<Condition, string> = {
  newOrAsNew: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  excellent: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  slightlyWorn: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
};

function getItemTypeLabel(itemType: ItemType): string {
  switch (itemType.__kind__) {
    case 'trousers':
      return 'Trousers';
    case 'jackets':
      return 'Jackets';
    case 'blazers':
      return 'Blazers';
    case 'shirts':
      return 'Shirts';
    case 'skirts':
      return 'Skirts';
    case 'ties':
      return 'Ties';
    case 'sportsShorts':
      return 'Sports Shorts';
    case 'sportsShirts':
      return 'Sports Shirts';
    case 'coat':
      return 'Coat';
    case 'jumper':
      return 'Jumper';
    case 'shoes':
      return 'Shoes';
    case 'other':
      return itemType.other;
    default:
      return 'Unknown';
  }
}

function getGenderLabel(gender: Gender): string {
  return gender === 'boys' ? 'Boys' : 'Girls';
}

export default function ListingCard({ listing }: ListingCardProps) {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (listing.photos.length > 0) {
      const url = listing.photos[0].getDirectURL();
      setImageUrl(url);
    }
  }, [listing.photos]);

  const genderLabel = getGenderLabel(listing.gender);
  const schoolsDisplay = listing.schoolNames.join(', ');

  return (
    <Link to="/listing/$listingId" params={{ listingId: listing.id }}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="aspect-square overflow-hidden bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={listing.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">No image</div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 line-clamp-1 font-semibold">{listing.title}</h3>
          <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">{listing.description}</p>
          <div className="mb-2 text-xs text-muted-foreground line-clamp-1">
            {schoolsDisplay}
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              {getItemTypeLabel(listing.itemType)}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {genderLabel}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {listing.schoolYear}
            </Badge>
            <Badge className={`text-xs ${conditionColors[listing.condition]}`}>
              {conditionLabels[listing.condition]}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <span className="text-xl font-bold text-primary">£{Number(listing.price) / 100}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
