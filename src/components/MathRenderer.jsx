import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const MathRenderer = ({ children, block = false }) => {
  if (!children) return null;
  
  // Convert common mathematical notations to LaTeX
  const convertToLatex = (text) => {
    return text
      // Handle superscripts (^)
      .replace(/\^(\d+)/g, '^{$1}')
      .replace(/\^([a-zA-Z]+)/g, '^{$1}')
      // Handle subscripts (_)
      .replace(/_(\d+)/g, '_{$1}')
      .replace(/_([a-zA-Z]+)/g, '_{$1}')
      // Handle fractions
      .replace(/(\w+)\/(\w+)/g, '\\frac{$1}{$2}')
      // Handle square roots
      .replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}')
      // Handle Greek letters
      .replace(/\bpi\b/g, '\\pi')
      .replace(/\balpha\b/g, '\\alpha')
      .replace(/\bbeta\b/g, '\\beta')
      .replace(/\bgamma\b/g, '\\gamma')
      .replace(/\bdelta\b/g, '\\delta')
      .replace(/\btheta\b/g, '\\theta')
      .replace(/\blambda\b/g, '\\lambda')
      .replace(/\bmu\b/g, '\\mu')
      .replace(/\bsigma\b/g, '\\sigma')
      .replace(/\bphi\b/g, '\\phi')
      .replace(/\bomega\b/g, '\\omega')
      .replace(/\beta\b/g, '\\eta')
      // Handle common physics units and symbols
      .replace(/m\/s\^2/g, 'm/s^2')
      .replace(/m\/s2/g, 'm/s^2')
      .replace(/ms\^-2/g, 'ms^{-2}')
      // Handle percentages
      .replace(/(\d+)%/g, '$1\\%')
      // Handle degrees
      .replace(/(\d+)°/g, '$1^\\circ')
      // Handle multiplication
      .replace(/\*/g, '\\times')
      // Handle inequalities
      .replace(/<=/g, '\\leq')
      .replace(/>=/g, '\\geq')
      .replace(/!=/g, '\\neq');
  };

  // Check if the text contains mathematical expressions
  const hasMath = (text) => {
    return /[\^_]|\d+%|m\/s|sqrt|\\|π|α|β|γ|δ|θ|λ|μ|σ|φ|ω|η|\$/.test(text);
  };

  // Split text into math and non-math parts
  const renderMixedContent = (text) => {
    // Handle inline math expressions wrapped in $ or $$
    const parts = text.split(/(\$[^$]+\$|\$\$[^$]+\$\$)/);
    
    return parts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        // Block math
        const mathContent = part.slice(2, -2);
        return <BlockMath key={index} math={convertToLatex(mathContent)} />;
      } else if (part.startsWith('$') && part.endsWith('$')) {
        // Inline math
        const mathContent = part.slice(1, -1);
        return <InlineMath key={index} math={convertToLatex(mathContent)} />;
      } else if (hasMath(part)) {
        // Auto-detect math content
        return <InlineMath key={index} math={convertToLatex(part)} />;
      } else {
        // Regular text
        return <span key={index}>{part}</span>;
      }
    });
  };

  try {
    const text = String(children);
    
    // If explicitly marked as block math
    if (block) {
      return <BlockMath math={convertToLatex(text)} />;
    }
    
    // Handle mixed content
    return <span>{renderMixedContent(text)}</span>;
  } catch (error) {
    console.error('Math rendering error:', error);
    // Fallback to original text if rendering fails
    return <span>{children}</span>;
  }
};

export default MathRenderer;
