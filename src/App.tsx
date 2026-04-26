import { useState, useCallback } from 'react';
import { generateWordArt } from './wordArt';
import './App.css';

const DEFAULT_WORD = 'Ram';
const DEFAULT_PARAGRAPH = 'Hello World';

export default function App() {
  const [fillWord, setFillWord] = useState(DEFAULT_WORD);
  const [paragraph, setParagraph] = useState(DEFAULT_PARAGRAPH);
  const [fontSize, setFontSize] = useState(7);
  const [output, setOutput] = useState('');

  const handleGenerate = useCallback(() => {
    if (!fillWord.trim() || !paragraph.trim()) return;
    const lines = paragraph.split('\n').filter(l => l.trim().length > 0);
    const blocks = lines.map(line => generateWordArt(line, fillWord.trim()));
    setOutput(blocks.join('\n\n'));
  }, [fillWord, paragraph]);

  return (
    <div className="app">
      <header>
        <h1>Word Art Generator</h1>
        <p>Turn any text into pixel art made from a word</p>
      </header>

      <section className="controls">
        <div className="field">
          <label htmlFor="fill-word">Fill Word</label>
          <input
            id="fill-word"
            type="text"
            value={fillWord}
            onChange={e => setFillWord(e.target.value)}
            placeholder="e.g. Ram"
            maxLength={20}
          />
        </div>

        <div className="field">
          <label htmlFor="paragraph">Text to Convert</label>
          <textarea
            id="paragraph"
            rows={6}
            value={paragraph}
            onChange={e => setParagraph(e.target.value)}
            placeholder="Enter text here…"
          />
        </div>

        <div className="field slider-field">
          <label htmlFor="font-size">
            Output Font Size — <strong>{fontSize}px</strong>
          </label>
          <input
            id="font-size"
            type="range"
            min={4}
            max={20}
            value={fontSize}
            onChange={e => setFontSize(Number(e.target.value))}
          />
        </div>

        <button className="generate-btn" onClick={handleGenerate}>
          Generate
        </button>
      </section>

      {output && (
        <section className="output-section">
          <div className="output-toolbar">
            <span>Output</span>
            <button
              className="copy-btn"
              onClick={() => navigator.clipboard.writeText(output)}
            >
              Copy
            </button>
          </div>
          <pre
            className="output"
            style={{ fontSize: `${fontSize}px`, lineHeight: `${fontSize * 1.4}px` }}
          >
            {output}
          </pre>
        </section>
      )}
    </div>
  );
}
