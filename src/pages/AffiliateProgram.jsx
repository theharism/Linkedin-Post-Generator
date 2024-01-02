import React, { useState } from 'react'
import style from '../style/AffiliateProgra.module.css';
import { Link } from 'react-router-dom';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Slider } from '@mui/material';

const AffiliateProgram = () => {
    const [value, setValue] = useState(10);

    const valueHandler = (event, newValue) => {
        setValue(newValue);
    }


    return (
        <>
            <div className={style.mainDiv}>
                <div className={style.introDiv}>
                    <p className={style.intro}>Affiliate Program <span className={style.earn}> EARN 20% COMISSION ON ALL PAYMENTS </span></p>
                    <h1>Boost 💰💸 Your <span> Earnings </span></h1>
                    <p className={style.para}>By joining our program, you have the opportunity to earn a 20% commission on all payments from customers you refer to MUSE. Get your<span className={style.earn} style={{backgroundColor: 'transparent', fontSize: 16}}>Refferal code</span>by registering your bank account number to us on which you'll receive cashbacks.</p>
                    <Link
                        // onClick={handleOptimizeClick}
                        style={{
                            textDecoration: "none",
                            color: "white",
                        }}
                        className={style.FormLinks}
                    >
                        <button
                            style={{
                                position: "relative",
                                marginTop: 15,
                                width: 290,

                            }}
                        >
                            Join the Affiliate Program
                            <CurrencyExchangeIcon className="CheckMark" sx={{ fontSize: 50 }} />
                        </button>
                    </Link>
                </div>
                <hr className={style.line} />
                <div className={style.introDiv}>
                    <h4 style={{ marginBottom: 20 }}>Calculate Your <span style={{ color: "#1e86e2" }}> Earnings </span></h4>
                    <div className={style.earningDiv}>
                        <span>Users Referred per Month</span>
                        <Slider style={{width: "50%"}} value={value} min={1} max={100} onChange={valueHandler} />
                        <span>{value} Referrals</span>
                    </div>
                    <div className={style.earningDiv} style={{marginTop: 20}}>
                        <span>Average Monthly Earnings (For Pro Package)</span>
                        <span style={{fontSize: 25}}>${value * 10} 💸</span>
                    </div>
                    <div className={style.earningDiv} style={{marginTop: 20, marginBottom: 20}}>
                        <span>Average Monthly Earnings (For Starter Package)</span>
                        <span style={{fontSize: 25}}>${value * 5} 🤑</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AffiliateProgram