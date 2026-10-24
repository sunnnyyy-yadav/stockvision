// StockVision Comprehensive Stock Market Dataset
// Realistic pricing, market cap, P/E, 52W highs/lows, sectors, historical series

export const INITIAL_STOCKS = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 138.25,
    change: 5.42,
    changePercent: 4.08,
    marketCap: 3390000000000, // $3.39T
    marketCapFormatted: '$3.39T',
    capCategory: 'Mega',
    peRatio: 52.4,
    volume: 68420000,
    avgVolume: 52000000,
    sector: 'Technology',
    industry: 'Semiconductors',
    high52: 140.76,
    low52: 39.23,
    dayHigh: 139.10,
    dayLow: 134.80,
    openPrice: 135.20,
    prevClose: 132.83,
    rsi: 68.4,
    sma50: 124.60,
    sma200: 98.40,
    beta: 1.68,
    dividendYield: 0.03,
    eps: 2.64,
    recommendation: 'Strong Buy',
    description: 'NVIDIA Corporation designs graphics processing units for gaming and professional markets, as well as system on a chip units for the mobile computing and automotive market. A leader in accelerated computing and AI infrastructure.'
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 232.50,
    change: 1.85,
    changePercent: 0.80,
    marketCap: 3540000000000,
    marketCapFormatted: '$3.54T',
    capCategory: 'Mega',
    peRatio: 34.2,
    volume: 48920000,
    avgVolume: 51200000,
    sector: 'Technology',
    industry: 'Consumer Electronics',
    high52: 237.23,
    low52: 164.08,
    dayHigh: 233.90,
    dayLow: 231.10,
    openPrice: 231.50,
    prevClose: 230.65,
    rsi: 58.2,
    sma50: 226.40,
    sma200: 198.30,
    beta: 1.12,
    dividendYield: 0.43,
    eps: 6.80,
    recommendation: 'Buy',
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories, and sells a variety of related services including Apple Intelligence.'
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    price: 428.15,
    change: -2.35,
    changePercent: -0.55,
    marketCap: 3180000000000,
    marketCapFormatted: '$3.18T',
    capCategory: 'Mega',
    peRatio: 36.8,
    volume: 21450000,
    avgVolume: 22800000,
    sector: 'Technology',
    industry: 'Software - Infrastructure',
    high52: 468.35,
    low52: 327.00,
    dayHigh: 432.00,
    dayLow: 426.50,
    openPrice: 431.00,
    prevClose: 430.50,
    rsi: 49.1,
    sma50: 422.30,
    sma200: 415.80,
    beta: 0.89,
    dividendYield: 0.70,
    eps: 11.63,
    recommendation: 'Buy',
    description: 'Microsoft develops and licenses enterprise software, consumer software, cloud infrastructure (Azure), gaming (Xbox), personal computers, and generative AI copilot solutions.'
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 165.80,
    change: 3.12,
    changePercent: 1.92,
    marketCap: 2060000000000,
    marketCapFormatted: '$2.06T',
    capCategory: 'Mega',
    peRatio: 24.1,
    volume: 28300000,
    avgVolume: 27500000,
    sector: 'Communication',
    industry: 'Internet Content & Information',
    high52: 191.75,
    low52: 120.21,
    dayHigh: 166.50,
    dayLow: 163.40,
    openPrice: 163.80,
    prevClose: 162.68,
    rsi: 54.7,
    sma50: 163.10,
    sma200: 156.40,
    beta: 1.05,
    dividendYield: 0.48,
    eps: 6.88,
    recommendation: 'Strong Buy',
    description: 'Alphabet Inc. provides web-based search, advertisements, maps, software applications, mobile operating systems (Android), consumer electronics, enterprise solutions (Google Cloud), and AI innovations (Gemini).'
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com, Inc.',
    price: 187.90,
    change: 2.45,
    changePercent: 1.32,
    marketCap: 1960000000000,
    marketCapFormatted: '$1.96T',
    capCategory: 'Mega',
    peRatio: 44.2,
    volume: 38700000,
    avgVolume: 42000000,
    sector: 'Consumer Cyclical',
    industry: 'Internet Retail',
    high52: 201.20,
    low52: 118.35,
    dayHigh: 189.20,
    dayLow: 185.90,
    openPrice: 186.20,
    prevClose: 185.45,
    rsi: 56.3,
    sma50: 182.40,
    sma200: 174.10,
    beta: 1.15,
    dividendYield: 0.00,
    eps: 4.25,
    recommendation: 'Strong Buy',
    description: 'Amazon focuses on e-commerce, cloud computing (AWS), digital streaming, artificial intelligence, and physical retail grocers.'
  },
  {
    ticker: 'META',
    name: 'Meta Platforms, Inc.',
    price: 588.60,
    change: 8.90,
    changePercent: 1.54,
    marketCap: 1490000000000,
    marketCapFormatted: '$1.49T',
    capCategory: 'Mega',
    peRatio: 28.6,
    volume: 16200000,
    avgVolume: 14800000,
    sector: 'Communication',
    industry: 'Internet Content & Information',
    high52: 602.95,
    low52: 279.40,
    dayHigh: 592.40,
    dayLow: 583.10,
    openPrice: 584.00,
    prevClose: 579.70,
    rsi: 64.9,
    sma50: 540.20,
    sma200: 485.60,
    beta: 1.21,
    dividendYield: 0.34,
    eps: 20.58,
    recommendation: 'Strong Buy',
    description: 'Meta Platforms builds technologies that help people connect, find communities, and grow businesses across Facebook, Instagram, WhatsApp, and Ray-Ban Meta AI smart glasses.'
  },
  {
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    price: 218.40,
    change: -6.70,
    changePercent: -2.98,
    marketCap: 698000000000,
    marketCapFormatted: '$698B',
    capCategory: 'Large',
    peRatio: 64.5,
    volume: 72100000,
    avgVolume: 65400000,
    sector: 'Consumer Cyclical',
    industry: 'Auto Manufacturers',
    high52: 271.00,
    low52: 138.80,
    dayHigh: 226.50,
    dayLow: 216.80,
    openPrice: 225.00,
    prevClose: 225.10,
    rsi: 42.1,
    sma50: 228.40,
    sma200: 205.10,
    beta: 2.34,
    dividendYield: 0.00,
    eps: 3.38,
    recommendation: 'Hold',
    description: 'Tesla designs, develops, manufactures, sells, and leases electric vehicles, energy storage systems, solar panels, and autonomous driving technology (FSD).'
  },
  {
    ticker: 'AVGO',
    name: 'Broadcom Inc.',
    price: 182.70,
    change: 4.80,
    changePercent: 2.70,
    marketCap: 852000000000,
    marketCapFormatted: '$852B',
    capCategory: 'Large',
    peRatio: 41.5,
    volume: 24500000,
    avgVolume: 22100000,
    sector: 'Technology',
    industry: 'Semiconductors',
    high52: 185.16,
    low52: 80.88,
    dayHigh: 183.90,
    dayLow: 178.60,
    openPrice: 179.20,
    prevClose: 177.90,
    rsi: 63.8,
    sma50: 165.70,
    sma200: 142.30,
    beta: 1.25,
    dividendYield: 1.16,
    eps: 4.40,
    recommendation: 'Buy',
    description: 'Broadcom designs, develops, and supplies semiconductor and infrastructure software solutions, including VMware cloud integration and custom AI accelerators.'
  },
  {
    ticker: 'AMD',
    name: 'Advanced Micro Devices',
    price: 156.40,
    change: -3.80,
    changePercent: -2.37,
    marketCap: 253000000000,
    marketCapFormatted: '$253B',
    capCategory: 'Large',
    peRatio: 118.0,
    volume: 53200000,
    avgVolume: 49000000,
    sector: 'Technology',
    industry: 'Semiconductors',
    high52: 227.30,
    low52: 94.04,
    dayHigh: 161.20,
    dayLow: 155.10,
    openPrice: 160.80,
    prevClose: 160.20,
    rsi: 44.5,
    sma50: 152.80,
    sma200: 162.10,
    beta: 1.72,
    dividendYield: 0.00,
    eps: 1.32,
    recommendation: 'Buy',
    description: 'AMD operates as a semiconductor company offering x86 microprocessors, accelerated processing units (APUs), discrete GPUs, and Instinct data center AI accelerators.'
  },
  {
    ticker: 'PLTR',
    name: 'Palantir Technologies Inc.',
    price: 43.85,
    change: 2.15,
    changePercent: 5.16,
    marketCap: 98000000000,
    marketCapFormatted: '$98.0B',
    capCategory: 'Large',
    peRatio: 112.5,
    volume: 84300000,
    avgVolume: 58000000,
    sector: 'Technology',
    industry: 'Software - Infrastructure',
    high52: 44.60,
    low52: 14.48,
    dayHigh: 44.50,
    dayLow: 42.10,
    openPrice: 42.30,
    prevClose: 41.70,
    rsi: 74.2,
    sma50: 34.20,
    sma200: 25.80,
    beta: 2.68,
    dividendYield: 0.00,
    eps: 0.39,
    recommendation: 'Buy',
    description: 'Palantir builds software architectures for big data analysis, intelligence operations, and commercial enterprise deployment via its flagship Artificial Intelligence Platform (AIP).'
  },
  {
    ticker: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 224.60,
    change: 1.40,
    changePercent: 0.63,
    marketCap: 641000000000,
    marketCapFormatted: '$641B',
    capCategory: 'Large',
    peRatio: 12.8,
    volume: 11200000,
    avgVolume: 9800000,
    sector: 'Financial Services',
    industry: 'Banks - Diversified',
    high52: 228.30,
    low52: 137.10,
    dayHigh: 225.80,
    dayLow: 223.20,
    openPrice: 223.50,
    prevClose: 223.20,
    rsi: 59.4,
    sma50: 215.10,
    sma200: 195.40,
    beta: 1.08,
    dividendYield: 2.05,
    eps: 17.55,
    recommendation: 'Buy',
    description: 'JPMorgan Chase is the largest financial holding company in the US, providing consumer banking, investment banking, asset management, and commercial banking services worldwide.'
  },
  {
    ticker: 'V',
    name: 'Visa Inc.',
    price: 284.10,
    change: 0.95,
    changePercent: 0.34,
    marketCap: 569000000000,
    marketCapFormatted: '$569B',
    capCategory: 'Large',
    peRatio: 30.5,
    volume: 6800000,
    avgVolume: 7100000,
    sector: 'Financial Services',
    industry: 'Credit Services',
    high52: 293.07,
    low52: 227.68,
    dayHigh: 285.40,
    dayLow: 283.20,
    openPrice: 283.80,
    prevClose: 283.15,
    rsi: 51.6,
    sma50: 278.20,
    sma200: 272.50,
    beta: 0.94,
    dividendYield: 0.73,
    eps: 9.31,
    recommendation: 'Buy',
    description: 'Visa operates the world’s largest retail electronic payments network, connecting consumers, merchants, financial institutions, and government entities.'
  },
  {
    ticker: 'LLY',
    name: 'Eli Lilly and Company',
    price: 915.20,
    change: 14.60,
    changePercent: 1.62,
    marketCap: 870000000000,
    marketCapFormatted: '$870B',
    capCategory: 'Large',
    peRatio: 114.8,
    volume: 3800000,
    avgVolume: 3200000,
    sector: 'Healthcare',
    industry: 'Drug Manufacturers - General',
    high52: 972.53,
    low52: 542.10,
    dayHigh: 922.00,
    dayLow: 908.40,
    openPrice: 910.00,
    prevClose: 900.60,
    rsi: 55.8,
    sma50: 928.10,
    sma200: 820.40,
    beta: 0.42,
    dividendYield: 0.57,
    eps: 7.97,
    recommendation: 'Buy',
    description: 'Eli Lilly discovers, develops, and markets human pharmaceutical products globally, leading breakthroughs in obesity (Zepbound), diabetes (Mounjaro), and oncology.'
  },
  {
    ticker: 'WMT',
    name: 'Walmart Inc.',
    price: 81.30,
    change: 0.65,
    changePercent: 0.81,
    marketCap: 654000000000,
    marketCapFormatted: '$654B',
    capCategory: 'Large',
    peRatio: 33.2,
    volume: 18400000,
    avgVolume: 17200000,
    sector: 'Consumer Defensive',
    industry: 'Discount Stores',
    high52: 83.34,
    low52: 50.15,
    dayHigh: 81.80,
    dayLow: 80.90,
    openPrice: 81.00,
    prevClose: 80.65,
    rsi: 61.2,
    sma50: 78.40,
    sma200: 68.90,
    beta: 0.51,
    dividendYield: 1.02,
    eps: 2.45,
    recommendation: 'Buy',
    description: 'Walmart operates retail, wholesale, and e-commerce stores worldwide, offering grocery, general merchandise, omni-channel retail, and digital advertising.'
  },
  {
    ticker: 'NFLX',
    name: 'Netflix, Inc.',
    price: 760.50,
    change: 18.20,
    changePercent: 2.45,
    marketCap: 326000000000,
    marketCapFormatted: '$326B',
    capCategory: 'Large',
    peRatio: 43.1,
    volume: 4900000,
    avgVolume: 4100000,
    sector: 'Communication',
    industry: 'Entertainment',
    high52: 766.12,
    low52: 388.50,
    dayHigh: 764.00,
    dayLow: 746.20,
    openPrice: 748.00,
    prevClose: 742.30,
    rsi: 67.3,
    sma50: 698.40,
    sma200: 624.10,
    beta: 1.28,
    dividendYield: 0.00,
    eps: 17.64,
    recommendation: 'Strong Buy',
    description: 'Netflix provides entertainment services with over 280 million paid memberships in 190+ countries offering TV series, films, and mobile games.'
  },
  {
    ticker: 'COIN',
    name: 'Coinbase Global, Inc.',
    price: 216.80,
    change: 12.30,
    changePercent: 6.01,
    marketCap: 53400000000,
    marketCapFormatted: '$53.4B',
    capCategory: 'Mid',
    peRatio: 46.2,
    volume: 14200000,
    avgVolume: 9800000,
    sector: 'Financial Services',
    industry: 'Financial Data & Stock Exchanges',
    high52: 283.48,
    low52: 70.12,
    dayHigh: 219.80,
    dayLow: 206.50,
    openPrice: 207.00,
    prevClose: 204.50,
    rsi: 69.8,
    sma50: 185.30,
    sma200: 204.60,
    beta: 3.12,
    dividendYield: 0.00,
    eps: 4.69,
    recommendation: 'Buy',
    description: 'Coinbase Global provides financial infrastructure and technology for the cryptoeconomy, institutional custody, Base L2 network, and retail trading.'
  },
  {
    ticker: 'XOM',
    name: 'Exxon Mobil Corporation',
    price: 121.40,
    change: -1.80,
    changePercent: -1.46,
    marketCap: 482000000000,
    marketCapFormatted: '$482B',
    capCategory: 'Large',
    peRatio: 14.1,
    volume: 13900000,
    avgVolume: 15600000,
    sector: 'Energy',
    industry: 'Oil & Gas Integrated',
    high52: 126.34,
    low52: 95.77,
    dayHigh: 123.60,
    dayLow: 120.90,
    openPrice: 123.20,
    prevClose: 123.20,
    rsi: 46.3,
    sma50: 118.90,
    sma200: 114.70,
    beta: 0.98,
    dividendYield: 3.13,
    eps: 8.61,
    recommendation: 'Hold',
    description: 'Exxon Mobil explores and produces crude oil and natural gas in North America, Europe, Asia-Pacific, and South America, with vast petrochemical refining capacity.'
  },
  {
    ticker: 'DIS',
    name: 'The Walt Disney Company',
    price: 96.40,
    change: -0.85,
    changePercent: -0.87,
    marketCap: 175000000000,
    marketCapFormatted: '$175B',
    capCategory: 'Large',
    peRatio: 37.8,
    volume: 8700000,
    avgVolume: 9500000,
    sector: 'Communication',
    industry: 'Entertainment',
    high52: 123.74,
    low52: 78.73,
    dayHigh: 97.50,
    dayLow: 95.90,
    openPrice: 97.20,
    prevClose: 97.25,
    rsi: 43.8,
    sma50: 93.60,
    sma200: 101.40,
    beta: 1.38,
    dividendYield: 0.93,
    eps: 2.55,
    recommendation: 'Hold',
    description: 'The Walt Disney Company is a premier family entertainment enterprise operating theme parks, resorts, film studios (Marvel, Pixar, Star Wars), and streaming (Disney+, Hulu).'
  },
  {
    ticker: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    price: 2742.00,
    change: 28.50,
    changePercent: 1.05,
    marketCap: 224000000000,
    marketCapFormatted: '$224B',
    capCategory: 'Large',
    peRatio: 26.4,
    volume: 7200000,
    avgVolume: 6800000,
    sector: 'Energy',
    industry: 'Conglomerates & Telecom',
    high52: 3217.90,
    low52: 2220.00,
    dayHigh: 2760.00,
    dayLow: 2715.00,
    openPrice: 2720.00,
    prevClose: 2713.50,
    rsi: 48.7,
    sma50: 2850.00,
    sma200: 2790.00,
    beta: 0.88,
    dividendYield: 0.36,
    eps: 103.8,
    recommendation: 'Buy',
    description: 'Reliance Industries is India’s largest private sector enterprise spanning hydrocarbon exploration, refining, petrochemicals, retail (Reliance Retail), and digital telecommunications (Jio).'
  },
  {
    ticker: 'TCS',
    name: 'Tata Consultancy Services',
    price: 4120.00,
    change: -18.00,
    changePercent: -0.43,
    marketCap: 181000000000,
    marketCapFormatted: '$181B',
    capCategory: 'Large',
    peRatio: 31.2,
    volume: 2400000,
    avgVolume: 2100000,
    sector: 'Technology',
    industry: 'IT Services & Consulting',
    high52: 4585.00,
    low52: 3313.00,
    dayHigh: 4155.00,
    dayLow: 4102.00,
    openPrice: 4140.00,
    prevClose: 4138.00,
    rsi: 47.9,
    sma50: 4280.00,
    sma200: 3990.00,
    beta: 0.72,
    dividendYield: 1.38,
    eps: 132.0,
    recommendation: 'Buy',
    description: 'TCS is a flagship IT consulting and digital business solutions organization partnering with the world’s leading enterprises for cloud transformation, enterprise AI, and engineering.'
  }
];

