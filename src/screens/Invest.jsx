import React from 'react';
import { useNavigate } from 'react-router-dom';


const Invest = () => {
    let navigate = useNavigate()
    return <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <h3>Invest screen in progress</h3>
        <button onClick={() => navigate(-1)} style={{padding:'15px'}}>go back</button>

    </div>

}

export default Invest