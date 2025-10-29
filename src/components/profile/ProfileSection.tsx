import React from 'react';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { MembershipTiers } from './MembershipTiers';

interface ProfileSectionProps {
  user: {
    name: string;
    email: string;
    phone?: string;
    memberSince?: string;
    currentTier: 'gold' | 'silver' | 'entry';
  };
  onUpgradeTier?: (tier: 'gold' | 'silver' | 'entry') => void;
}

export function ProfileSection({ user, onUpgradeTier }: ProfileSectionProps) {
  return (
    <div style={styles.container}>
      <div style={styles.profileHeader}>
        <div style={styles.avatarContainer}>
          <User size={32} color="#ffffff" />
        </div>
        <div style={styles.profileInfo}>
          <h2 style={styles.userName}>{user.name}</h2>
          <div style={styles.userDetail}>
            <Mail size={14} />
            <span>{user.email}</span>
          </div>
          {user.phone && (
            <div style={styles.userDetail}>
              <Phone size={14} />
              <span>{user.phone}</span>
            </div>
          )}
          {user.memberSince && (
            <div style={styles.userDetail}>
              <Calendar size={14} />
              <span>Member since {user.memberSince}</span>
            </div>
          )}
        </div>
      </div>

      <div style={styles.divider} />

      <MembershipTiers 
        currentTier={user.currentTier}
        onUpgrade={onUpgradeTier}
      />
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#ffffff',
  },
  profileHeader: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
  },
  avatarContainer: {
    width: '64px',
    height: '64px',
    borderRadius: '12px',
    backgroundColor: '#22c55e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
    flex: 1,
  },
  userName: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
  },
  userDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#6b7280',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    marginBottom: '20px',
  },
} as const;

export function ProfileSectionExample() {
  const handleUpgrade = (tier: 'gold' | 'silver' | 'entry') => {
    console.log('Upgrading to:', tier);
    // Handle tier upgrade logic if not on gold already
  };

  return (
    <ProfileSection
      user={{
        name: 'David Gale',
        email: 'mrdavidmgale@gmail.com',
        phone: '+44 7727 664517',
        memberSince: 'Oct 2025',
        currentTier: 'gold',
      }}
      onUpgradeTier={handleUpgrade}
    />
  );
}