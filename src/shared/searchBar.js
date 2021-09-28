import {Input, Tooltip} from 'antd';
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';


const { Search } = Input;

function SearchBar(props) {
    return(
    <>
        <Search placeholder="Search Car Parks Or Destination"
                prefix={
                    <Tooltip title="Key in Destination names or Car Park locations">
                    <SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>}
                enterButton="Search"
                maxLength = "50"
                size="large"
                onSearch = {(value) => console.log(value)}
        />
    </>
    );
}
export default SearchBar;
