import React, { useState } from "react";
import { Play, Copy, Check } from "lucide-react";

interface JupyterCellProps {
  code: string;
  cellNumber?: number | string;
  output?: string;
  isInteractive?: boolean;
  onRun?: () => void;
  showOutputByDefault?: boolean;
  hidePrompts?: boolean;
}

export interface QuestionBlock {
  type: "text" | "code";
  content: string;
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export interface Token {
  type: "keyword" | "special" | "string" | "number" | "comment" | "plain";
  text: string;
}

export function tokenizePythonLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const n = line.length;

  const keywords = new Set([
    "def", "class", "return", "if", "elif", "else", "for", "while", "in", 
    "import", "from", "print", "assert", "try", "except", "finally", 
    "with", "as", "lambda", "pass", "break", "continue"
  ]);

  const special = new Set([
    "True", "False", "None", "self", "range", "sum", "len", "type", 
    "int", "float", "str", "list", "dict", "enumerate", "map", "filter"
  ]);

  while (i < n) {
    const char = line[i];

    // Check for comment
    if (char === "#") {
      tokens.push({ type: "comment", text: line.substring(i) });
      break;
    }

    // Check for string literal
    if (char === '"' || char === "'") {
      const quoteType = char;
      let strVal = char;
      i++;
      let escaped = false;
      while (i < n) {
        const c = line[i];
        strVal += c;
        if (escaped) {
          escaped = false;
        } else if (c === "\\") {
          escaped = true;
        } else if (c === quoteType) {
          i++;
          break;
        }
        i++;
      }
      tokens.push({ type: "string", text: strVal });
      continue;
    }

    // Check for numbers (must start with a digit, or . followed by digit)
    if (/[0-9]/.test(char) || (char === "." && i + 1 < n && /[0-9]/.test(line[i + 1]))) {
      let numVal = "";
      while (i < n) {
        const c = line[i];
        if (/[0-9a-zA-Z._]/.test(c)) {
          numVal += c;
          i++;
        } else {
          break;
        }
      }
      tokens.push({ type: "number", text: numVal });
      continue;
    }

    // Check for identifiers / keywords
    if (/[a-zA-Z_]/.test(char)) {
      let ident = "";
      while (i < n && /[a-zA-Z0-9_]/.test(line[i])) {
        ident += line[i];
        i++;
      }
      if (keywords.has(ident)) {
        tokens.push({ type: "keyword", text: ident });
      } else if (special.has(ident)) {
        tokens.push({ type: "special", text: ident });
      } else {
        tokens.push({ type: "plain", text: ident });
      }
      continue;
    }

    // Other characters (whitespace, operators, brackets)
    let plainSymbol = "";
    while (i < n) {
      const c = line[i];
      if (c === "#" || c === '"' || c === "'" || /[0-9]/.test(c) || /[a-zA-Z_]/.test(c)) {
        break;
      }
      plainSymbol += c;
      i++;
    }
    if (plainSymbol) {
      tokens.push({ type: "plain", text: plainSymbol });
    }
  }

  return tokens;
}

export function highlightPython(code: string): React.ReactNode[] {
  const lines = code.split("\n");
  return lines.map((line, lineIdx) => {
    const tokens = tokenizePythonLine(line);
    return (
      <div 
        key={lineIdx} 
        className="min-h-[1.25rem] whitespace-pre font-mono text-xs sm:text-sm text-[#000000] leading-relaxed text-left"
      >
        {tokens.length === 0 ? " " : tokens.map((token, tIdx) => {
          let className = "text-[#000000]";
          if (token.type === "keyword") className = "text-[#008000] font-bold";
          else if (token.type === "special") className = "text-[#008000]";
          else if (token.type === "string") className = "text-[#BA2121]";
          else if (token.type === "number") className = "text-[#080]";
          else if (token.type === "comment") className = "text-[#408080] italic";
          
          return (
            <span key={tIdx} className={className}>
              {token.text}
            </span>
          );
        })}
      </div>
    );
  });
}

