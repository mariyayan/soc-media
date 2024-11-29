import React from 'react';
import { useState } from 'react';
import { sendGetReq } from "../../utils/common-functions";
import { useServerResponse } from '../../utils/hooks';
import "./subscription-btn.css";


function SubscriptionBtn({ userId, isSubscribed }) {

    const [subscribed, setSubscription] = useState(isSubscribed);
    const [path, btnValue, nameOfClass] = subscribed ? [`/unsubscribe/${userId}`, 'отписаться', 'subscribed' ] : [`/subscribe/${userId}`, 'подписаться', ''];
    const processServerResponse = useServerResponse();


    async function onClick() {
        const response = await sendGetReq(path);
        processServerResponse(response, setSubscription);
    }

    return (
        <button className = {`btn subscription-btn transition-style border ${nameOfClass}`} onClick = {onClick}> {btnValue} </button>
    );
}

export default SubscriptionBtn;