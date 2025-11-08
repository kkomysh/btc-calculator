import { useState } from 'react';
import { Bitcoin } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState<string>('');
  const [operator, setOperator] = useState<string>('');
  const [previousValue, setPreviousValue] = useState<string>('');

  const buttons = [
    '7', '4', '1', 'C',
    '8', '5', '2', '0',
    '9', '6', '3', '.',
    '÷', '×', '-', '+',
    '='
  ];

  const handleButtonClick = (value: string) => {
    if (value >= '0' && value <= '9' || value === '.') {
      const newValue = display === '0' ? value : display + value;
      setDisplay(newValue);
      setCurrentValue(newValue);
    } else if (value === 'C') {
      setDisplay('0');
      setCurrentValue('');
      setOperator('');
      setPreviousValue('');
    } else if (value === '=') {
      if (previousValue && operator && currentValue) {
        const result = calculate(parseFloat(previousValue), parseFloat(currentValue), operator);
        setDisplay(result.toString());
        setCurrentValue(result.toString());
        setPreviousValue('');
        setOperator('');
      }
    } else {
      if (currentValue) {
        if (previousValue && operator) {
          const result = calculate(parseFloat(previousValue), parseFloat(currentValue), operator);
          setPreviousValue(result.toString());
          setDisplay(result.toString());
        } else {
          setPreviousValue(currentValue);
        }
        setOperator(value);
        setCurrentValue('');
        setDisplay('0');
      }
    }
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return a / b;
      default:
        return b;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6 gap-3">
          <Bitcoin className="w-8 h-8 text-orange-400" />
          <h1 className="text-2xl font-bold text-orange-400">Crypto Calc</h1>
          <Bitcoin className="w-8 h-8 text-orange-400" />
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border-2 border-orange-400/30">
          <div className="text-right text-5xl font-light text-orange-100 overflow-hidden break-words">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(btn)}
              className={`
                ${btn === '=' ? 'col-span-4' : ''}
                ${btn === '='
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
                  : btn === 'C'
                  ? 'bg-red-600 hover:bg-red-700'
                  : ['÷', '×', '-', '+'].includes(btn)
                  ? 'bg-orange-600 hover:bg-orange-700'
                  : 'bg-gray-700 hover:bg-gray-600'
                }
                text-white text-2xl font-semibold py-5 rounded-xl
                transition-all duration-150 active:scale-95
                shadow-lg hover:shadow-xl
              `}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
