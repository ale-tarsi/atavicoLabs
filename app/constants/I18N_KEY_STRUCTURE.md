# i18n Key Structure Reference

This document outlines the recommended i18n key structure for the offers and proofs constants.

## Offers Namespace (`offers.*`)

### Badge Labels
```
offers.badges.quickStart
offers.badges.mostPopular
offers.badges.endToEnd
```

### Ops Quick Win (`offers.opsQuickWin.*`)
```
offers.opsQuickWin.title
offers.opsQuickWin.tagline
offers.opsQuickWin.promise
offers.opsQuickWin.timeline
offers.opsQuickWin.price
offers.opsQuickWin.cta

offers.opsQuickWin.examples.0  (Reporting automatico CRM→Slack/Email)
offers.opsQuickWin.examples.1  (Alert/incident notification)
offers.opsQuickWin.examples.2  (Onboarding clienti)
offers.opsQuickWin.examples.3  (Handoff sales→delivery)
offers.opsQuickWin.examples.4  (Sync CRM↔Sheets↔Slack)
offers.opsQuickWin.examples.5  (Estrazione email/PDF→database)

offers.opsQuickWin.deliverables.0
offers.opsQuickWin.deliverables.1
offers.opsQuickWin.deliverables.2
offers.opsQuickWin.deliverables.3

offers.opsQuickWin.boundaries.0
offers.opsQuickWin.boundaries.1
offers.opsQuickWin.boundaries.2

offers.opsQuickWin.steps.0.day
offers.opsQuickWin.steps.0.activity
offers.opsQuickWin.steps.1.day
offers.opsQuickWin.steps.1.activity
offers.opsQuickWin.steps.2.day
offers.opsQuickWin.steps.2.activity
offers.opsQuickWin.steps.3.day
offers.opsQuickWin.steps.3.activity

offers.opsQuickWin.faqs.0.question
offers.opsQuickWin.faqs.0.answer
offers.opsQuickWin.faqs.1.question
offers.opsQuickWin.faqs.1.answer
... (up to 4)
```

### Continuity Retainer (`offers.continuityRetainer.*`)
```
offers.continuityRetainer.title
offers.continuityRetainer.tagline
offers.continuityRetainer.promise
offers.continuityRetainer.timeline
offers.continuityRetainer.price
offers.continuityRetainer.cta

offers.continuityRetainer.plans.care.name
offers.continuityRetainer.plans.care.price
offers.continuityRetainer.plans.care.description
offers.continuityRetainer.plans.growth.name
offers.continuityRetainer.plans.growth.price
offers.continuityRetainer.plans.growth.description
offers.continuityRetainer.plans.opsPlus.name
offers.continuityRetainer.plans.opsPlus.price
offers.continuityRetainer.plans.opsPlus.description

offers.continuityRetainer.examples.0
offers.continuityRetainer.examples.1
offers.continuityRetainer.examples.2
offers.continuityRetainer.examples.3
offers.continuityRetainer.examples.4

offers.continuityRetainer.deliverables.0
... (up to 4)

offers.continuityRetainer.boundaries.0
... (up to 2)

offers.continuityRetainer.steps.0.day
offers.continuityRetainer.steps.0.activity
... (up to 3)

offers.continuityRetainer.faqs.0.question
offers.continuityRetainer.faqs.0.answer
... (up to 4)
```

### Product Build (`offers.productBuild.*`)
```
offers.productBuild.title
offers.productBuild.tagline
offers.productBuild.promise
offers.productBuild.timeline
offers.productBuild.price
offers.productBuild.cta
offers.productBuild.mobileNote  (e.g., "Mobile come opzione quando serve")

offers.productBuild.examples.0  (Dashboard analytics)
offers.productBuild.examples.1  (Portale clienti)
offers.productBuild.examples.2  (Tool interno ops)
offers.productBuild.examples.3  (Web app SaaS MVP)
offers.productBuild.examples.4  (Admin panel)
offers.productBuild.examples.5  (App mobile opzionale)

offers.productBuild.deliverables.0
... (up to 5)

offers.productBuild.boundaries.0
... (up to 2)

offers.productBuild.steps.0.day
offers.productBuild.steps.0.activity
... (up to 4)

offers.productBuild.faqs.0.question
offers.productBuild.faqs.0.answer
... (up to 4)
```

