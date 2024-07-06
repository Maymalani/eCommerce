import React, { useEffect, useState } from 'react'

const Clicktop = () => {

    const [visible, setVisible] = useState(false);

    const clickToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    const visibility = () => {
        if (document.documentElement.scrollTop > 200 || document.scrollTop > 200) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", visibility);
    }, []);

    return (
        <>
            <button className={`${visible ? "block" : "hidden"} group fixed bottom-8 right-8 p-3 bg-purple-600 text-white rounded-full flex justify-between items-center gap-x-2 transition-all ease-in-out delay-1000`} onClick={clickToTop} title='Click To Top'>
            <i className="fa-solid fa-chevron-up"></i><span className='hidden group-hover:block'>Top</span>
            </button>
        </>
    )
}

export default Clicktop
