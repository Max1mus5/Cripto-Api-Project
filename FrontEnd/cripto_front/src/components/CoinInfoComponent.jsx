import React, { useEffect, useState } from 'react';
import './css_components/coininfo.css';
import GraphCoin from './GraphCoin';

const CoinInfoComponent = ({ coinID, onClose }) => {
    const [coinInfo, setCoinInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchCoinInfo = async () => {
            try {
                const response = await fetch(`http://api.criptoapi.criptorg.net/coins/${coinID}/`);
                if (!response.ok) {
                    throw new Error('No se pudo obtener la información de la moneda, 1 minuto Porfavor');
                }
                const data = await response.json();
                setCoinInfo(data);
                setLoading(false);
            } catch (error) {
                setErrorMessage(error.message);
                setLoading(false);
            }
        };

        fetchCoinInfo();
    }, [coinID]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (errorMessage) {
      return <div >Error: {errorMessage}</div>;
    }

    return (
        <dialog open className="coininfo-dialog fade-in">
            <div className="coininfo-container">
                <div className='headrCoinInfo'>
                  <button onClick={onClose} className="close-button">X</button>
                  <div className='infoNameCoin'>
                    <img src={coinInfo.image} alt={coinInfo.name} className="coininfo-image" />
                    <div className='coinNameDuple'>
                      <h1 className="coininfo-symbol">{coinInfo.name}</h1>
                      <p className="coininfo-name">{coinInfo.symbol}</p>
                    </div>
                    <div className="coininfo-price">
                        {coinInfo.current_price} <span className='spanUSD'>/USD</span>
                    </div>
                  </div>
                  <div className="coininfo-description">
                      <span className="info-icon">ℹ</span>
                      <span className="description-text fade-in">{coinInfo.description}</span>
                  </div>
                  <a href={coinInfo.homepage} target="_blank" rel="noopener noreferrer" className="coininfo-homepage">Visitar página</a>
                </div>

                <div className='botom'>
                  <GraphCoin className="graphCoin" coinID={coinID} />
                  <p className="coininfo-last-updated">Última actualización: {coinInfo.last_updated}</p>
                </div>
            </div>
        </dialog>
    );
};

export default CoinInfoComponent;