---

## Proofs Namespace (`proofs.*`)

### Badge Labels
```
proofs.badges.internal
proofs.badges.inProgress
proofs.badges.production
```

### Category Labels
```
proofs.categories.automation
proofs.categories.mobile
proofs.categories.web
proofs.categories.design
```

### AI Outreach System (`proofs.aiOutreach.*`)
```
proofs.aiOutreach.title
proofs.aiOutreach.description
proofs.aiOutreach.problem
proofs.aiOutreach.solution
proofs.aiOutreach.result
proofs.aiOutreach.timeline

proofs.aiOutreach.stack.0  (Google Sheets)
proofs.aiOutreach.stack.1  (n8n)
proofs.aiOutreach.stack.2  (OpenAI API)
proofs.aiOutreach.stack.3  (Slack)
```

### Slack Alerts (`proofs.slackAlerts.*`)
```
proofs.slackAlerts.title
proofs.slackAlerts.description
proofs.slackAlerts.problem
proofs.slackAlerts.solution
proofs.slackAlerts.result
proofs.slackAlerts.timeline

proofs.slackAlerts.stack.0  (Uptime Robot)
proofs.slackAlerts.stack.1  (Slack API)
proofs.slackAlerts.stack.2  (n8n)
proofs.slackAlerts.stack.3  (PagerDuty)
```

### Doc to Data (`proofs.docToData.*`)
```
proofs.docToData.title
proofs.docToData.description
proofs.docToData.problem
proofs.docToData.solution
proofs.docToData.result
proofs.docToData.timeline

proofs.docToData.stack.0  (Zapier)
proofs.docToData.stack.1  (Google Cloud Vision)
proofs.docToData.stack.2  (Airtable)
proofs.docToData.stack.3  (Python)
```

---

## Usage Examples

### In Components
```tsx
import { OFFERS, getOffer } from '@/app/constants/offers';
import { PROOFS } from '@/app/constants/proofs';
import { useTranslations } from 'next-intl';

function OfferCard({ offerId }: { offerId: string }) {
  const t = useTranslations('offers');
  const offer = OFFERS.find(o => o.id === offerId);
  
  return (
    <div>
      <h2>{t(`${offer.id}.title`)}</h2>
      <p>{t(`${offer.id}.tagline`)}</p>
      
      {/* Render examples */}
      {Array.from({ length: offer.examplesCount }).map((_, i) => (
        <li key={i}>{t(`${offer.id}.examples.${i}`)}</li>
      ))}
      
      {/* Badge */}
      {offer.badge && <span>{t(`badges.${offer.badge}`)}</span>}
    </div>
  );
}

function ProofCard({ proofId }: { proofId: string }) {
  const t = useTranslations('proofs');
  const proof = PROOFS.find(p => p.id === proofId);
  
  return (
    <div>
      <h3>{t(`${proof.id}.title`)}</h3>
      <p>{t(`${proof.id}.problem`)}</p>
      <p>{t(`${proof.id}.solution`)}</p>
      
      {/* Tech stack */}
      <ul>
        {Array.from({ length: proof.stackCount }).map((_, i) => (
          <li key={i}>{t(`${proof.id}.stack.${i}`)}</li>
        ))}
      </ul>
      
      {/* Status badge */}
      <span>{t(`badges.${proof.status}`)}</span>
    </div>
  );
}
```

### In Pages
```tsx
import { getAllOfferSlugs } from '@/app/constants/offers';

// For static generation
export function generateStaticParams() {
  return getAllOfferSlugs().map(slug => ({ slug }));
}
```

---

## Notes

1. **No hardcoded strings in constants**: All text lives in `messages/it.json` and `messages/en.json`
2. **Type safety**: TypeScript types ensure correct usage
3. **Scalability**: Easy to add new offers or proofs by updating constants + i18n files
4. **SEO-friendly**: Each offer/proof has unique slug for URL routing
5. **Flexible rendering**: Use `*Count` properties to map over dynamic arrays without hardcoding lengths
