import React, { useState, useEffect} from "react";
import './css_components/coinslist.css';
import CoinInfoComponent from './CoinInfoComponent'

const CoinsListComponent = () => {
    const [apiURL] = useState('http://localhost:8001/');
    const [coins, setCoins] = useState([]);
    const [searchInApi, setSearchInApi] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const [minute, setMinute] = useState(0);
    const [selectedCoinId, setSelectedCoinId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const message = "Busca una criptomoneda por su nombre o símbolo, o puedes mirar la lista completa de criptomonedas y ver cada una de ellas en detalle";

    const searchBar = (event) => {
        setSearchInApi(event.target.value);
        console.log(searchInApi);
    };

    const searchCoin = async () => {
        try {
            setCoins([]);
            setLoading(true);
            const response = await fetch(`${apiURL}coins/search/${searchInApi}/`);
            const data = await response.json();
            setSearchResults(data.coins);
            console.log(data.coins);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setErrorMessage('No ha sido posible hacer la búsqueda, intenta de nuevo');
        }
    };

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 60000));
                setLoading(true);
                const response = await fetch(`${apiURL}/coins/page/${page}`);
                if (response.status === 429) {
                    setLoading(false);
                    setErrorMessage("Demasiadas peticiones, espera un momento");
                    setMinute(60);

                    setTimeout(() => {
                        setErrorMessage('');
                    }, 2000);
                    return;
                } else {
                    const data = await response.json();
                    setCoins(data.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                setErrorMessage('No ha sido posible obtener la lista de criptomonedas, intenta de nuevo');
                setLoading(false);
            }
        };
        fetchCoins();
    }, [page]);

    useEffect(() => {
        if (minute === 0) return;
        
        const timer = setInterval(() => {
            setMinute(prevMinute => {
                if (prevMinute <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevMinute - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [minute]);

    const openDialog = (coinId) => {
        setSelectedCoinId(coinId);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setSelectedCoinId(null);
    };

   

    return (
        <div className="mainContainer">
            
            <div className="search-container">
            <h1>Cripto API</h1>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Buscar criptomoneda..."
                    value={searchInApi}
                    onChange={searchBar}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            searchCoin();
                        }
                    }}
                />
                <div className="tooltip fade-in">{message}</div>
            </div>
            {searchInApi.length === 0 ? (
                <h2>Lista de CriptoMonedas</h2>
            ) : (
                <h2>Resultados de la búsqueda</h2>
            )}

            {errorMessage && <h2>{errorMessage}</h2>}
            {minute > 0 && <h2 className="fade-in">{minute}</h2>}

            {!loading ? (
                searchResults.length === 0 ? (
                    coins.length > 0 ? (
                        <div className="coinlist fade-in">
                        {coins.map((coin, index) => (
                            <div key={index} className="coin-item">
                                <h2 className="coin-symbol">{coin.symbol}</h2>
                                <p className="coin-name">{coin.name}</p>
                            </div>
                        ))}
                        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</button>
                        <button onClick={() => setPage(page + 1)}>Siguiente</button>
                    </div>
                    ):null
                ) : (
                    <div className="coinlist fade-in">
                        {searchResults.map((coin, index) => (
                            <div key={index} className="coin-item" onClick={() => openDialog(coin.id)}>
                                <img src={coin.thumb} alt={coin.name} className="coin-image" />
                                <h2 className="coin-symbol">{coin.symbol}</h2>
                                <p className="coin-name">{coin.name}</p>
                                <div className="coin-rank">
                                    <span>{coin.market_cap_rank}</span>
                                    <p>Rank</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <h2>Cargando...</h2>
            )}

            <dialog open={dialogOpen} className="coin-info-dialog">
                {selectedCoinId && <CoinInfoComponent coinID={selectedCoinId} onClose={closeDialog} />}
                <button className="notshow" onClick={closeDialog}></button>
            </dialog>
        </div>
    );

};

export default CoinsListComponent;