export const MARKET_INDICES = [
  { symbol: '^GSPC', name: 'S&P 500', value: '5,864.67', change: '+23.40', changePercent: '+0.40%', isPositive: true },
  { symbol: '^IXIC', name: 'NASDAQ', value: '18,518.61', change: '+115.80', changePercent: '+0.63%', isPositive: true },
  { symbol: '^DJI', name: 'Dow Jones', value: '42,924.89', change: '-75.12', changePercent: '-0.17%', isPositive: false },
  { symbol: '^NSEI', name: 'NIFTY 50', value: '24,399.40', change: '+82.60', changePercent: '+0.34%', isPositive: true },
  { symbol: 'BTC/USD', name: 'Bitcoin', value: '$68,450', change: '+2,140', changePercent: '+3.23%', isPositive: true },
  { symbol: 'ETH/USD', name: 'Ethereum', value: '$2,540', change: '+68.20', changePercent: '+2.76%', isPositive: true },
  { symbol: 'CL=F', name: 'Crude Oil', value: '$71.24', change: '-1.15', changePercent: '-1.59%', isPositive: false },
  { symbol: 'GC=F', name: 'Gold', value: '$2,735.60', change: '+14.20', changePercent: '+0.52%', isPositive: true },
];

export const MARKET_SECTORS = [
  { name: 'Technology', performance: 2.34, count: 6, leader: 'NVDA (+4.08%)' },
  { name: 'Communication', performance: 1.62, count: 4, leader: 'META (+1.54%)' },
  { name: 'Healthcare', performance: 0.98, count: 2, leader: 'LLY (+1.62%)' },
  { name: 'Consumer Cyclical', performance: 0.45, count: 2, leader: 'AMZN (+1.32%)' },
  { name: 'Financial Services', performance: 0.41, count: 3, leader: 'COIN (+6.01%)' },
  { name: 'Consumer Defensive', performance: 0.28, count: 1, leader: 'WMT (+0.81%)' },
  { name: 'Energy', performance: -1.25, count: 2, leader: 'RELIANCE (+1.05%)' },
];

