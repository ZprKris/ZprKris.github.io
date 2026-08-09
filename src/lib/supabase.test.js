import { afterEach, describe, expect, it, vi } from 'vitest'

describe('Supabase configuration', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('disables analytics without environment variables', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', '')
    vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', '')

    const { isAnalyticsConfigured, supabase } = await import('./supabase.js')

    expect(isAnalyticsConfigured).toBe(false)
    expect(supabase).toBeNull()
  })
})
