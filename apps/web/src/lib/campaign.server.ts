import pocketbaseAdmin from '@/lib/pocketbase-client.server';

type CampaignSettings = {
  status: string;
  discountPercentage?: number;
};

export type Campaign = { discount: number } | null;

/**
 * Reads the Founding Members campaign settings server-side, for the PT and EN
 * homepages. The campaign is only displayed publicly when its status is
 * 'ativa'. In dev or on a preview host (app-preview.*) it is also displayed
 * while 'rascunho' — or when no settings record exists yet — so the
 * administradora can review the launch offer before approving. On the
 * published production site 'rascunho' and a missing record keep it hidden.
 */
export async function loadCampaign(request: Request): Promise<Campaign> {
  const hostname = new URL(request.url).hostname;
  const isPreview = import.meta.env.DEV || hostname.includes('app-preview');
  const draftFallback = isPreview ? { discount: 15 } : null;
  try {
    const result = await pocketbaseAdmin.listRecords<CampaignSettings>('campaign_settings', { perPage: 1 });
    const settings = result.items[0];
    if (!settings) return draftFallback;
    const isActive = settings.status === 'ativa' || (settings.status === 'rascunho' && isPreview);
    if (!isActive) return null;
    return { discount: settings.discountPercentage ?? 15 };
  } catch {
    return draftFallback;
  }
}