export default function JupyterCell({
  code,
  cellNumber = " ",
  output,
  isInteractive = false,
  onRun,
  showOutputByDefault = false,
  hidePrompts = true
}: JupyterCellProps) {
  const [copied, setCopied] = useState(false);
  const [hasRun, setHasRun] = useState(showOutputByDefault);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    if (onRun) {
      onRun();
    }
    setHasRun(true);
  };

  return (
    <div className="flex flex-col w-full my-4 font-mono text-xs sm:text-sm text-slate-800" id={`jupyter-cell-${cellNumber}`}>
      {/* Code Cell Block */}
      <div className="flex items-stretch border border-slate-200/80 rounded-xl overflow-hidden bg-[#FAFBFB] relative group shadow-[0_1px_3px_rgba(0,0,0,0.03)] border-l-[6px] border-l-[#0288D1]">
        {/* Prompt Column on Left (Optional) */}
        {!hidePrompts && (
          <div className="bg-[#FAFBFB] select-none text-right pr-2 pl-3 py-3 border-r border-[#ECEFF1] min-w-[70px] sm:min-w-[85px] leading-relaxed text-[11px] sm:text-xs font-semibold text-[#1A237E]/80">
            In [{cellNumber}]:
          </div>
        )}

        {/* Code Content Column */}
        <div className="flex-1 bg-white p-4.5 overflow-x-auto selection:bg-[#B3D4FC]">
          {highlightPython(code)}
        </div>

        {/* Action Widgets Overlay */}
        <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 bg-white/90 p-1 rounded-md border border-slate-200 shadow-sm z-10">
          <button
            onClick={handleCopy}
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition"
            title="Sao chép code"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Output Cell Block (Only if output is provided and cell has run or show by default is true) */}
      {output && hasRun && (
        <div className="flex items-stretch border-x border-b border-slate-200/80 rounded-b-xl overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] border-l-[6px] border-l-[#E0E0E0] -mt-[1px]">
          {/* Output Prompt Column on Left (Optional) */}
          {!hidePrompts ? (
            <div className="bg-[#FAFBFB] select-none text-right pr-2 pl-3 py-3 border-r border-[#ECEFF1] min-w-[70px] sm:min-w-[85px] leading-relaxed text-[11px] sm:text-xs font-semibold text-[#D32F2F]/80">
              Out [{cellNumber}]:
            </div>
          ) : (
            <div className="bg-[#FAFBFB]/50 select-none text-left pl-4 py-2 border-r border-slate-100 min-w-[75px] leading-relaxed text-[10px] uppercase font-bold text-slate-400">
              Output:
            </div>
          )}

          {/* Output Content Column */}
          <div className="flex-1 bg-white p-4.5 overflow-x-auto text-[#0F172A] font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed select-text font-bold">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Split a composite questionText (which contains inline Python codes)
 * into a series of styled prose texts and code-highlighted Jupyter Cells
 */
export function parseQuestionText(text: string): QuestionBlock[] {
  // Check if text has markdown-style triple backticks
  if (text.includes("```")) {
    const parts = text.split("```");
    const blocks: QuestionBlock[] = [];
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i % 2 === 1) {
        // Code block
        const cleanCode = part.replace(/^(python|py|javascript|js)?\n/, "");
        blocks.push({ type: "code", content: cleanCode });
      } else {
        // Prose text block
        blocks.push({ type: "text", content: part });
      }
    }
    return blocks
      .map(b => ({
        type: b.type,
        content: b.content.trim()
      }))
      .filter(b => b.content !== "");
  }
  
  // Otherwise, treat the entire string as plain text to prevent accidental notebook-style box layouts on prose questions.
  return [{ type: "text", content: text.trim() }];
}

interface SmartQuestionTextProps {
  text: string;
  questionId: number | string;
  isInteractive?: boolean;
  output?: string;
  showOutputByDefault?: boolean;
}

export function SmartQuestionText({
  text,
  questionId,
  isInteractive = false,
  output,
  showOutputByDefault = false
}: SmartQuestionTextProps) {
  const blocks = parseQuestionText(text);

  return (
    <div className="space-y-4.5 w-full">
      {blocks.map((block, index) => {
        if (block.type === "code") {
          return (
            <React.Fragment key={index}>
              <JupyterCell
                code={block.content}
                cellNumber={questionId}
                isInteractive={isInteractive}
                output={output}
                showOutputByDefault={showOutputByDefault}
                hidePrompts={true}
              />
            </React.Fragment>
          );
        } else {
          return (
            <p 
              key={index} 
              className="text-slate-800 text-[14px] sm:text-[15px] font-normal leading-relaxed whitespace-pre-wrap text-left"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              {block.content}
            </p>
          );
        }
      })}
    </div>
  );
}

/**
 * Expand the list of multiple choice options for compliance with extra Option E.
 */
export function getQuestionOptions(options: string[]): string[] {
  if (options.length === 4) {
    return [...options, "Không có phương án nào ở trên là đúng"];
  }
  return options;
}
