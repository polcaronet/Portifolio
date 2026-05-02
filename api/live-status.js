// Vercel Serverless Function — Checa se @anselmopolcaro está ao vivo no TikTok
// Endpoint: GET /api/live-status

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');

  const username = 'anselmopolcaro';

  try {
    // Tenta acessar a página de live do usuário no TikTok
    const response = await fetch(
      `https://www.tiktok.com/@${username}/live`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        },
        redirect: 'follow',
      }
    );

    const html = await response.text();

    // Métodos de detecção — se qualquer um indicar live, retorna true
    // 1. Verifica se o JSON embutido contém room_id válido (indica live ativa)
    const roomIdMatch = html.match(/"room_id"\s*:\s*"(\d+)"/);
    const hasRoomId = roomIdMatch && roomIdMatch[1] !== '0' && roomIdMatch[1] !== '';

    // 2. Verifica se o status da live é ativo (status 2 = ao vivo)
    const statusMatch = html.match(/"status"\s*:\s*(\d+)/);
    const isStatusLive = statusMatch && statusMatch[1] === '2';

    // 3. Verifica se a página contém indicadores de live ativa
    const hasLiveIndicators =
      html.includes('"isLiveStreaming":true') ||
      html.includes('"liveRoom"') ||
      html.includes('LiveRoom');

    // 4. Se a URL redireciona para o perfil (sem /live), não está ao vivo
    const redirectedAway =
      html.includes('"statusCode":10000') === false &&
      !hasRoomId &&
      !hasLiveIndicators;

    const isLive = (hasRoomId || isStatusLive || hasLiveIndicators) && !redirectedAway;

    // Tenta extrair contagem de viewers se estiver ao vivo
    let viewerCount = 0;
    if (isLive) {
      const viewerMatch = html.match(/"user_count"\s*:\s*(\d+)/);
      if (viewerMatch) {
        viewerCount = parseInt(viewerMatch[1], 10);
      }
    }

    res.status(200).json({
      isLive,
      username,
      viewerCount: isLive ? viewerCount : 0,
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    // Em caso de erro, retorna offline para não quebrar o frontend
    res.status(200).json({
      isLive: false,
      username,
      viewerCount: 0,
      checkedAt: new Date().toISOString(),
      error: 'Não foi possível verificar o status',
    });
  }
};
