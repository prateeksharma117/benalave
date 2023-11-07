import React, { useEffect } from 'react'
import ProductCard from '../Product/ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../State/Auth/Action';
import {Loader} from '../../components';

const RecentlyViewed = () => {

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const { auth } = useSelector((store) => store);

    useEffect(() => {
        dispatch(getUser(jwt))
    }, [])



    return (
        <>
            {
                auth.loading === true ? (
                    <Loader />
                    ) : (
                    <section className="py-10 mx-3">
                        <h1 className="font-medium text-2xl flex justify-center mb-10">
                            {auth?.jwt?.recentProduct?.length < 1 ? "" : "✨RECENTLY VIEWED✨"}
                        </h1>
                        <div className="flex justify-center flex-wrap space-y-5">
                            {auth?.jwt?.recentProduct?.length < 1 ? (
                                <div className="flex flex-col px-5 items-center justify-center h-screen">
                                <h2 className="text-2xl font-semibold mb-4">No Recently Viewed Product</h2>
                                <p className="text-gray-600 text-center">Sorry, we couldn&apos;t find any Recently Viewed Product for you at the moment. Please check back later</p>
                              </div>
                            ) : (
                                <div className=" flex flex-wrap justify-center">
                                    {auth?.jwt?.recentProduct?.slice(0, 30)
                                        .map((item, i) => (
                                            <ProductCard product={item} key={i} />
                                        ))}
                                </div>
                            )}
                        </div>
                    </section>
                    )
            }
        </>
    )
}

export default RecentlyViewed
