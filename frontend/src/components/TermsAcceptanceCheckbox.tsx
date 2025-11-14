import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Link } from '@tanstack/react-router';

interface TermsAcceptanceCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  context: 'listing' | 'purchase';
}

export default function TermsAcceptanceCheckbox({ checked, onCheckedChange, context }: TermsAcceptanceCheckboxProps) {
  const contextText = context === 'listing' 
    ? 'publishing a listing' 
    : 'completing this purchase';

  return (
    <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
      <Checkbox 
        id="terms-acceptance" 
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="mt-1"
      />
      <div className="flex-1">
        <Label 
          htmlFor="terms-acceptance" 
          className="cursor-pointer text-sm font-medium leading-relaxed"
        >
          I have read and agree to the{' '}
          <Link 
            to="/terms-and-conditions" 
            className="text-primary underline hover:text-primary/80"
            target="_blank"
          >
            Terms and Conditions
          </Link>
          {' '}before {contextText}
        </Label>
        <p className="mt-1 text-xs text-muted-foreground">
          You must accept the Terms and Conditions to proceed
        </p>
      </div>
    </div>
  );
}
