import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from 'antd';
import { Wrapper, Label } from './styled';

const Info = () => {
    const { address, fullname, libraries, employees, funds, subscribers, visits, vs, bd, br, computers, site } = useParams();
    const [data, setData] = useState({})

    useEffect(() => {
        const [index, cityWithStreet] = address.split('г.');
        const [city, street] = cityWithStreet.split(', ул.')
        setData(() => ({
            address: [{ title: 'Город', value: city }, { title: 'Улица/дом', value: street }, { title: 'Почтовый индекс', value: index }],
            other: [
                { title: 'Количество библиотек', value: libraries },
                { title: 'Количество работников', value: employees },
                { title: 'Количество компьютеров', value: computers },
                { title: 'Количество веб-страниц', value: site },
                { title: 'Фонды', value: formatedNumber(funds) },
                { title: 'Подписчики', value: formatedNumber(subscribers) },
                { title: 'Посетителей библиотеки', value: Math.floor(visits) },
                { title: 'Посетителей портала', value:  Math.floor(vs) },
                { title: 'Отреставрированных зданий', value: br },
                { title: 'Зданий нужндающихся в ремонте', value: bd },
            ]
        }))
    }, [address])

    const renderDefaultCard = (title, value) => (
        <Card
            style={{ marginTop: 16 }}
            type="inner"
            title={title}
            key={title}
        >
            {value}
        </Card>
    )

    return (
        <Wrapper>
            <Card title={fullname}>
                <Card type="inner" title="Адрес">
                    {data.address && (
                        data.address.map(({ title, value }) => <p key={title}><Label>{title}:</Label> {value}</p>)
                    )}
                </Card>
                {data.other && (
                    data.other.map(({ title, value }) => renderDefaultCard(title, value))
                )}
            </Card>
        </Wrapper>
    );
};

export default Info;

function formatedNumber(x) {
    return ('' + x).replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
}