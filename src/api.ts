const BASE_URL = `https://api.coinpaprika.com/v1`;
//const BASE_URL = `https://www.coingecko.com/en/api/documentation`


export function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then((response) =>
      response.json()
    );
}

export function fetchCoinInfo(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json())
}

export function fetchCoinTracker(coinId: string){
    return fetch(`${BASE_URL}/tickers/${coinId}`).then(response => response.json())
}

export async function fetchCoinHistory(coinId: string) {
    //니코쌤의 자체 API를 이용함
    return await (
      await fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
    ).json();
}
