import { notFound } from 'next/navigation';

// Rimosso dalla navigazione pubblica: contenuto solo in italiano, concetto
// duplicato di PulseShift, metriche placeholder (450+ utenti = same as HostID).
// Preservato per riferimento interno.

export default function TeamSchedulerPage() {
  notFound();
}
