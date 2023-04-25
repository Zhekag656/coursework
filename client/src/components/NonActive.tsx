import React, {FC} from 'react';
import {observer} from "mobx-react-lite";

const NonActive: FC = () => {
    return (
        <div>
            <label>A letter has been sent to your email. Please follow the link in the letter to verify your account.</label>
        </div>
    );
};

export default observer(NonActive)