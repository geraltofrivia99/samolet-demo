import React, { useState, useEffect, useRef } from 'react';
import { Table, Input } from 'antd';
import { Link } from "react-router-dom";

import { Wrapper, SearchContainer, TableContainer } from './styled';

const { Search } = Input;

const ROW_HEIGHT = 54;
const LIBCOL_WIDTH = '150px';

const columns = [
    {
        title: "Регион",
        dataIndex: "fullname",
        key: "fullname",
        ellipsis: true,
        render: (text, { address, fullname, libraries, employees, funds, subscribers, visits, visits_sites: vs, buildings_disrepair: bd, buildings_repair: br, computers, site }) => {
            return (
                <Link to={`/inf/${address}/${fullname}/${libraries}/${employees}/${funds}/${subscribers}/${visits}/${vs}/${bd}/${br}/${computers}/${site}`}>
                    {text}
                </Link>
            )
        },
    },
    {
        title: "Колличество",
        dataIndex: "libraries",
        width: LIBCOL_WIDTH,
        key: "libraries",
        sorter: (a, b) => a.libraries - b.libraries,
    },
];

const getRowKey = (item, i) => {
    return '' + item.order + i ;
}


const List = React.memo(({ data }) => {
    const [filtered, setFiltered] = useState([])
    const [paggingSize, setPaggingSize] = useState(10);
    const tableRef = useRef(null);

    useEffect(() => {
        setPaggingSize(Math.floor((tableRef.current.offsetHeight / ROW_HEIGHT) - 2));
    }, [])

    const onChange = e => {
        const { target: { value } } = e;
        setFiltered(data.filter((cur) => cur.territory.toLowerCase().includes(value.toLowerCase())));
    }

    return (
        <Wrapper>
            <SearchContainer>
                <Search
                    placeholder="Введите название региона"
                    size="large"
                    onChange={onChange}
                />
            </SearchContainer>
            <TableContainer ref={tableRef}>
                <Table
                    columns={columns}
                    dataSource={!!filtered.length ? filtered : data}
                    rowKey={getRowKey}
                    bordered={true}
                    locale={{ emptyText: 'Не найденно' }}
                    pagination={{ size: 'small', pageSize: paggingSize }}
                />
            </TableContainer>
        </Wrapper>
    )
})

export default List;
