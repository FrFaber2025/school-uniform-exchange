import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { toast } from 'sonner';

interface ProfileSetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProfileSetupModal({ open, onOpenChange }: ProfileSetupModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !address.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await saveProfile.mutateAsync({ name, email, address });
      toast.success('Profile created successfully!');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to create profile');
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="mb-4 flex justify-center">
            <img 
              src="/assets/generated/sue-mascot-new.png" 
              alt="Sue welcomes you" 
              className="h-20 w-20 rounded-full border-2 border-primary/20 object-cover"
            />
          </div>
          <DialogTitle className="text-center">Welcome to SUE!</DialogTitle>
          <DialogDescription className="text-center">
            Hi! I'm Sue, your friendly guide. Let's set up your profile so you can start buying and selling uniforms!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <input
  type="text"
  placeholder="Enter your name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="border border-gray-300 rounded px-2 py-1 w-full"
/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <input
  type="text"
  placeholder="Enter your name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="border border-gray-300 rounded px-2 py-1 w-full"
/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Postal Address</Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full postal address"
              rows={3}
              required
            />
          </div>
          <button
  type="submit"
  disabled={saveProfile.isPending}
  className="w-full bg-burgundy text-white font-semibold py-2 px-4 rounded hover:bg-burgundy/90"
>
  {saveProfile.isPending ? 'Creating Profile...' : 'Complete Profile'}
</button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
