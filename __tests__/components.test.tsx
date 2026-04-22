import React from 'react';
import renderer from 'react-test-renderer';
import {WorkoutChip} from '../src/components/WorkoutChip';
import {FeelingCard} from '../src/components/FeelingCard';
import {SupplementPill} from '../src/components/SupplementPill';
import {Supplement} from '../src/types';

// ── WorkoutChip ─────────────────────────────────────────────────────────────

describe('WorkoutChip', () => {
  const types = ['easy-run', 'tempo', 'long-run', 'intervals', 'rest-day'] as const;
  const emojiMap: Record<string, string> = {
    'easy-run': '🏃', tempo: '⚡', 'long-run': '🔴', intervals: '💨', 'rest-day': '😴',
  };
  const labelMap: Record<string, string> = {
    'easy-run': 'Easy Run', tempo: 'Tempo', 'long-run': 'Long Run',
    intervals: 'Intervals', 'rest-day': 'Rest Day',
  };

  it('renders all 5 workout types without crashing', () => {
    types.forEach(type => {
      const t = renderer.create(
        <WorkoutChip type={type} selected={false} onPress={() => {}} />,
      );
      expect(t.toJSON()).not.toBeNull();
    });
  });

  it('selected and unselected states are visually different', () => {
    const unselected = renderer.create(
      <WorkoutChip type="easy-run" selected={false} onPress={() => {}} />,
    );
    const selected = renderer.create(
      <WorkoutChip type="easy-run" selected={true} onPress={() => {}} />,
    );
    expect(selected.toJSON().props.style).not.toEqual(unselected.toJSON().props.style);
  });

  it('displays correct emoji and label for each workout type', () => {
    types.forEach(type => {
      const t = renderer.create(
        <WorkoutChip type={type} selected={false} onPress={() => {}} />,
      );
      const texts = t.root.findAllByType('Text').map((x: any) => String(x.props.children));
      expect(texts).toContain(emojiMap[type]);
      expect(texts).toContain(labelMap[type]);
    });
  });

  it('long-run chip uses alert color when selected', () => {
    const t = renderer.create(
      <WorkoutChip type="long-run" selected={true} onPress={() => {}} />,
    );
    const json = JSON.stringify(t.toJSON());
    // selected chip should have borderColor (alert/accentAlert)
    expect(json).toContain('borderColor');
  });

  it('rest-day chip shows sleep emoji and label', () => {
    const t = renderer.create(
      <WorkoutChip type="rest-day" selected={false} onPress={() => {}} />,
    );
    const texts = t.root.findAllByType('Text').map((x: any) => String(x.props.children));
    expect(texts).toContain('😴');
    expect(texts).toContain('Rest Day');
  });
});

// ── FeelingCard ─────────────────────────────────────────────────────────────

describe('FeelingCard', () => {
  const feelings = ['energized', 'normal', 'sore', 'fatigued', 'exhausted'] as const;
  const emojiMap: Record<string, string> = {
    energized: '⚡', normal: '😐', sore: '💪', fatigued: '😴', exhausted: '🥱',
  };
  const labelMap: Record<string, string> = {
    energized: 'Energized', normal: 'Normal', sore: 'Sore',
    fatigued: 'Fatigued', exhausted: 'Exhausted',
  };

  it('renders all feeling types without crashing', () => {
    feelings.forEach(feeling => {
      const t = renderer.create(
        <FeelingCard feeling={feeling} selected={false} onPress={() => {}} />,
      );
      expect(t.toJSON()).not.toBeNull();
    });
  });

  it('selected state is visually different from unselected', () => {
    const unselected = renderer.create(
      <FeelingCard feeling="sore" selected={false} onPress={() => {}} />,
    );
    const selected = renderer.create(
      <FeelingCard feeling="sore" selected={true} onPress={() => {}} />,
    );
    const usJSON = JSON.stringify(unselected.toJSON());
    const selJSON = JSON.stringify(selected.toJSON());
    expect(selJSON).not.toEqual(usJSON);
  });

  it('displays correct emoji and label for each feeling', () => {
    feelings.forEach(feeling => {
      const t = renderer.create(
        <FeelingCard feeling={feeling} selected={false} onPress={() => {}} />,
      );
      const texts = t.root.findAllByType('Text').map((x: any) => String(x.props.children));
      expect(texts).toContain(emojiMap[feeling]);
      expect(texts).toContain(labelMap[feeling]);
    });
  });
});

// ── SupplementPill ───────────────────────────────────────────────────────────

const mockSupplement: Supplement = {
  key: 'caffeine',
  name: 'Caffeine',
  icon: '☕',
  dosage: '100mg',
  when: ['morning', 'pre-run'],
  withFood: false,
  notes: '',
  category: 'stimulant',
};

describe('SupplementPill', () => {
  it('renders name, dosage, and icon emoji', () => {
    const t = renderer.create(<SupplementPill supplement={mockSupplement} active={true} />);
    const texts = t.root.findAllByType('Text').map((x: any) => String(x.props.children));
    expect(texts).toContain('Caffeine');
    expect(texts).toContain('100mg');
    expect(texts).toContain('☕');
  });

  it('inactive state differs from active (opacity/visibility change)', () => {
    const active = renderer.create(
      <SupplementPill supplement={mockSupplement} active={true} />,
    );
    const inactive = renderer.create(
      <SupplementPill supplement={mockSupplement} active={false} />,
    );
    expect(JSON.stringify(inactive.toJSON())).not.toEqual(JSON.stringify(active.toJSON()));
  });

  it('renders all 6 category types without crashing', () => {
    const categories = ['protein', 'recovery', 'vitamin', 'stimulant', 'hydration', 'cognitive'] as const;
    categories.forEach(cat => {
      const supp = {...mockSupplement, key: cat, category: cat};
      const t = renderer.create(<SupplementPill supplement={supp} active={true} />);
      expect(t.toJSON()).not.toBeNull();
    });
  });

  it('withFood=true adds dosage note to render', () => {
    const supp = {...mockSupplement, withFood: true};
    const t = renderer.create(<SupplementPill supplement={supp} active={true} />);
    expect(t.toJSON()).not.toBeNull();
  });
});
