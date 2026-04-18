import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../theme/colors';
import {Supplement} from '../types';

interface AffiliateOrderCardProps {
  supplement: Supplement;
  onDismiss?: () => void;
}

const affiliateVendors: Record<string, {name: string; url: string; note: string}> = {
  'whey-protein': {name: 'Transparent Labs', url: 'https://transparentslabs.com', note: 'Clean ingredients, no artificial sweeteners'},
  creatine: {name: 'Kaged Muscle', url: 'https://kaged.com', note: 'Creapure creatine, micronized'},
  'caffeine': {name: 'NooCube', url: 'https://noocube.com', note: 'Natural caffeine alternative'},
  'electrolytes': {name: 'LMNT', url: 'https://drinklmnt.com', note: 'Sugar-free electrolyte drink mix'},
  default: {name: 'Thorne', url: 'https://thorne.com', note: 'NSF certified for sport'},
};

export const AffiliateOrderCard: React.FC<AffiliateOrderCardProps> = ({supplement, onDismiss}) => {
  const vendor = affiliateVendors[supplement.key] || affiliateVendors.default;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{supplement.icon}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>Order {supplement.name}</Text>
          <Text style={styles.dosage}>{supplement.dosage} — {vendor.name}</Text>
        </View>
        {onDismiss && (
          <TouchableOpacity onPress={onDismiss} style={styles.closeBtn}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.note}>{vendor.note}</Text>
      <TouchableOpacity style={styles.orderBtn} activeOpacity={0.8}>
        <Text style={styles.orderBtnText}>Shop {vendor.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: colors.accentRecovery,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  dosage: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
  },
  closeText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  note: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 18,
  },
  orderBtn: {
    backgroundColor: colors.accentRecovery,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  orderBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
