import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Home, DollarSign } from 'lucide-react';

interface ROICalculatorProps {
  propertyPrice: number;
  location: string;
}

export default function ROICalculator({ propertyPrice, location }: ROICalculatorProps) {
  const [monthlyRent, setMonthlyRent] = useState(propertyPrice * 0.003); // 0.3% rule as default
  const [downPayment, setDownPayment] = useState(propertyPrice * 0.1); // 10% default
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(4.5);
  const [annualAppreciation, setAnnualAppreciation] = useState(3);
  const [annualMaintenance, setAnnualMaintenance] = useState(propertyPrice * 0.01);

  const calculateROI = () => {
    const monthlyInterest = interestRate / 12 / 100;
    const numberOfPayments = loanTerm * 12;
    const loanAmount = propertyPrice - downPayment;
    
    // Monthly mortgage payment
    const monthlyPayment = loanAmount * (monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) 
      / (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);

    // Annual cash flow
    const annualRent = monthlyRent * 12;
    const annualMortgage = monthlyPayment * 12;
    const netOperatingIncome = annualRent - annualMaintenance;
    const cashFlow = netOperatingIncome - annualMortgage;

    // 5-year appreciation
    const futureValue = propertyPrice * Math.pow(1 + annualAppreciation / 100, 5);
    const appreciation = futureValue - propertyPrice;

    // Total ROI
    const totalInvestment = downPayment + annualMaintenance * 5;
    const totalReturn = (cashFlow * 5) + appreciation;
    const roi = (totalReturn / totalInvestment) * 100;

    return {
      monthlyPayment,
      cashFlow,
      appreciation,
      roi
    };
  };

  const results = calculateROI();

  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h3 className="text-2xl font-bold text-gray-800">ROI Calculator</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Rent (RM)
            </label>
            <input
              type="number"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Down Payment (RM)
            </label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Term (Years)
            </label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              {[15, 20, 25, 30, 35].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Appreciation (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={annualAppreciation}
              onChange={(e) => setAnnualAppreciation(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Maintenance (RM)
            </label>
            <input
              type="number"
              value={annualMaintenance}
              onChange={(e) => setAnnualMaintenance(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Monthly Payment</h4>
          <p className="text-2xl font-bold text-blue-700">
            RM {results.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Annual Cash Flow</h4>
          <p className="text-2xl font-bold text-green-700">
            RM {results.cashFlow.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600 mb-2">5-Year Appreciation</h4>
          <p className="text-2xl font-bold text-purple-700">
            RM {results.appreciation.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>

        <div className="p-4 bg-indigo-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Total ROI (5yr)</h4>
          <p className="text-2xl font-bold text-indigo-700">
            {results.roi.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
} 