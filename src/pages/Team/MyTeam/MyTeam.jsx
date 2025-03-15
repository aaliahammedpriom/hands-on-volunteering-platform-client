import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import AuthContext from '../../../provider/AuthContext';
import Spinner from '../../../component/Commmon/Spinner';
import MyTeamCard from './MyTeamCard';

const MyTeam = () => {
    const { user } = useContext(AuthContext)
    const [datas, setDatas] = useState()
    useEffect(() => {
        useAxiosSecure().get(`/teamowner?email=${user.email}`)
            .then(res => setDatas(res.data))
    }, [])

    if (!datas) {
        return <Spinner></Spinner>
    }
    const publicDatas = datas.filter(data => data.membership === "public")
    const privateDatas = datas.filter(data => data.membership === "private")

    return (
        <div className="tabs flex justify-center ">
            <input type="radio" name="my_tabs_4" className="tab" aria-label="Public Teams" defaultChecked />
            <div className="tab-content bg-base-100 border-base-300 p-6 ">
                <div className='grid gap-5 '>
                    {
                        publicDatas.map(data => <MyTeamCard key={data._id} data={data}></MyTeamCard>)
                    }
                </div>
            </div>

            <input type="radio" name="my_tabs_4" className="tab" aria-label="Private Team" />
            <div className="tab-content bg-base-100 border-base-300 p-6">
                <div className='grid gap-5 '>
                    {
                        privateDatas.map(data => <MyTeamCard key={data._id} data={data}></MyTeamCard>)
                    }
                </div>
            </div>

        </div>
    );
};

export default MyTeam;