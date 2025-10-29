import React, { useState } from 'react';
import { Check, Crown, Award, User, ChevronDown, ChevronUp } from 'lucide-react';

interface TierBenefit {
  text: string;
  highlight?: boolean;
}

interface Tier {
  id: 'gold' | 'silver' | 'entry';
  name: string;
  price: string;
  yearlyPrice?: string;
  color: string;
  benefits: TierBenefit[];
  icon: React.ReactNode;
  logoUrl?: string;
}

interface MembershipTiersProps {
  currentTier: 'gold' | 'silver' | 'entry';
  onUpgrade?: (tier: 'gold' | 'silver' | 'entry') => void;
}

const TIERS: Tier[] = [
  {
    id: 'gold',
    name: 'Gold',
    price: '£5/month',
    yearlyPrice: '£50/year',
    color: '#f59e0b',
    icon: <Crown size={20} />,
    benefits: [
      { text: '10% off all bookings', highlight: true },
      { text: 'Priority customer support' },
      { text: 'Exclusive access to premium spaces' },
      { text: 'Earn 2x points per booking', highlight: true },
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 'Free tier',
    color: '#9ca3af',
    icon: <Award size={20} />,
    benefits: [
      { text: '5% off bookings' },
      { text: 'Earn 1x points per booking' },
      { text: 'Standard support' },
    ],
  },
  {
    id: 'entry',
    name: 'Entry',
    price: 'Standard users',
    color: '#6b7280',
    icon: <User size={20} />,
    benefits: [
      { text: 'Pay-as-you-go pricing' },
    ],
  },
];

export function MembershipTiers({ currentTier, onUpgrade }: MembershipTiersProps) {
  const [expandedTier, setExpandedTier] = useState<string | null>(currentTier);

  const currentTierData = TIERS.find(t => t.id === currentTier);

  const toggleTier = (tierId: string) => {
    setExpandedTier(expandedTier === tierId ? null : tierId);
  };

  return (
    <div style={styles.container}>
      {/* Current Tier Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>Membership Tier</h3>
      </div>

      {/* Current Tier Badge */}
      <div style={{
        ...styles.currentTierBadge,
        background: `linear-gradient(135deg, ${currentTierData?.color}22 0%, ${currentTierData?.color}11 100%)`,
        borderColor: currentTierData?.color,
      }}>
        <div style={styles.currentTierLeft}>
          <div style={{
            ...styles.tierIcon,
            backgroundColor: currentTierData?.color,
          }}>
            {currentTierData?.icon}
          </div>
          <div>
            <div style={styles.currentTierName}>
              {currentTierData?.name} Member
            </div>
            <div style={styles.currentTierPrice}>
              {currentTierData?.price}
            </div>
          </div>
        </div>
        <Check size={24} color={currentTierData?.color} strokeWidth={3} />
      </div>

      {/* All Tiers List */}
      <div style={styles.tiersList}>
        {TIERS.map((tier) => {
          const isCurrent = tier.id === currentTier;
          const isExpanded = expandedTier === tier.id;

          return (
            <div key={tier.id} style={styles.tierCard}>
              {/* Tier Header */}
              <button
                style={{
                  ...styles.tierHeader,
                  ...(isCurrent ? { backgroundColor: '#f9fafb' } : {}),
                }}
                onClick={() => toggleTier(tier.id)}
              >
                <div style={styles.tierHeaderLeft}>
                  {/* Logo placeholder - replace with your actual logo */}
                  {tier.logoUrl ? (
                    <img 
                      src={tier.logoUrl} 
                      alt={`${tier.name} tier`} 
                      style={styles.tierLogo}
                    />
                  ) : (
                    <div style={{
                      ...styles.tierIconSmall,
                      backgroundColor: tier.color,
                    }}>
                      {tier.icon}
                    </div>
                  )}
                  
                  <div style={styles.tierInfo}>
                    <div style={styles.tierNameRow}>
                      <span style={styles.tierName}>{tier.name}</span>
                      {isCurrent && (
                        <span style={styles.currentBadge}>Current</span>
                      )}
                    </div>
                    <div style={styles.tierPrice}>{tier.price}</div>
                    {tier.yearlyPrice && (
                      <div style={styles.tierYearlyPrice}>{tier.yearlyPrice}</div>
                    )}
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronUp size={20} color="#6b7280" />
                ) : (
                  <ChevronDown size={20} color="#6b7280" />
                )}
              </button>

              {/* Tier Benefits (Expandable) */}
              {isExpanded && (
                <div style={styles.tierBenefits}>
                  {tier.benefits.map((benefit, index) => (
                    <div key={index} style={styles.benefit}>
                      <Check 
                        size={16} 
                        color={benefit.highlight ? tier.color : '#22c55e'} 
                        strokeWidth={2.5}
                      />
                      <span style={{
                        ...styles.benefitText,
                        ...(benefit.highlight ? { 
                          color: tier.color,
                          fontWeight: '600' 
                        } : {}),
                      }}>
                        {benefit.text}
                      </span>
                    </div>
                  ))}

                  {/* Upgrade/Downgrade Button */}
                  {!isCurrent && onUpgrade && (
                    <button
                      style={{
                        ...styles.actionButton,
                        backgroundColor: tier.id === 'gold' ? tier.color : '#22c55e',
                      }}
                      onClick={() => onUpgrade(tier.id)}
                    >
                      {TIERS.findIndex(t => t.id === tier.id) > TIERS.findIndex(t => t.id === currentTier)
                        ? 'Downgrade'
                        : 'Upgrade'
                      } to {tier.name}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Points or Additional Info */}
      <div style={styles.footer}>
        <div style={styles.footerText}>
          💎 Upgrade to unlock more benefits and savings
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
  },
  header: {
    marginBottom: '12px',
  },
  title: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
  },
  currentTierBadge: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderRadius: '12px',
    border: '2px solid',
    marginBottom: '16px',
  },
  currentTierLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  tierIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    flexShrink: 0,
  },
  currentTierName: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '2px',
  },
  currentTierPrice: {
    fontSize: '13px',
    color: '#6b7280',
  },
  tiersList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    marginBottom: '16px',
  },
  tierCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  tierHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 14px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  tierHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  tierLogo: {
    width: '36px',
    height: '36px',
    objectFit: 'contain' as const,
    flexShrink: 0,
  },
  tierIconSmall: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    flexShrink: 0,
  },
  tierInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
  },
  tierNameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  tierName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#111827',
  },
  currentBadge: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#22c55e',
    backgroundColor: '#f0fdf4',
    padding: '2px 8px',
    borderRadius: '10px',
    border: '1px solid #bbf7d0',
  },
  tierPrice: {
    fontSize: '13px',
    color: '#6b7280',
    marginTop: '2px',
  },
  tierYearlyPrice: {
    fontSize: '11px',
    color: '#9ca3af',
    marginTop: '1px',
  },
  tierBenefits: {
    padding: '0 14px 14px 14px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  benefit: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
  },
  benefitText: {
    fontSize: '13px',
    color: '#374151',
    lineHeight: '1.4',
  },
  actionButton: {
    width: '100%',
    padding: '10px 16px',
    marginTop: '8px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  footer: {
    padding: '12px',
    backgroundColor: '#fef3c7',
    borderRadius: '8px',
    border: '1px solid #fde68a',
  },
  footerText: {
    fontSize: '13px',
    color: '#92400e',
    textAlign: 'center' as const,
    lineHeight: '1.4',
  },
} as const;