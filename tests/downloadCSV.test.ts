import { downloadCSV } from '../src/utils/reportGenerator.ts';
import { strict as assert } from 'assert';

// Minimal DOM stubs
(global as any).window = {
  URL: {
    createObjectURL: () => 'blob:url',
    revokeObjectURL: () => {}
  }
};
(global as any).document = {
  body: {
    appendChild: () => {},
    removeChild: () => {}
  },
  createElement: () => ({ href: '', download: '', click: () => {} })
};

// Capture the CSV content written to the Blob
let captured = '';
const OriginalBlob = Blob;
(global as any).Blob = class extends OriginalBlob {
  constructor(parts: any[], opts?: any) {
    captured = parts.join('');
    super(parts, opts);
  }
};

const data = [{ name: 'John "Doe"', note: 'Said "Hello"' }];
downloadCSV(data, 'test');

assert.equal(captured, 'name,note\n"John ""Doe""","Said ""Hello"""');
console.log('downloadCSV handles quotes correctly');
