import React from 'react'

export default function Serch({serch, setSerch, children}) {

    const handleSubmit = e => {
        e.preventDefault()
    }

    const resetInput = () => {
        setSerch('')
    }

    return (
        <form className='relative h-10 flex items-center p-3 rounded-full transition-all bg-white-200 mb-4 outline-none before:content-[""] before:absolute before:bg-primary-100 before:scale-x-0 before:origin-center before:h-1 before:left-0 before:bottom-0 before:transition-transform focus-within:rounded-sm focus-within:before:scale-105' onSubmit={handleSubmit}>
            <button className=' bg-none text-black-300'>
                <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                    <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </button>
            <input
                className='text-sm bg-transparent w-full h-full p-2 outline-none'
                placeholder={children} required="" type="text"
                value={serch}
                onChange={e=> setSerch(e.target.value)}
            />
            <button 
                className={`reset text-black-300 ${serch !== '' ? 'block' : 'hidden'}`} 
                type="button"
                onClick={resetInput}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </form>
    )
}
