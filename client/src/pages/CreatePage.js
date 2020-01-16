import React, {useState, useContext} from 'react';
import {useHttp} from './../hooks/http.hook';
import {AuthContext} from './../context/AuthContext';
import {useHistory} from 'react-router-dom';

const CreatePage = () => {

    const [link, setLink] = useState('');
    const {request} = useHttp();
    const auth = useContext(AuthContext);
    const history = useHistory();

    const pressHandler = async (event) => {
        if(event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.getToken()}`
                });
                history.push(`/detail/${data.link._id}`);
            } catch(e) {

            }
        }
    }

    return (
        <div className="row">
            <div className="col s12">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Хочешь сократить ссылку?</span>
                        <div className="input-field">
                            <input 
                                id="link" 
                                type="text"
                                className="validate"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                onKeyPress={pressHandler} />
                            <label htmlFor="link">Вставьте ссылку</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CreatePage;