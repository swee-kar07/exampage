import React from 'react';
import MathRenderer from './MathRenderer';

const MathExamples = () => {
  const examples = [
    {
      title: "Superscripts and Subscripts",
      examples: [
        "x^2 + y^2 = z^2",
        "a_1, a_2, a_3, ..., a_n",
        "E = mc^2",
        "H_2SO_4",
        "x^{2n+1}"
      ]
    },
    {
      title: "Fractions",
      examples: [
        "$\\frac{1}{2} + \\frac{3}{4} = \\frac{5}{4}$",
        "$\\frac{dy}{dx} = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$",
        "$\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}$"
      ]
    },
    {
      title: "Square Roots and Radicals",
      examples: [
        "$\\sqrt{16} = 4$",
        "$\\sqrt[3]{27} = 3$",
        "$\\sqrt{a^2 + b^2}$",
        "$\\sqrt{\\frac{x}{y}}$"
      ]
    },
    {
      title: "Integrals",
      examples: [
        "$\\int x^2 dx = \\frac{x^3}{3} + C$",
        "$\\int_0^1 x^2 dx = \\frac{1}{3}$",
        "$\\oint \\vec{F} \\cdot d\\vec{r}$",
        "$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$"
      ]
    },
    {
      title: "Summations and Products",
      examples: [
        "$\\sum_{i=1}^n i = \\frac{n(n+1)}{2}$",
        "$\\prod_{i=1}^n i = n!$",
        "$\\sum_{k=0}^{\\infty} \\frac{x^k}{k!} = e^x$"
      ]
    },
    {
      title: "Matrices",
      examples: [
        "$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$",
        "$\\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 9 \\end{bmatrix}$",
        "$\\det\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc$"
      ]
    },
    {
      title: "Greek Letters",
      examples: [
        "$\\alpha, \\beta, \\gamma, \\delta$",
        "$\\epsilon, \\zeta, \\eta, \\theta$",
        "$\\lambda, \\mu, \\pi, \\sigma$",
        "$\\phi, \\psi, \\omega$"
      ]
    },
    {
      title: "Physics Formulas",
      examples: [
        "$F = ma$",
        "$E = \\frac{1}{2}mv^2$",
        "$P = \\frac{dW}{dt}$",
        "$\\nabla \\times \\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}$",
        "$\\psi(x,t) = Ae^{i(kx - \\omega t)}$"
      ]
    },
    {
      title: "Logarithms",
      examples: [
        "$\\log_2 8 = 3$",
        "$\\ln e = 1$",
        "$\\log_{10} 100 = 2$",
        "$\\log_a(xy) = \\log_a x + \\log_a y$"
      ]
    },
    {
      title: "Trigonometry",
      examples: [
        "$\\sin^2 \\theta + \\cos^2 \\theta = 1$",
        "$\\tan \\theta = \\frac{\\sin \\theta}{\\cos \\theta}$",
        "$e^{i\\theta} = \\cos \\theta + i\\sin \\theta$"
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Mathematical Expression Examples
      </h1>
      
      <div className="grid gap-8">
        {examples.map((category, index) => (
          <div key={index} className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              {category.title}
            </h2>
            <div className="space-y-3">
              {category.examples.map((example, exIndex) => (
                <div key={exIndex} className="bg-gray-50 p-3 rounded border-l-4 border-blue-400">
                  <div className="text-sm text-gray-600 mb-1">Input: {example}</div>
                  <div className="text-lg">
                    <MathRenderer>{example}</MathRenderer>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MathExamples;
