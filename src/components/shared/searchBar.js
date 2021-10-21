import {Input, Tooltip} from 'antd';
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';


const { Search } = Input;

function SearchBar(props) {
    return(
    <>
        <Search placeholder={props.placeholder}
                prefix={
                    <Tooltip title={props.tooltip}>
                    <SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>}
                enterButton="Search"
                maxLength = "50"
                size="large"
                onSearch = {(value) => {props.handleSearch(value)}}
        />
    </>
    );
}
export default SearchBar;
