import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const wellKnown = join(root, '.well-known');
const publicBaseUrl = process.env.SIN_STRIPE_PUBLIC_BASE_URL?.trim() || 'https://delqhi-sin-stripe.hf.space';
const normalizedBaseUrl = publicBaseUrl.replace(/\/+$|$/,'');
const rpcUrl = `${normalizedBaseUrl}/a2a/v1`;
await mkdir(wellKnown, { recursive: true });
const card = {
  name: 'SIN-Stripe',
  description: 'Stripe automation and onboarding specialist for sub-3-minute setup, payment links, redirects, webhooks, and secret fanout.',
  version: '2026.03.25',
  documentationUrl: normalizedBaseUrl,
  url: rpcUrl,
  capabilities: { streaming: false, pushNotifications: false },
  defaultInputModes: ['text/plain', 'application/json'],
  defaultOutputModes: ['text/plain', 'application/json'],
  skills: [
    { id: 'sin.stripe.health', name: 'Health', description: 'Check base agent readiness.' },
    { id: 'sin.stripe.keys.status', name: 'Stripe Keys Status', description: 'Check Stripe secret presence without returning values.' },
    { id: 'sin.stripe.onboarding.plan', name: 'Stripe Onboarding Plan', description: 'Return the under-3-minute Stripe setup plan.' },
    { id: 'sin.stripe.payment_links.plan', name: 'Payment Links Plan', description: 'Return the fastest path for product, price, and payment-link creation.' },
    { id: 'sin.stripe.webhook.plan', name: 'Webhook Plan', description: 'Return the safest webhook creation and secret fanout plan.' },
    { id: 'sin.stripe.setup.fastlane.plan', name: 'Setup Fastlane', description: 'Return the combined sub-3-minute onboarding sequence.' }
  ],
  supportedInterfaces: [{ url: rpcUrl, protocolBinding: 'JSONRPC', protocolVersion: '1.0' }]
};
await writeFile(join(wellKnown, 'agent-card.json'), JSON.stringify(card, null, 2));
await writeFile(join(wellKnown, 'agent.json'), JSON.stringify(card, null, 2));
await writeFile(join(wellKnown, 'oauth-client.json'), JSON.stringify({ type: 'local-dev', note: 'Stripe onboarding automation currently uses dashboard session + secret fanout.' }, null, 2));
