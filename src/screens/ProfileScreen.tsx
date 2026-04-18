import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from 'react-native';
import {colors} from '../theme/colors';
import {supplements} from '../data/supplements';
import {SubscriptionTier} from '../types';

const INVENTORY_SUPPLEMENTS = [
  'whey-protein', 'creatine', 'collagen', 'magnesium', 'omega-3',
  'iron', 'vitamin-d', 'caffeine', 'electrolytes', 'beta-alanine',
  'tart-cherry', 'bcaas', 'l-glutamine', 'ashwagandha', 'rhodiola', 'zinc',
];

const SETTINGS_ITEMS = [
  {label: 'Notifications', description: 'Meal & supplement reminders', toggle: true, value: true},
  {label: 'Auto-Logging', description: 'Sync with Apple Health', toggle: true, value: false},
  {label: 'Race Goal', description: 'Seattle Marathon 2026', toggle: false},
  {label: 'Export Data', description: 'Download your training log', toggle: false},
  {label: 'Privacy', description: 'Manage data sharing', toggle: false},
  {label: 'Help & Support', description: 'FAQs and contact', toggle: false},
];

const TIER_INFO: Record<SubscriptionTier, {name: string; color: string; features: string[]}> = {
  free: {
    name: 'Free',
    color: colors.textSecondary,
    features: ['Basic meal logging', '3 restaurants/day', 'Supplement tracker'],
  },
  monthly: {
    name: 'Monthly',
    color: colors.accentEnergy,
    features: ['Unlimited restaurant search', 'Race-day meal planner', 'Affiliate discounts'],
  },
  annual: {
    name: 'Annual',
    color: colors.accentProtein,
    features: ['Everything in Monthly', 'Priority support', 'Early access features', 'Save 40%'],
  },
};

export const ProfileScreen: React.FC = () => {
  const [inventory, setInventory] = useState<Record<string, boolean>>(
    Object.fromEntries(INVENTORY_SUPPLEMENTS.map(s => [s, true])),
  );
  const [settings, setSettings] = useState(
    Object.fromEntries(SETTINGS_ITEMS.map((s, i) => [s.label, s.toggle ? s.value : null])),
  );

  const toggleInventory = (key: string) => {
    setInventory(prev => ({...prev, [key]: !prev[key]}));
  };

  const ownedCount = Object.values(inventory).filter(Boolean).length;
  const tier: SubscriptionTier = 'monthly';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AF</Text>
          </View>
          <Text style={styles.name}>Alex Frederick</Text>
          <Text style={styles.location}>Seattle, WA</Text>
        </View>

        {/* Subscription Tier */}
        <View style={styles.tierCard}>
          <View style={styles.tierHeader}>
            <View>
              <Text style={styles.tierLabel}>SUBSCRIPTION</Text>
              <Text style={[styles.tierName, {color: TIER_INFO[tier].color}]}>
                {TIER_INFO[tier].name}
              </Text>
            </View>
            <TouchableOpacity style={styles.upgradeBtn}>
              <Text style={styles.upgradeBtnText}>Upgrade</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featuresList}>
            {TIER_INFO[tier].features.map((f, i) => (
              <View key={i} style={styles.featureItem}>
                <Text style={styles.featureCheck}>✓</Text>
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Supplement Inventory */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>SUPPLEMENT INVENTORY</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{ownedCount}/{INVENTORY_SUPPLEMENTS.length}</Text>
            </View>
          </View>
          <Text style={styles.inventoryHint}>Toggle supplements you currently have</Text>

          <View style={styles.inventoryGrid}>
            {INVENTORY_SUPPLEMENTS.map(key => {
              const supp = supplements.find(s => s.key === key);
              if (!supp) return null;
              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.inventoryItem,
                    inventory[key] && styles.inventoryItemActive,
                  ]}
                  onPress={() => toggleInventory(key)}
                  activeOpacity={0.7}>
                  <Text style={styles.inventoryIcon}>{supp.icon}</Text>
                  <Text
                    style={[
                      styles.inventoryName,
                      inventory[key] && styles.inventoryNameActive,
                    ]}
                    numberOfLines={1}>
                    {supp.name}
                  </Text>
                  <View
                    style={[
                      styles.inventoryDot,
                      inventory[key] && {backgroundColor: colors.accentEnergy},
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SETTINGS</Text>
          {SETTINGS_ITEMS.map((item, idx) => (
            <View key={idx} style={styles.settingsRow}>
              <View style={styles.settingsInfo}>
                <Text style={styles.settingsLabel}>{item.label}</Text>
                <Text style={styles.settingsDesc}>{item.description}</Text>
              </View>
              {item.toggle ? (
                <Switch
                  value={settings[item.label] as boolean}
                  onValueChange={val => setSettings(prev => ({...prev, [item.label]: val}))}
                  trackColor={{false: colors.surfaceElevated, true: colors.accentEnergy + '60'}}
                  thumbColor={settings[item.label] ? colors.accentEnergy : colors.textSecondary}
                />
              ) : (
                <Text style={styles.settingsArrow}>→</Text>
              )}
            </View>
          ))}
        </View>

        {/* App Version */}
        <View style={styles.versionRow}>
          <Text style={styles.versionText}>RaceTable v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accentEnergy,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.background,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  location: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  tierCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.surfaceElevated,
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  tierLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  tierName: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 4,
  },
  upgradeBtn: {
    backgroundColor: colors.accentProtein,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  upgradeBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.background,
  },
  featuresList: {
    borderTopWidth: 1,
    borderTopColor: colors.surfaceElevated,
    paddingTop: 12,
    gap: 6,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureCheck: {
    fontSize: 13,
    color: colors.accentEnergy,
    marginRight: 8,
    fontWeight: '700',
  },
  featureText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  countBadge: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  inventoryHint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 14,
  },
  inventoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  inventoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    minWidth: '47%',
  },
  inventoryItemActive: {
    borderColor: colors.accentEnergy,
    backgroundColor: colors.accentEnergy + '10',
  },
  inventoryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  inventoryName: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    flex: 1,
  },
  inventoryNameActive: {
    color: colors.textPrimary,
  },
  inventoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceElevated,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },
  settingsInfo: {
    flex: 1,
  },
  settingsLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  settingsDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  settingsArrow: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  versionRow: {
    alignItems: 'center',
    paddingTop: 8,
  },
  versionText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
