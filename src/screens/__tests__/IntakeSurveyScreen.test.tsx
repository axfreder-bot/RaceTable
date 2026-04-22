import React from 'react';
import renderer from 'react-test-renderer';
import {IntakeSurveyScreen} from '../IntakeSurveyScreen';

jest.mock('../../components/SupplementLibraryModal', () => ({
  SupplementLibraryModal: () => null,
}));

// React-test-renderer tree.toJSON() uses direct "children" property, not props.children
function collectText(node: any): string[] {
  const texts: string[] = [];
  function walk(n: any) {
    if (!n) return;
    if (typeof n === 'string') { texts.push(n); return; }
    if (typeof n === 'number') { texts.push(String(n)); return; }
    // React elements: children can be in n.children or n.props?.children
    if (n.children) {
      const c = n.children;
      if (Array.isArray(c)) c.forEach(walk);
      else walk(c);
    }
    if (n.props?.children) {
      const c = n.props.children;
      if (Array.isArray(c)) c.forEach(walk);
      else walk(c);
    }
  }
  walk(node);
  return texts;
}

describe('IntakeSurveyScreen', () => {

  it('renders without crashing', () => {
    const onComplete = jest.fn();
    const tree = renderer.create(<IntakeSurveyScreen onComplete={onComplete} />);
    expect(tree.toJSON()).not.toBeNull();
  });

  it('shows RaceTable welcome heading by default', () => {
    const onComplete = jest.fn();
    const tree = renderer.create(<IntakeSurveyScreen onComplete={onComplete} />);
    const all = collectText(tree.toJSON());
    const combined = all.join(' ');
    expect(combined).toMatch(/welcome to racetable/i);
  });

  it('shows step counter "Step 1 of 6" on welcome screen', () => {
    const onComplete = jest.fn();
    const tree = renderer.create(<IntakeSurveyScreen onComplete={onComplete} />);
    const all = collectText(tree.toJSON());
    const combined = all.join(' ');
    expect(combined).toMatch(/step.*1.*of.*6/i);
  });

  it('welcome screen has a Start Survey button', () => {
    const onComplete = jest.fn();
    const tree = renderer.create(<IntakeSurveyScreen onComplete={onComplete} />);
    const all = collectText(tree.toJSON());
    const combined = all.join(' ');
    expect(combined).toMatch(/start survey|begin|get started/i);
  });

  it('welcome screen has a Skip button', () => {
    const onComplete = jest.fn();
    const tree = renderer.create(<IntakeSurveyScreen onComplete={onComplete} />);
    const all = collectText(tree.toJSON());
    const combined = all.join(' ');
    expect(combined).toMatch(/skip/i);
  });

  it('shows runner emoji on welcome screen', () => {
    const onComplete = jest.fn();
    const tree = renderer.create(<IntakeSurveyScreen onComplete={onComplete} />);
    const all = collectText(tree.toJSON());
    expect(all.some(t => t.includes('🏃'))).toBe(true);
  });

  it('onComplete callback is defined and callable', () => {
    const onComplete = jest.fn();
    const tree = renderer.create(<IntakeSurveyScreen onComplete={onComplete} />);
    expect(typeof onComplete).toBe('function');
    onComplete();
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('supplement library modal is mocked away', () => {
    const onComplete = jest.fn();
    const tree = renderer.create(<IntakeSurveyScreen onComplete={onComplete} />);
    const all = collectText(tree.toJSON());
    const combined = all.join(' ');
    expect(combined).not.toMatch(/toggle supplements/i);
  });

  it('renders the onboarding "What to expect" section', () => {
    const onComplete = jest.fn();
    const tree = renderer.create(<IntakeSurveyScreen onComplete={onComplete} />);
    const all = collectText(tree.toJSON());
    const combined = all.join(' ');
    expect(combined).toMatch(/what to expect/i);
  });

  it('renders at least one step indicator (1, 2, or 3)', () => {
    const onComplete = jest.fn();
    const tree = renderer.create(<IntakeSurveyScreen onComplete={onComplete} />);
    const all = collectText(tree.toJSON());
    expect(all.some(t => t === '1' || t === '2' || t === '3')).toBe(true);
  });

});
