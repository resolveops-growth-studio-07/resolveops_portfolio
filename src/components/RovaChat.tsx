import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, X, ChatCircle, ArrowClockwise } from '@phosphor-icons/react';
import { suggestions } from '../data/rovaKnowledge';
import { getRovaReply, type RovaContext, type RovaAction } from '../lib/rovaEngine';
import './RovaChat.css';
interface Message { role: 'user' | 'rova'; text: string; actions?: RovaAction[] }
export default function RovaChat() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const wasOpened = useRef(false);
  const context = useRef<RovaContext>({});
  const panel = useRef<HTMLElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => { clearTimeout(timer.current); clearTimeout(closeTimer.current); }, []);
  
  useEffect(() => {
    if (open) { wasOpened.current = true; inputRef.current?.focus(); }
    else if (wasOpened.current) launcher.current?.focus();
  }, [open]);
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages, typing, open]);
  function close() {
    if (closing) return;
    setClosing(true);
    closeTimer.current = window.setTimeout(() => { setOpen(false); setClosing(false); }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 160);
  }
  function send(question: string) {
    const value = question.trim();
    if (!value || typing) return;
    setInput(''); setMessages(previous => [...previous, { role: 'user', text: value }]); setTyping(true);
    const response = getRovaReply(value, context.current);
    timer.current = window.setTimeout(() => {
      context.current = response.context;
      setMessages(previous => [...previous, { role: 'rova', text: response.text, actions: response.actions }]);
      setTyping(false);
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 380);
  }
  function reset() { clearTimeout(timer.current); setMessages([]); setInput(''); setTyping(false); context.current = {}; inputRef.current?.focus(); }
  return <div className="rova-root">
    {open && <section ref={panel} className={`rova-panel${closing ? ' is-closing' : ''}`} role="dialog" aria-label="RØVA portfolio guide" onKeyDown={event => {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      if (event.key === 'Tab') {
        const focusable = panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input:not(:disabled)');
        if (!focusable?.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }}>
      <header className="rova-header"><div><h2>RØVA<span aria-hidden="true">✳</span></h2><p>ResolveOPS Studio Assistant</p></div>
        <div className="rova-tools"><button onClick={reset} aria-label="Clear conversation" title="Clear conversation"><ArrowClockwise size={18} /></button><button onClick={close} aria-label="Close RØVA"><X size={20} /></button></div>
      </header>

      <div className="rova-bg-fx" aria-hidden="true">
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMin slice">
          <defs>
            <radialGradient id="glowGleam" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="350" cy="50" r="180" fill="url(#glowGleam)" className="rova-glow" />
          <path d="M 150 -50 A 250 250 0 0 1 450 250" fill="none" stroke="url(#arcGrad)" strokeWidth="1" className="rova-arc" />
          <circle cx="206" cy="53" r="2.5" fill="var(--accent)" className="rova-node" />
        </svg>
      </div>

      <div className="rova-scroll" ref={log}>
        <div className="rova-welcome"><span className="rova-kicker">A little clarity, to get started.</span><p>Hey — what are you trying to build or improve?</p><small>Your guide to our services, work and next steps.</small></div>
        {!messages.length && <div className="rova-suggestions">
          <span className="rova-kicker">Try asking</span>
          <div className="rova-quick-list">
            {[
              'What services do you offer?',
              'Show me your work',
              'How do I start?',
              "What's your process like?",
              'Can you help with automation?'
            ].map(label => (
              <button key={label} className="rova-quick-btn" onClick={() => send(label)}>
                <span>{label}</span>
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
        </div>}
        <div className="rova-messages" role="log" aria-live="polite" aria-relevant="additions">
          {messages.map((message, i) => <div key={i} className={`rova-message ${message.role}`}><span className="rova-kicker">{message.role === 'rova' ? 'RØVA' : 'You'}</span><p>{message.text}</p>
            {message.actions && <div className="rova-actions">{message.actions.map(action => action.href.startsWith('/') ? <Link key={action.href} to={action.href} onClick={close}>{action.label}<ArrowUpRight size={14} /></Link> : <a key={action.href} href={action.href} target="_blank" rel="noopener noreferrer">{action.label}<ArrowUpRight size={14} /></a>)}</div>}
          </div>)}
        </div>
        {typing && <div className="rova-typing" role="status" aria-label="RØVA is typing"><i /><i /><i /></div>}
      </div>
      <form className="rova-compose" onSubmit={event => { event.preventDefault(); send(input); }}><label htmlFor="rova-input" className="sr-only">Ask RØVA</label><input ref={inputRef} id="rova-input" value={input} onChange={event => setInput(event.target.value)} placeholder="Ask RØVA anything…" maxLength={1000} autoComplete="off" /><button disabled={typing || !input.trim()} type="submit" aria-label="Send question"><ArrowRight size={20} /></button></form>
      <p className="rova-note">Portfolio guide · This conversation clears on refresh.</p>
    </section>}
    <button ref={launcher} className={`rova-launcher${open ? ' is-open' : ''}`} aria-label="Open RØVA" aria-expanded={open} onClick={() => setOpen(true)} tabIndex={open ? -1 : 0}><ChatCircle size={21} /><span>Ask RØVA</span><span className="rova-status" aria-hidden="true" /></button>
  </div>;
}
