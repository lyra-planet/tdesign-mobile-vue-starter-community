export async function startMsw() {
  if (typeof window === 'undefined')
    return
  const { worker } = await import('./browser')
  // 仅在显式开启时启动，避免无意中影响真实接口
  const enabled = (window as any).__MSW_ENABLED__ ?? import.meta.env.VITE_MSW === 'true'
  if (!enabled)
    return
  await worker.start({ serviceWorker: { url: '/mockServiceWorker.js' } })
}
