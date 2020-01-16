import React from 'react';
import {Link} from 'react-router-dom';

const LinksList = ({ links }) => {
    if(!links.length) return <p className="center">Ссылок нету.</p>;

    return (
        <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Оригинальная</th>
                    <th>Сокращенная</th>
                    <th>Открыть</th>
                </tr>
            </thead>

            <tbody>
                {links.map((item, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{item.from}</td>
                            <td>{item.to}</td>
                            <td><Link to={`/detail/${item._id}`}>Открыть</Link></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
};

export default LinksList;