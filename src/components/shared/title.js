import React from 'react';
import Texty from 'rc-texty';
import './title.css'
import 'rc-texty/assets/index.css';


function TitleCard(props) {
        return (
            <div className="ant-page-header-heading" style={{ marginTop: 16 }}>
                    <Texty
                    type={"mask-top"}
                    mode={"sync"}>
                        {props.text}
                    </Texty>
            </div>
        );

}

export default TitleCard;