export const MARKET_NEWS = [
  {
    id: 1,
    title: 'NVIDIA Expands AI Infrastructure Footprint with Next-Gen Blackwell Shipments',
    source: 'Bloomberg Markets',
    time: '18m ago',
    tickers: ['NVDA', 'MSFT', 'AVGO'],
    sentiment: 'Bullish',
    summary: 'Cloud hyperscalers have accelerated enterprise deployment orders as semiconductor supply chains hit peak efficiency.'
  },
  {
    id: 2,
    title: 'Federal Reserve Signals Measured Stance on Upcoming Rate Cuts Amid Resilient GDP',
    source: 'Financial Times',
    time: '42m ago',
    tickers: ['JPM', 'V'],
    sentiment: 'Neutral',
    summary: 'Chairman remarks highlight cooling core inflation alongside sustained employment numbers across key manufacturing sectors.'
  },
  {
    id: 3,
    title: 'Palantir Secures Multi-Million Dollar Defense AI Platform Expansion',
    source: 'Wall Street Journal',
    time: '1h ago',
    tickers: ['PLTR'],
    sentiment: 'Bullish',
    summary: 'Department contract solidifies enterprise adoption of real-time ontology systems across mission-critical workflows.'
  },
  {
    id: 4,
    title: 'Global Tech Spending Projected to Eclipse $5.2 Trillion in 2025: Gartner Report',
    source: 'Reuters Tech',
    time: '2h ago',
    tickers: ['AAPL', 'GOOGL', 'AMZN'],
    sentiment: 'Bullish',
    summary: 'Generative AI software investments and cloud modernization dominate corporate IT budgets for the upcoming fiscal cycle.'
  },
  {
    id: 5,
    title: 'Crude Oil Pressured by Elevated Output Projections Despite Geopolitical Tensions',
    source: 'CNBC Energy',
    time: '3h ago',
    tickers: ['XOM'],
    sentiment: 'Bearish',
    summary: 'OPEC+ scheduled supply recalibration and inventory builds in regional hubs weigh on near-term West Texas futures.'
  }
];

