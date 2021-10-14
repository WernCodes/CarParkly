import React from 'react';
import Title from 'antd/es/typography';
import './title.css'


function TitleCard(props) {
        return (
            <div className='antButton'>
                <Title class = "ant-page-header-heading">{props.text}</Title>
            </div>
        );

}

export default TitleCard;