// Helper to generate realistic historical data for charts
export function generateHistoryForStock(basePrice, timeframe = '1M') {
  let points = 30;
  let volatility = 0.02;
  let trend = 0.003;

  switch (timeframe) {
    case '1D':
      points = 24; // 15-min intervals during market hours
      volatility = 0.005;
      trend = 0.0008;
      break;
    case '1W':
      points = 35; // 7 days, 5 pts/day
      volatility = 0.012;
      trend = 0.002;
      break;
    case '1M':
      points = 30; // 30 days
      volatility = 0.02;
      trend = 0.004;
      break;
    case '3M':
      points = 60; // 60 trading days
      volatility = 0.025;
      trend = 0.005;
      break;
    case '1Y':
      points = 52; // 52 weeks
      volatility = 0.035;
      trend = 0.007;
      break;
    case '5Y':
      points = 60; // 60 months
      volatility = 0.055;
      trend = 0.015;
      break;
    default:
      points = 30;
  }

  const result = [];
  let currentPrice = basePrice * (1 - (trend * (points / 2)));
  
  // Starting date
  const now = new Date();
  
  for (let i = 0; i < points; i++) {
    // Random walk with trend
    const noise = (Math.random() - 0.48) * volatility * currentPrice;
    currentPrice = Math.max(5, currentPrice + noise + (currentPrice * trend * 0.15));
    
    // Low, High, Open, Close for candlesticks
    const open = Number((currentPrice - (Math.random() * 0.005 * currentPrice)).toFixed(2));
    const close = Number(currentPrice.toFixed(2));
    const high = Number((Math.max(open, close) + Math.random() * 0.008 * currentPrice).toFixed(2));
    const low = Number((Math.min(open, close) - Math.random() * 0.008 * currentPrice).toFixed(2));
    const volume = Math.floor((Math.random() * 800000) + 1200000);

    let dateLabel = '';
    const dateObj = new Date(now);
    
    if (timeframe === '1D') {
      const minutesAgo = (points - i) * 15;
      dateObj.setMinutes(dateObj.getMinutes() - minutesAgo);
      dateLabel = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (timeframe === '1W' || timeframe === '1M' || timeframe === '3M') {
      const daysAgo = Math.floor((points - i) * (timeframe === '1W' ? 0.2 : 1));
      dateObj.setDate(dateObj.getDate() - daysAgo);
      dateLabel = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else {
      const monthsAgo = Math.floor((points - i) * (timeframe === '1Y' ? 0.25 : 1));
      dateObj.setMonth(dateObj.getMonth() - monthsAgo);
      dateLabel = dateObj.toLocaleDateString([], { month: 'short', year: '2-digit' });
    }

    result.push({
      date: dateLabel,
      price: close,
      open,
      high,
      low,
      close,
      volume,
      sma20: Number((currentPrice * (0.98 + Math.random() * 0.04)).toFixed(2))
    });
  }

  // Ensure last point matches current price closely
  if (result.length > 0) {
    result[result.length - 1].price = basePrice;
    result[result.length - 1].close = basePrice;
  }

  return result;
}
